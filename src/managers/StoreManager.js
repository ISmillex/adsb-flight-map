import { stores } from "$lib/Stores.js";
import MapRenderer from '$lib/MapRenderer.js';
import * as Cesium from 'cesium';

export let viewer;
export let selectedAircraft;
export let filters;
export let sortOptions;
export let buttons;
export let tableItemsPerPage;
export let tableAircrafts;
export let paginationClick;
export let currentApi;

stores.subscribe($stores => viewer = $stores.viewer);
stores.subscribe($stores => selectedAircraft = $stores.selectedAircraft);
stores.subscribe($stores => buttons = $stores.buttons);
stores.subscribe($stores => filters = $stores.filters);
stores.subscribe($stores => sortOptions = $stores.sortOptions);
stores.subscribe($stores => tableItemsPerPage = $stores.tableItemsPerPage);
stores.subscribe($stores => tableAircrafts = $stores.tableAircrafts);
stores.subscribe($stores => paginationClick = $stores.paginationClick);
stores.subscribe($stores => currentApi = $stores.currentApi);



export default class StoreManager {


	static updatePaginationClick(click) {
		stores.update(store => {
			store.paginationClick = click;
			return store;
		});

	}

	static updateCurrentTablePage(page) {
		stores.update(store => {
			store.currentTablePage = page;
			return store;
		});
	}

	static updateTableAircrafts(aircrafts) {
		stores.update(store => {
			store.tableAircrafts = aircrafts;
			return store;
		});
	}

	static updateFilterOptions(options) {
		stores.update(store => {
			store.filterOptions = options;
			return store;
		});
	}

	static updateSortOptions(options) {
		stores.update(store => {
			store.sortOptions = options;
			return store;
		});
	}


	static updateSelectedAircraft(aircraft) {
		stores.update(store => {
			store.selectedAircraft = aircraft;
			return store;
		});
	}


	static updateFollowAircraft(follow) {
		stores.update(store => {
			store.followAircraft = follow;
			return store;
		});

	}

	static updateMouseCoordinates(lat, lon) {
		stores.update(store => {
			store.mouseCoordinates.lat = lat;
			store.mouseCoordinates.lon = lon;
			return store;
		});
	}


	static updateAllAircrafts(aircrafts) {
		stores.update(store => {
			store.allAircrafts = aircrafts;
			return store;
		});
	}

	static updateNumberOfAircraftsInScope(number) {
		stores.update(store => {
			store.numberOfAircraftsInScope = number;
			return store;
		});
	}

	static updateCameraCoordinates(position) {
		const currentCartographic = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position);
		stores.update(store => {
			store.cameraCoordinates.lat = Cesium.Math.toDegrees(currentCartographic.latitude).toFixed(5);
			store.cameraCoordinates.lon = Cesium.Math.toDegrees(currentCartographic.longitude).toFixed(5);
			store.cameraCoordinates.alt = currentCartographic.height.toFixed(0);
			return store;
		});
	}

	static updateCanvasCornerCoordinates() {
		const {south, west, north, east} = MapRenderer.calculateCameraPositions()
		stores.update(store => {
			store.canvasCornerCoordinates.latS = south.toFixed(5);
			store.canvasCornerCoordinates.lonW = west.toFixed(5);
			store.canvasCornerCoordinates.latN = north.toFixed(5);
			store.canvasCornerCoordinates.lonE = east.toFixed(5);
			return store;
		});
	}


}