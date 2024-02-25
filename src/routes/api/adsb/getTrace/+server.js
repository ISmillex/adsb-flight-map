export const GET = async ({ request, url }) => {

	const type = url.searchParams.get('type');
	const hex = url.searchParams.get('hex');

	try {
		const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/8.6.0' } };
		const baseUrl = 'https://adsb.lol/data/traces/';
		const response = await fetch(`${baseUrl}/${type}/trace_full_${hex}.json`, options);

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
	return jsonResponse({ message: 'An error occurred while fetching by bound', error }, 500);
}
