import Decoder from '$lib/Decoder.js';
import {currentApi} from "../../../../managers/StoreManager.js";


export const GET = async ({ request, url }) => {
	const southLat = url.searchParams.get('southLat');
	const northLat = url.searchParams.get('northLat');
	const westLon = url.searchParams.get('westLon');
	const eastLon = url.searchParams.get('eastLon');
	const headers = url.searchParams.get('headers');

	try {

		const options = { method: 'GET', headers: JSON.parse(headers) };

		const baseUrl = `https://${currentApi}/re-api`;

		const response = await fetch(`${baseUrl}/?binCraft&zstd&box=${southLat},${northLat},${westLon},${eastLon}`, options);

		if (response.ok) {
			const buffer = await response.arrayBuffer()
			const data = await Decoder.decode(buffer);
			return successResponse(data);
		} else {
			return errorResponse(response.statusText);
		}
	} catch (error) {
		return errorResponse(error);
	}
};

function jsonResponse(body, status) {
	return new Response(JSON.stringify(body), { status });
}

function successResponse(data) {
	return jsonResponse({ message: 'Fetch by bound successfully executed', data }, 200);
}

function errorResponse(error) {

	return new Response(JSON.stringify({ message: 'An error occurred while fetching by bound', error }), { status: 500 });
}
