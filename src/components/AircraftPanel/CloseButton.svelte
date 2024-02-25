
<script>
	import {stores} from '$lib/Stores.js';

	function close() {
		$stores.selectedAircraft = null;
	}

</script>

<div class="closeButton" on:click={close}>
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
		<line x1="18" y1="6" x2="6" y2="18"></line>
		<line x1="6" y1="6" x2="18" y2="18"></line>
	</svg>
</div>

<style>
    .closeButton {
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
        color: white;
        font-size: 20px;
        transition: color 0.3s;
    }

    .closeButton:hover {
        color: #f00;
    }

</style>