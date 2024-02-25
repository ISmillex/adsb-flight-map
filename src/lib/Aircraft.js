import StoreManager, { viewer } from '../managers/StoreManager.js';
import * as Cesium from 'cesium';

import { AIRCRAFT_MAP, ALTITUDE_COLORS } from '$lib/Constants.js';


/**
 * The Aircraft class represents an aircraft in the application.
 * It contains information about the aircraft and methods to manipulate and display the aircraft on the map.
 */
export default class Aircraft {

	constructor(data) {
		AIRCRAFT_MAP.forEach(item => {
			this[item.key] = this.checkValue(data[item.raw_key]);
		});
		this.entity = null;
		this.photos = null;
		this.isInitiallyDrawn = false;
	}


	/**
	 * The drawEntity method adds an entity to the viewer with the given options.
	 */
	drawEntity(options) {
		this.entity = viewer.entities.add(options);
	}


	/**
	 * The drawAircraft method draws the aircraft on the map.
	 * It creates an entity with the aircraft's position, image, rotation, and color.
	 */
	drawAircraft() {
		this.drawEntity({
			id: this.hex,
			position: Cesium.Cartesian3.fromDegrees(this.longitude, this.latitude, this.barometricAltitude),
			billboard: {
				image: "/model.png",
				width: 32,
				height: 32,
				rotation: Cesium.Math.toRadians(360 - this.trackAngle),
				color: this.chooseColor(),
			}
		});
		this.isInitiallyDrawn = true;
	}


	/**
	 * The drawTrace method draws the trace of the aircraft on the map.
	 * It creates a polyline entity with the given trace coordinates.
	 */
	drawTrace(traces) {
		const coordinates = traces.map(trace => {
			return Cesium.Cartesian3.fromDegrees(trace[2], trace[1], trace[3] === null || trace[3] === 'ground' ? 0 : trace[3]);
		});
		this.drawEntity({
			polyline: {
				positions: coordinates,
				width: 2,
				material: Cesium.Color.RED,
			},
		});
	}


	/**
	 * The removeAircraft method removes the aircraft's entity from the viewer.
	 */
	removeAircraft() {
		if (this.entity) {
			viewer.entities.remove(this.entity);
			this.entity = null;
		}
	}


	/**
	 * The hideAircraft method hides the aircraft's entity in the viewer.
	 */
	hideAircraft() {
		if (this.entity) {
			this.entity.show = false;
		}
	}


	/**
	 * The updateAircraftData method updates the aircraft's data with the given data.
	 */

	updateAircraftData(data) {
		AIRCRAFT_MAP.forEach(item => {
			this[item.key] = this.checkValue(data[item.raw_key]);
		});
	}


	/**
	 * The updateAircraftPosition method updates the aircraft's position in the viewer.
	 * It also updates the aircraft's rotation and color.
	 */
	updateAircraftPosition() {
		if (this.entity) {
			if (this.entity.show === false)
				this.entity.show = true;
			this.entity.position = Cesium.Cartesian3.fromDegrees(this.longitude, this.latitude, this.barometricAltitude);
			this.entity.billboard.rotation = Cesium.Math.toRadians(360 - this.trackAngle);
			this.entity.billboard.color = this.chooseColor();
		}
	}

	/**
	 * The checkValue method checks if a value is undefined, null, or 'ground'.
	 * If it is, it returns a default value. If the value is an empty string, it returns "N/A".
	 * Otherwise, it returns the value.
	 */
	checkValue(value, defaultValue = 0) {
		if (value === undefined || value === null || value === 'ground') {
			return defaultValue;
		}
		else if (value === '')
			return "N/A"
		else
			return  value
	}


	/**
	 * The chooseColor method chooses a color for the aircraft based on its barometric altitude.
	 * It returns the color associated with the first key in ALTITUDE_COLORS that is greater than the aircraft's barometric altitude.
	 * If no such key exists, it returns Cesium.Color.PURPLE.
	 */
	chooseColor() {
		const keys = Object.keys(ALTITUDE_COLORS);
		for (let i = 0; i < keys.length; i++) {
			const key = Number(keys[i]);
			if (this.barometricAltitude < key) {
				return ALTITUDE_COLORS[key];
			}
		}
		return Cesium.Color.PURPLE;
	}


	/**
	 * The follow method makes the viewer's camera follow the aircraft.
	 * It updates the followAircraft state in the StoreManager and flies the camera to the aircraft's position.
	 */
	follow() {
		StoreManager.updateFollowAircraft(true);
		const camera = viewer.camera;
		const height = camera.positionCartographic.height;
		const position = Cesium.Cartesian3.fromDegrees(this.longitude, this.latitude, height);
		camera.flyTo({
			destination: position
		});
	}


	/**
	 * The fetchPhoto method fetches a photo of the aircraft.
	 * If the photos property is null, it fetches a photo using the given fetcher and sets the photos property to the fetched photo.
	 */
	async fetchPhoto(fetcher) {
		if (this.photos === null) {
			this.photos = await fetcher.fetchPhoto(this.hex,
				this.registration,
				this.aircraftType)
					.then(res => res.data.photos[0])
		}
	}


	/**
	 * The scaleAndColorSelectedAircraft method scales and colors the aircraft's entity in the viewer.
	 * It sets the entity's color to Cesium.Color.RED and its scale to 1.5.
	 */
	scaleAndColorSelectedAircraft() {
		this.entity.billboard.color = Cesium.Color.RED;
		this.entity.billboard.scale = 1.5;
	}

}
