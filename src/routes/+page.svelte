<script>

	import AircraftInfoPanel from '../components/AircraftPanel/AircraftInfoPanel.svelte';
	import MenuPanel from '../components/MenuPanel/MenuPanel.svelte';
	import CompactPanels from '../components/CompactPanels/CompactPanels.svelte';
	import MenuButton from '../components/MenuPanel/MenuButton.svelte';

	import MapRenderer from "$lib/MapRenderer.js";
	import HandlersManager from '../managers/HandlersManager.js';
	import TableManager from '../managers/TableManager.js';


	import { onMount } from "svelte";
	import { stores } from '$lib/Stores.js';
	import * as Cesium from 'cesium';



	onMount(async () => {
		const viewer = new Cesium.Viewer("cesiumContainer", {
			// navigationInstructionsInitiallyVisible: true,
			baseLayer: Cesium.ImageryLayer.fromWorldImagery({
				style: Cesium.IonWorldImageryStyle.AERIAL,
			}),
			baseLayerPicker: false,
		});


		$stores.viewer = viewer;
		const renderer = new MapRenderer(viewer);

		HandlersManager.setClickHandler(viewer);
		HandlersManager.setCameraMoveHandler(viewer);
		HandlersManager.setEntityClickHandler(viewer);

		TableManager.startAircraftTableLoop();

		renderer.startCameraScopeLoop();//
		renderer.startSelectedAircraftsLoop(); // sonra
		renderer.startRenderAircraftsLoop(); //


	})

</script>


<div class="content">
	{#if $stores.viewer}
		<AircraftInfoPanel />
		<MenuPanel/>
	{/if}
		<CompactPanels/>
		<div id="cesiumContainer"></div>
		<MenuButton />
</div>



<style>
    .content {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>