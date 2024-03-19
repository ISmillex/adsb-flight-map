import { browser } from '$app/environment';
import Decoder from '$lib/Decoder.js';

export default class Fetcher {
	constructor() {
		if (browser) {
			this.PORT = 5173;
			this.BASE_URL = `http://${window.location.hostname}:${this.PORT}/api/adsb`;
		}
		this.ENDPOINTS = {
			getByBounds: '/getByBounds',
			getByHex: '/getByHex',
			getTrace: '/getTrace',
			getPhoto: '/getPhoto',
			getAircraftTypes: '/getAircraftTypes',
			getRouteSet: '/getRouteSet'
		};
		this.defaultOptions = {
			method: 'GET',
			headers: {
				"accept": "*/*",
				"accept-language": "en-US,en;q=0.9",
				"x-requested-with": "XMLHttpRequest",
				"Referer": "https://globe.adsb.fi/",
				"Referrer-Policy": "strict-origin-when-cross-origin"
			}
		};
		this.SOUTH = -90;
		this.NORTH = 90;
		this.WEST = -180;
		this.EAST = 180;
	}



	async makeRequest(url, options = this.defaultOptions) {
		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return await response.json();
		} catch (error) {
			console.error(`Failed to fetch: ${error}`);
		}
	}

	async fetchAircraftsByBounds(south, north, west, east) {
		const url = `${this.BASE_URL}${this.ENDPOINTS.getByBounds}?southLat=${south}&northLat=${north}&westLon=${west}&eastLon=${east}&headers=${JSON.stringify(this.defaultOptions.headers)}`;
		return await this.makeRequest(url);
	}

	async fetchAircraftByHex(hex) {
		const url = `${this.BASE_URL}${this.ENDPOINTS.getByHex}?hex=${hex}&headers=${JSON.stringify(this.defaultOptions.headers)}`;
		return await this.makeRequest(url);
	}

	async fetchAllAircrafts() {
		const url = `${this.BASE_URL}${this.ENDPOINTS.getByBounds}?southLat=${this.SOUTH}&northLat=${this.NORTH}&westLon=${this.WEST}&eastLon=${this.EAST}&headers=${JSON.stringify(this.defaultOptions.headers)}`;
		return await this.makeRequest(url);
	}

	async fetchTrace(type, hex) {
		const url = `${this.BASE_URL}${this.ENDPOINTS.getTrace}?type=${type}&hex=${hex}`;
		return await this.makeRequest(url);
	}

	async fetchPhoto(hex, reg, icoaType) {
		const url = `${this.BASE_URL}${this.ENDPOINTS.getPhoto}?hex=${hex}&reg=${reg}&icoaType=${icoaType}`;
		return await this.makeRequest(url);
	}

	async fetchAircraftTypes() {
		const url = `${this.BASE_URL}${this.ENDPOINTS.getAircraftTypes}`;
		return await this.makeRequest(url);
	}
}