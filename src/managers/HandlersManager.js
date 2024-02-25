import StoreManager from './StoreManager.js';
import * as Cesium from 'cesium';
import MapRenderer from '$lib/MapRenderer.js';



export default class HandlersManager {

	static setClickHandler(viewer) {
		viewer.canvas.addEventListener('click', (event) => HandlersManager.clickHandler(event, viewer));
	}

	static setCameraMoveHandler(viewer) {
		viewer.camera.changed.addEventListener(() => {
			StoreManager.updateCameraCoordinates(viewer.camera.position);
			StoreManager.updateCanvasCornerCoordinates();
		});
	}

	static setEntityClickHandler(viewer) {
		viewer.selectedEntityChanged.addEventListener((selectedEntity) => HandlersManager.entityClickHandler(selectedEntity));
	}

	static entityClickHandler(selectedEntity) {
		if (selectedEntity !== undefined) {
			const selectedAircraft = MapRenderer.getAircraftByHex(selectedEntity.id);
			StoreManager.updateSelectedAircraft(selectedAircraft);
		}
	}

	static clickHandler(event, viewer) {
		const mousePosition = new Cesium.Cartesian2(event.clientX, event.clientY);
		const ellipsoid = viewer.scene.globe.ellipsoid;
		const cartesian = viewer.camera.pickEllipsoid(mousePosition, ellipsoid);
		if (cartesian) {
			const cartographic = ellipsoid.cartesianToCartographic(cartesian);
			const lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(5);
			const lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(5);
			StoreManager.updateMouseCoordinates(lat, lon);
		}
	}

}




// const click = viewer.screenSpaceEventHandler.getInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);

// viewer.screenSpaceEventHandler.setInputAction(function (event) {
// 	clickHandler(viewer, event);
// }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);