import { writable } from 'svelte/store';
import {AIRCRAFT_MAP} from './Constants.js';

export const stores = writable({

	viewer: null,
	selectedAircraft: null,

	isMenuOpen: false,
	isFilterOpen: false,
	menuSize: 24,

	selectedFilter: 'hex',
	filters: AIRCRAFT_MAP.map(item => item.raw_key).reduce((acc, key) => {
		switch (key) {
			case 'hex':
			case 'flight':
			case 'r':
			case 't':
			case 'squawk':
			case 'lat':
			case 'lon':
			case 'alt_baro':
				acc[key] = true;
				break;
			default:
				acc[key] = false;
				break;
		}
		return acc;
	}, {}),

	sortOptions: {
		key: 'hex',
		order: 'asc'
	},

	allAircrafts: [],
	tableAircrafts: [],
	searchAircrafts: [],

	currentTablePage: 1,
	tableItemsPerPage: 17,
	tableItemClicked: false,


	numberOfAircraftsInScope: 0,

	buttons: {
		followAircraft: false,
		showRandomAircraft: false,
		showOnlySelectedAircraft: false,
	},

	mouseCoordinates : {
		lat: 0,
		lon: 0,
	},

	cameraCoordinates : {
		lat: 0,
		lon: 0,
		alt: 0
	},

	canvasCornerCoordinates : {
		latS: 0,
		latN: 0,
		lonW: 0,
		lonE: 0
	}

});