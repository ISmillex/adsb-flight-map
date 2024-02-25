<script>
	import {stores} from '$lib/Stores.js';

	function buttonClicked(button) {
		switch (button) {
			case "follow":
				$stores.buttons.followAircraft = !$stores.buttons.followAircraft;
				break;
			case "selected":
				$stores.buttons.showOnlySelectedAircraft = !$stores.buttons.showOnlySelectedAircraft;
				break;
			case "random":
				$stores.buttons.showRandomAircraft = !$stores.buttons.showRandomAircraft;
				break;
		}
	}

</script>



{#if $stores.selectedAircraft !== null}
	<div class="button-container" style="left: {$stores.selectedAircraft === null ? '10px' : '19%'}">
		<div class="button" class:activeButton={$stores.buttons.followAircraft}
				 on:click={() => {buttonClicked("follow")}}>F
		</div>
		<div class="button" class:activeButton={$stores.buttons.showOnlySelectedAircraft}
				 on:click={() => {buttonClicked("selected")}}>S
		</div>
		<div class="button" class:activeButton={$stores.buttons.showRandomAircraft}
				 on:click={() => {buttonClicked("random")}}>R
		</div>
	</div>
{/if}




<style>
    .button-container {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 100;
    }

    .button {
        position: relative;
        width: 30px;
        height: 30px;
        border-radius: 30%;
        margin-bottom: 5px;
        background-color: rgba(0, 0, 0, 0.5);
        color: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(5px);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        cursor: pointer;
        transition: 0.3s ease-in-out;
    }

    .button:hover {
        background-color: rgba(255, 255, 255, 0.3);
        color: black;
    }

    .activeButton {
        background-color: rgba(255, 255, 255, 0.5);
        color: black;
    }
</style>