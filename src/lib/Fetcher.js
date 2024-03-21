import { browser } from '$app/environment';
import {currentApi} from '../managers/StoreManager.js';

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
			headers: this.selectHeader()
		};
		this.SOUTH = -90;
		this.NORTH = 90;
		this.WEST = -180;
		this.EAST = 180;
	}


	selectHeader() {
		switch (currentApi) {
			case 'globe.adsb.fi':
				return {
					"accept": "*/*",
					"accept-language": "en-US,en;q=0.9",
					"x-requested-with": "XMLHttpRequest",
					"Referer": "https://globe.adsb.fi/",
					"Referrer-Policy": "strict-origin-when-cross-origin"
				};
			case 'adsb.lol':
				return {
					"accept": "*/*",
					"accept-language": "en-US,en;q=0.9",
					"x-requested-with": "XMLHttpRequest",
					"Referer": "https://adsb.lol/",
					"Referrer-Policy": "strict-origin-when-cross-origin"
				};
			case 'globe.adsb.one':
				return {
					"accept": "*/*",
					"accept-language": "en-US,en;q=0.9",
					"x-requested-with": "XMLHttpRequest",
					"Referer": "https://globe.adsb.one/",
					"Referrer-Policy": "strict-origin-when-cross-origin"
				};
			case 'globe.adsbexchange.com':
				return {
					"accept": "*/*",
					"accept-language": "en-US,en;q=0.9",
					"sec-ch-ua": "\"Not(A:Brand\";v=\"24\", \"Chromium\";v=\"122\"",
					"sec-ch-ua-mobile": "?0",
					"sec-ch-ua-platform": "\"macOS\"",
					"sec-fetch-dest": "empty",
					"sec-fetch-mode": "cors",
					"sec-fetch-site": "same-origin",
					"x-requested-with": "XMLHttpRequest",
					"cookie": "adsbx_sid=1711186880861_av2lefsay3v",
					"Referer": "https://globe.adsbexchange.com/",
					"Referrer-Policy": "strict-origin-when-cross-origin"
				};
			case "globe.airplanes.live":
				return {
					"accept": "*/*",
					"accept-language": "en-US,en;q=0.9",
					"x-requested-with": "XMLHttpRequest",
					"Referer": "https://globe.airplanes.live/",
					"Referrer-Policy": "strict-origin-when-cross-origin"
				};
		}

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