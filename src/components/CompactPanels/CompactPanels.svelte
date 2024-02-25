<script>

	import SideButtons from './SideButtons.svelte';
	import InfoPanel from './InfoPanel.svelte';

	import {stores} from '$lib/stores.js';

	let cameraCoordinates, mouseCoordinates, numberOfAircraft;
	let bottomLeft, bottomRight, topLeft;

	$: cameraCoordinates =  [
		{"label": "Latitude", "value": $stores.cameraCoordinates.lat + "°"},
		{"label": "Longitude", "value": $stores.cameraCoordinates.lon + "°"},
		{"label": "Altitude", "value": $stores.cameraCoordinates.alt + "ft"}
	]

	$: mouseCoordinates =  [
		{"label": "Mouse Latitude", "value": $stores.mouseCoordinates.lat + "°"},
		{"label": "Mouse Longitude", "value": $stores.mouseCoordinates.lon + "°"}
	]

	$: numberOfAircraft = [
		{"label": "Total Aircrafts", "value": $stores.allAircrafts.length},
		{"label": "On Screen", "value": $stores.numberOfAircraftsInScope}
	]

	$: bottomLeft = {
		"horizontal": "left",
		"vertical": "bottom",
		"horizontalMargin": $stores.selectedAircraft === null ? '10px' : '19%',
		"verticalMargin": "10px"
	}

	$: bottomRight = {
		"horizontal": "right",
		"vertical": "bottom",
		"horizontalMargin": $stores.isMenuOpen ? ($stores.menuSize+1)+"%" : "10px",
		"verticalMargin": "10px"
	}

	$: topLeft = {
		"horizontal": "left",
		"vertical": "top",
		"horizontalMargin": $stores.selectedAircraft === null ? '10px' : '19%',
		"verticalMargin": "10px"
	}

</script>


<SideButtons/>
<InfoPanel position={bottomLeft} info={cameraCoordinates}/>
<InfoPanel position={bottomRight} info={mouseCoordinates}/>
<InfoPanel position={topLeft} info={numberOfAircraft}/>

