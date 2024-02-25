import Fetcher from '$lib/Fetcher.js';
import StoreManager from './StoreManager.js';
import {sortOptions, filters, tableAircrafts, tableItemsPerPage, paginationClick} from './StoreManager.js';

export default class TableManager {

	static fetcher = new Fetcher();

	static async updateAircraftTable() {

		const aircrafts = await TableManager.fetcher.fetchAllAircrafts()
			.then(res => res.data)
			.then(data => data.aircraft);

		const filtered_aircrafts = TableManager.applyFilters(aircrafts, filters);
		TableManager.sortBy(filtered_aircrafts, sortOptions);
		StoreManager.updateAllAircrafts(aircrafts);
	}


	static updateCurrentTablePage(hex) {
		if (!paginationClick) {
			const index = tableAircrafts.findIndex(item => item.hex === hex);
			if (index !== -1) {
				StoreManager.updateCurrentTablePage(Math.ceil((index + 1) / tableItemsPerPage));
			}
		}
	}

	static async startAircraftTableLoop(seconds=10000) {
		TableManager.updateAircraftTable();
		TableManager.aircraftTable = setInterval(() => {
			TableManager.updateAircraftTable();
		}, seconds);
	}

	static async stopAircraftsListRefreshLoop() {
		clearInterval(TableManager.aircraftTable);
	}

	static applyFilters(aircrafts, filters) {
		/*
		filters =
		{
			adsbVersion: false
			aircraftType: true
			alertFlag: false
			altimeterSetting: false
		}
		 */
		// return aircrafts with only the keys that are true in filters
		const filtered = aircrafts.map(aircraft => {
			const filteredAircraft = {};
			for (const key in aircraft) {
				if (filters[key]) {
					filteredAircraft[key] = aircraft[key];
				}
			}
			return filteredAircraft;
		});
		StoreManager.updateFilterOptions(filters);
		return filtered;
	}

	static sortBy(filtered_aircrafts, sortedOptions) {
		const {key, order} = sortedOptions;
		if (key === '') {
			return filtered_aircrafts;
		}
		// should sort whole array based on one key, and then updateAllAircrafts
		const sorted = filtered_aircrafts.sort((a, b) => {
			if (a[key] > b[key]) {
				return order === 'asc' ? 1 : -1;
			}
			if (a[key] < b[key]) {
				return order === 'asc' ? -1 : 1;
			}
			return 0;
		});
		StoreManager.updateSortOptions(sortedOptions);
		StoreManager.updateTableAircrafts(sorted);
	}






}