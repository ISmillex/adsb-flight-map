export const GET = async ({ request, url }) => {

	const hex = url.searchParams.get('hex');
	const reg = url.searchParams.get('reg');
	const icoaType = url.searchParams.get('icoaType');

	try {
		const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/8.6.0' } };
		const baseUrl = 'https://api.planespotters.net/pub/photos';
		const response = await fetch(`${baseUrl}//hex/${hex}?reg=${reg}&icaoType=${icoaType}`, options);

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


