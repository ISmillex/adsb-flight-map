export const GET = async ({ request, url }) => {

	const hex = url.searchParams.get('hex');

	try {
		const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/8.6.0' } };
		const baseUrl = 'https://adsb.lol/re-api';
		const response = await fetch(`${baseUrl}/?find_hex=${hex}`, options);

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
	return jsonResponse({ message: 'Fetch by hex successfully executed', data }, 200);
}

function errorResponse(error) {
	return jsonResponse({ message: 'An error occurred while fetching by hex', error }, 500);
}
