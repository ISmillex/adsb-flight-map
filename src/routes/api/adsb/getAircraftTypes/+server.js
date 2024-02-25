export const GET = async ({ request, url }) => {

	const hex = url.searchParams.get('hex');

	try {
		const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/8.6.0' } };
		const baseUrl = 'https://adsb.lol/db2';
		const response = await fetch(`${baseUrl}/icao_aircraft_types2.js`, options);

		if (response.ok) {
			const data = await response.json();
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
	return jsonResponse({ message: 'Fetch aircraft types successfully executed', data }, 200);
}

function errorResponse(error) {
	return jsonResponse({ message: 'An error occurred while fetching aircraft types', error }, 500);
}


