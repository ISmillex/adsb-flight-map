
import Fetcher from './Fetcher.js';
import Aircraft from './Aircraft.js';
import StoreManager from '../managers/StoreManager.js';
import * as Cesium from 'cesium';
import {selectedAircraft, buttons} from '../managers/StoreManager.js';
import {NEW_AIRCRAFT, UPDATE_AIRCRAFT, SELECTED_AIRCRAFT_IN_SCOPE,
	NEW_SELECTED_AIRCRAFT, CHANGED_SELECTED_AIRCRAFT, UPDATE_SELECTED_AIRCRAFT,
	NO_SELECTED_AIRCRAFT, REMOVE_SELECTED_AIRCRAFT} from '$lib/Constants.js';
import TableManager from '../managers/TableManager.js';

/**
 * The MapRenderer class is responsible for rendering aircrafts and selected aircrafts on the map.
 *
 * It maintains a map called cameraScopeAircrafts, which stores all the aircrafts currently in the camera's scope.
 * Each aircraft is represented by an instance of the Aircraft class and is identified by its hex code.
 *
 * The class uses three main methods to render aircrafts: updateAircraftsInCameraScope, updateSelectedAircraft, and renderAircrafts.
 *
 * updateAircraftsInCameraScope is responsible for updating the aircrafts in the camera's scope.
 * It fetches the aircrafts within the camera's bounds and updates the cameraScopeAircrafts map accordingly.
 * If an aircraft is no longer in the camera's scope, it is removed from the map and its corresponding entity is removed from the viewer.
 *
 * updateSelectedAircraft is responsible for updating the selected aircraft.
 * It determines the state of the selected aircraft (whether it's new, changed, updated, or removed) and performs the necessary actions.
 *
 * renderAircrafts is responsible for rendering all the aircrafts in the cameraScopeAircrafts map.
 *
 * The class uses three intervals to periodically call these methods: renderAircraftsInterval, cameraScopeInterval, and selectedAircraftsInterval.
 * The intervals are set based on the size of the cameraScopeAircrafts map.
 * If the size is greater than a certain threshold, the intervals are increased to avoid performance issues.
 */
export default class MapRenderer {

	// Singleton instance of MapRenderer
	static instance = null;

	// Constructor for MapRenderer
	constructor(viewer) {
		if (MapRenderer.instance) {
			return MapRenderer.instance;
		}

		// Initialize properties
		this.viewer = viewer;
		this.fetcher = new Fetcher();
		this.cameraScopeAircrafts = new Map();
		this.selectedAircraftInstance = null;
		this.setInitialCameraPosition();

		// Set the singleton instance
		MapRenderer.instance = this;
	}

	// Method to set the initial camera position
	setInitialCameraPosition() {
		this.viewer.camera.flyTo({
			destination: Cesium.Cartesian3.fromDegrees(15, 49, 3000000),
			duration: 0,
		});
	}

	// Method to get an aircraft by its hex code
	static getAircraftByHex(hex) {
		return MapRenderer.instance.cameraScopeAircrafts.get(hex);
	}

	// Method to calculate camera positions
	static calculateCameraPositions() {
		const rect = MapRenderer.instance.viewer.camera.computeViewRectangle();
		const south = Cesium.Math.toDegrees(rect.south);
		const north = Cesium.Math.toDegrees(rect.north);
		const west = Cesium.Math.toDegrees(rect.west);
		const east = Cesium.Math.toDegrees(rect.east);

		return {south, north, west, east};
	}

	// This function determines the state of an aircraft based on its hex code
	determineAircraftState(hex) {
		// If the hex code of the selected aircraft matches the hex code passed to the function,
		// it means the aircraft is currently selected, so return the state SELECTED_AIRCRAFT_IN_SCOPE
		if (selectedAircraft?.hex === hex) {
			return SELECTED_AIRCRAFT_IN_SCOPE;
		}
		// If the cameraScopeAircrafts Map (which keeps track of all aircrafts currently in the camera's scope)
		// has an aircraft with the passed hex code, it means the aircraft is already in the camera's scope but not selected,
		// so return the state UPDATE_AIRCRAFT
		else if (this.cameraScopeAircrafts.has(hex)) {
			return UPDATE_AIRCRAFT;
		}
		// If the aircraft is neither selected nor in the camera's scope, it means it's a new aircraft that just came into scope,
		// so return the state NEW_AIRCRAFT
		else {
			return NEW_AIRCRAFT;
		}
	}

