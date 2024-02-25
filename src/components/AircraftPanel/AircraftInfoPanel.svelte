<script>
	import {stores} from '$lib/Stores.js';
	import CloseButton from './CloseButton.svelte';
	import Thumbnail from './Thumbnail.svelte';
	import InformationDisplay from './InformationDisplay.svelte';
</script>

<div class="content" class:showPanel={$stores.selectedAircraft !== null}>
	<div class="wrapper">
		{#if $stores.selectedAircraft !== null}
			<CloseButton/>
			<Thumbnail/>
			<InformationDisplay/>
		{/if}
	</div>
</div>


<style>
    .content {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: space-between;
        width: 0;
        height: 100vh;
        background: linear-gradient(45deg, rgba(0,0,0,0.5), rgba(0,0,0,0.6));
        backdrop-filter: blur(10px);
        z-index: 10;
        color: rgba(255, 255, 255, 0.8);
        box-shadow: 0 0 20px rgba(0,0,0,0.8);
    }

    .showPanel {
        width: 18%;
        transition: width 0.3s;
    }
    .wrapper {
        width: 100%;
        height: 100vh;
        display: flex;
        margin: 0 auto;
        position: relative;
        flex-direction: column;
        align-items: center;
        overflow-y: auto;
    }

</style>