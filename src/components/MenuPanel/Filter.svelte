<script>
	import { stores } from '$lib/Stores.js';
	import { AIRCRAFT_MAP } from '$lib/Constants.js';

</script>



<div class="content">
	<button on:click={() => $stores.isFilterOpen = !$stores.isFilterOpen}>{$stores.isFilterOpen ? 'Close Filters' : 'Open Filters'}</button>
	{#if $stores.isFilterOpen}
		<div class="filter">
			{#each Object.keys(AIRCRAFT_MAP) as index}
				<div class="filter-item">
					<label for={AIRCRAFT_MAP[index].key}>{AIRCRAFT_MAP[index].title}</label>
					<input type="checkbox" id={AIRCRAFT_MAP[index].key}
								 name={AIRCRAFT_MAP[index].key}
								 value={AIRCRAFT_MAP[index].key}
								 bind:checked={$stores.filters[AIRCRAFT_MAP[index].raw_key]}
					>
				</div>
			{/each}
		</div>
	{/if}
</div>





<style>
    .content {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
    }

    .filter {
        display: flex;
        flex-direction: column;
        overflow-y: auto;
				max-height: 100px;
				position: relative;
    }

    .filter-item {
        display: flex;
				align-items: center;
				justify-content: flex-end;
    }

    button {
        font-size: 12px;
        font-weight: 500;
        border: none;
        background: rgba(255,255,255,0.6);
        color: black;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.3s, transform 0.3s;
        padding: 10px 20px;
				margin-bottom: 10px;
    }



    button:hover {
        background: rgba(255,255,255,0.9);
    }

    button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    label {
        font-size: 15px;
        color: #fff;
        margin-right: 5px;
        transition: color 0.3s;
    }

		input {
			margin-right: 5px;

		}

</style>