	// This function determines the state of the selected aircraft
	determineSelectedAircraftState() {
		// If there is a selected aircraft
		if (selectedAircraft) {
			// If there is no selected aircraft instance, it means a new aircraft has been selected,
			// so return the state NEW_SELECTED_AIRCRAFT
			if (this.selectedAircraftInstance === null) {
				return NEW_SELECTED_AIRCRAFT;
			}
			// If the hex code of the selected aircraft instance does not match the hex code of the selected aircraft previously selected,
			// it means the selected aircraft has changed, so return the state CHANGED_SELECTED_AIRCRAFT
			else if (this.selectedAircraftInstance.hex !== selectedAircraft.hex) {
				return CHANGED_SELECTED_AIRCRAFT;
			}
			// If the hex code of the selected aircraft instance matches the hex code of the selected aircraft,
			// it means the selected aircraft is the same as before and might need to be updated, so return the state UPDATE_SELECTED_AIRCRAFT
			else {
				return UPDATE_SELECTED_AIRCRAFT;
			}
		}
			// If there is no selected aircraft but there is a selected aircraft instance,
			// it means the selected aircraft has been removed, so return the state REMOVE_SELECTED_AIRCRAFT
		else if (this.selectedAircraftInstance) {
			return REMOVE_SELECTED_AIRCRAFT;
		}
			// If there is neither a selected aircraft nor a selected aircraft instance,
			// it means there is no selected aircraft, so return the state NO_SELECTED_AIRCRAFT
		else {
			return NO_SELECTED_AIRCRAFT;
		}
	}

	// Method to update aircrafts in the camera scope
	async updateAircraftsInCameraScope() {
		// Calculate the camera's current position
		const { south, north, west, east } = MapRenderer.calculateCameraPositions();

		try {
			// Fetch the aircrafts within the camera's bounds
			const data = await this.fetcher.fetchAircraftsByBounds(south, north, west, east);

			// Create a set of the hex codes of the current aircrafts
			const currentAircraftHexes = new Set(data.data.aircraft.map(item => item.hex));

			// Update the number of aircrafts in scope
			StoreManager.updateNumberOfAircraftsInScope(currentAircraftHexes.size);

			// Remove aircrafts that are no longer in the camera scope
			for (const [hex, aircraft] of this.cameraScopeAircrafts) {
				if (!currentAircraftHexes.has(hex)) {
					aircraft.removeAircraft();
					this.cameraScopeAircrafts.delete(hex);
				}
			}

			// Update or add new aircrafts
			for (const item of data.data.aircraft) {
				let aircraft;
				const state = this.determineAircraftState(item.hex);

				switch (state) {
					case SELECTED_AIRCRAFT_IN_SCOPE:
						break;
					case NEW_AIRCRAFT:
						// Create a new Aircraft instance and add it to the cameraScopeAircrafts map
						aircraft = new Aircraft(item);
						this.cameraScopeAircrafts.set(item.hex, aircraft);
						break;
					case UPDATE_AIRCRAFT:
						// Update the data of the existing Aircraft instance
						aircraft = this.cameraScopeAircrafts.get(item.hex);
						aircraft.updateAircraftData(item);
						break;
				}
			}
		} catch (error) {
			// Log any errors that occur during the fetch operation
			console.error('Error updating aircrafts:', error);
		}
	}

	// Method to get an aircraft instance by its hex code
	async getAircraftInstanceByHex(hex) {
		let aircraft;

		// Check if the aircraft with the given hex code is already in the camera's scope
		if (this.cameraScopeAircrafts.has(hex)) {
			// If it is, get the aircraft instance from the cameraScopeAircrafts map
			aircraft = this.cameraScopeAircrafts.get(hex);
		} else {
			// If it's not, fetch the aircraft data from the server
			const data = await this.fetcher.fetchAircraftByHex(hex);
			// Create a new Aircraft instance with the fetched data
			aircraft =  new Aircraft(data.data.aircraft[0]);
		}

		// Return the aircraft instance
		return aircraft;
	}

