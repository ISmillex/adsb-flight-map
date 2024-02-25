<script>
	import {stores} from '$lib/Stores.js';

	let photoSrc;

	$: if ($stores.selectedAircraft.photos) {
		if ($stores.selectedAircraft.photos.thumbnail_large && $stores.selectedAircraft.photos.thumbnail_large.src) {
			photoSrc = $stores.selectedAircraft.photos.thumbnail_large.src;
		} else if ($stores.selectedAircraft.photos.thumbnail && $stores.selectedAircraft.photos.thumbnail.src) {
			photoSrc = $stores.selectedAircraft.photos.thumbnail.src;
		}
		else {
			photoSrc = '/default-plane.jpg'
		}
	}

</script>


{#if $stores.selectedAircraft.photos !== null}
	<div class="image">
		<img src={photoSrc}>
	</div>
{/if}

<style>

    .image {
        width: 100%;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        overflow: hidden;
    }

    .image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s;
    }


</style>