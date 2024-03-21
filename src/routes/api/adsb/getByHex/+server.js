import Decoder from '$lib/Decoder.js';
import {currentApi} from "../../../../managers/StoreManager.js";

export const GET = async ({ request, url }) => {

	const hex = url.searchParams.get('hex');
	const headers = url.searchParams.get('headers');

	try {
		const options = { method: 'GET', headers: JSON.parse(headers) };

		const baseUrl = `https://${currentApi}/re-api`;


		const response = await fetch(`${baseUrl}/?binCraft&zstd&find_hex=${hex}`, options);


		if (response.ok) {
			const buffer = await response.arrayBuffer()
			const data = await Decoder.decode(buffer);
			return successResponse(data);
		} else {
			errorResponse(response.statusText);
		}
	} catch (error) {
		return errorResponse(error);
	}
};

function jsonResponse(body, status) {
	return new Response(JSON.stringify(body), { status });
}

function successResponse(data) {
	return jsonResponse({ message: 'Fetch by hex successfully executed', data }, 200);
}

function errorResponse(error) {
	return jsonResponse({ message: 'An error occurred while fetching by hex', error }, 500);
}