	// Method to update the selected aircraft
	async updateSelectedAircraft() {
		// Determine the state of the selected aircraft
		const state = this.determineSelectedAircraftState();

		// If there is no selected aircraft, return immediately
		if (state === NO_SELECTED_AIRCRAFT) return;

		switch (state) {
			case NEW_SELECTED_AIRCRAFT:
			case CHANGED_SELECTED_AIRCRAFT:
				// If there is a selected aircraft instance, remove it
				if (this.selectedAircraftInstance) {
					this.selectedAircraftInstance.removeAircraft();
				}
				// Get the new selected aircraft instance and fetch its photo
				this.selectedAircraftInstance = await this.getAircraftInstanceByHex(selectedAircraft.hex);
				this.selectedAircraftInstance.fetchPhoto(this.fetcher);
				// Remove the selected aircraft from the cameraScopeAircrafts map
				this.cameraScopeAircrafts.delete(selectedAircraft.hex);
				break;
			case UPDATE_SELECTED_AIRCRAFT:
				// Fetch the data of the selected aircraft and update its data
				let data = await this.fetcher.fetchAircraftByHex(selectedAircraft.hex);
				this.selectedAircraftInstance.updateAircraftData(data.data.aircraft[0]);
				// Update the current table page with the hex of the selected aircraft
				TableManager.updateCurrentTablePage(this.selectedAircraftInstance.hex);
				// If the followAircraft button is clicked, follow the selected aircraft
				if (buttons.followAircraft)
					this.selectedAircraftInstance.follow();
				break;
			case REMOVE_SELECTED_AIRCRAFT:
				// Remove the selected aircraft and reset the selectedAircraftInstance
				this.selectedAircraftInstance.removeAircraft();
				this.selectedAircraftInstance = null;
				// Update the paginationClick state to false
				StoreManager.updatePaginationClick(false);
				return;
		}

		// Draw or update the selected aircraft
		if (this.selectedAircraftInstance.isInitiallyDrawn) {
			this.selectedAircraftInstance.updateAircraftPosition();
		} else {
			this.selectedAircraftInstance.drawAircraft();
		}

		// Scale and color the selected aircraft
		this.selectedAircraftInstance.scaleAndColorSelectedAircraft();
		// Update the selectedAircraft state with the selectedAircraftInstance
		StoreManager.updateSelectedAircraft(this.selectedAircraftInstance);
	}

	// Method to render aircrafts
	renderAircrafts() {
		// If the showOnlySelectedAircraft button is not clicked, render all aircrafts
		if (!buttons.showOnlySelectedAircraft) {
			for (const aircraft of this.cameraScopeAircrafts.values()) {
				// If the aircraft has been drawn before, update its position
				if (aircraft.isInitiallyDrawn) {
					aircraft.updateAircraftPosition();
				}
				// If the aircraft has not been drawn before, draw it
				else {
					aircraft.drawAircraft();
				}
			}
		}
		// If the showOnlySelectedAircraft button is clicked, hide all aircrafts
		else {
			for (const aircraft of this.cameraScopeAircrafts.values()) {
				aircraft.hideAircraft();
			}
		}
	}

	// Method to start the render aircrafts loop
	startRenderAircraftsLoop(seconds = 2000) {
		this.renderAircraftsInterval = setInterval(() => {
			this.renderAircrafts();
			this.stopRenderAircraftsLoop();
			this.startRenderAircraftsLoop();
		}, (this.cameraScopeAircrafts.size > seconds) ? 3000 : seconds);
	}

	// Method to start the camera scope loop
	startCameraScopeLoop(seconds = 2000) {
		this.cameraScopeInterval = setInterval(() => {
			this.updateAircraftsInCameraScope();
			this.stopCameraScopeLoop();
			this.startCameraScopeLoop();
		}, (this.cameraScopeAircrafts.size > seconds) ? 3000 : seconds);
	}

	// Method to start the selected aircrafts loop
	startSelectedAircraftsLoop(seconds = 2000) {
		this.updateSelectedAircraft();
		this.selectedAircraftsInterval = setInterval(() => {
			this.updateSelectedAircraft();
		}, seconds);
	}

	// Method to stop the render aircrafts loop
	stopRenderAircraftsLoop() {
		clearInterval(this.renderAircraftsInterval);
	}

	// Method to stop the camera scope loop
	stopCameraScopeLoop() {
		clearInterval(this.cameraScopeInterval);
	}

	// Method to stop the selected aircrafts loop
	stopSelectedAircraftsLoop() {
		clearInterval(this.selectedAircraftsInterval);
	}
}