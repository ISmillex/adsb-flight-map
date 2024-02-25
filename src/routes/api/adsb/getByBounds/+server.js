export const GET = async ({ request, url }) => {
	const southLat = url.searchParams.get('southLat');
	const northLat = url.searchParams.get('northLat');
	const westLon = url.searchParams.get('westLon');
	const eastLon = url.searchParams.get('eastLon');

	try {
		const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/8.6.0' } };
		const baseUrl = 'https://adsb.lol/re-api';
		const response = await fetch(`${baseUrl}/?box=${southLat},${northLat},${westLon},${eastLon}`, options);


		if (response.ok) {
			const data = await response.json();
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
