<script>
	import { stores } from '$lib/Stores.js';

	let selected = false;
	let initialPos;
	export let initialRect;

	let minMenuWidth = 18;
	let maxMenuWidth = 50;

	// Function to handle resizing
	function resize(element) {
		// Event listener for mousedown event
		function onMousedown(event) {
			selected = true;
			// Check if initialRect is null
			if (!initialRect) {
				// Initialize initialRect with default values if it's null
				initialRect = { width: 0 };
			} else {
				initialRect = { width: initialRect.width };
			}
			initialPos = {
				x: event.pageX,
				y: event.pageY
			};
		}

		// Event listener for mouseup event
		function onMouseup() {
			if (!selected) return;
			selected = false;
			initialRect = null;
			initialPos = null;
		}

		// Event listener for mousemove event
		function onMove(event) {
			if (!selected) return;
			const delta = initialPos.x - event.pageX;
			const newWidth = initialRect.width + delta;
			let newWidthPercentage = (newWidth / window.innerWidth) * 100;

			// Limit newWidthPercentage within the range of minMenuWidth and maxMenuWidth
			newWidthPercentage = Math.max(minMenuWidth, Math.min(maxMenuWidth, newWidthPercentage));

			$stores.menuSize = newWidthPercentage;
		}

		// Add event listeners
		element.addEventListener('mousedown', onMousedown);
		window.addEventListener('mousemove', onMove);
		window.addEventListener('mouseup', onMouseup);

		return {
			// Remove event listeners when the component is destroyed
			destroy() {
				element.removeEventListener('mousedown', onMousedown);
				window.removeEventListener('mousemove', onMove);
				window.removeEventListener('mouseup', onMouseup);
			}
		};
	}
</script>

<div class="draggable" use:resize></div>

<style>
    .draggable {
        cursor: col-resize;
        height: 100%;
        width: 5px;
    }
</style>