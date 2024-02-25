<script>
	import { stores } from '$lib/Stores.js';
	import TableManager from '../../managers/TableManager.js';
	import MapRenderer from '$lib/MapRenderer.js';
	import Aircraft from '$lib/Aircraft.js';
	import { AIRCRAFT_MAP } from '$lib/Constants.js';


	function getAircraftsForCurrentPage(aircrafts) {
		const start = ($stores.currentTablePage - 1) * $stores.tableItemsPerPage;
		const end = $stores.currentTablePage * $stores.tableItemsPerPage;
		return aircrafts.slice(start, end);
	}

	function sort(key) {
		let options = {key: key}
		if ($stores.sortOptions.order === 'asc') {
			options.order = 'desc'
		} else {
			options.order = 'asc'
		}
		TableManager.sortBy($stores.allAircrafts, options)
	}

	function selectAircraft(hex) {
		let aircraft_instance = MapRenderer.getAircraftByHex(hex)
		if (!aircraft_instance) {
			for (let aircraft of $stores.allAircrafts) {
				if (aircraft.hex === hex) {
					aircraft_instance = new Aircraft(aircraft)
					break
				}
			}
		}

		$stores.selectedAircraft = aircraft_instance
		$stores.buttons.followAircraft = true;
	}

	function selectFilter(key) {
		$stores.selectedFilter = key
	}


	function getBackgroundColor(hex) {
		return $stores.selectedAircraft && $stores.selectedAircraft.hex === hex ? 'red' : 'unset';
	}


	function startHover(event) {
		event.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
	}

	function endHover(event) {
		event.target.style.backgroundColor = 'unset';
	}

</script>



<!--{#if !$stores.isFilterOpen}-->
	<div class="table">
		<table>
			<thead>
			<tr>
				{#each Object.keys($stores.filters) as key}
					{#if $stores.filters[key]}
						<th class="filters" class:selected-filter={key === $stores.selectedFilter}
								on:click={(event) => {
									if (event.button === 0)
										sort(key)
								}}

								on:contextmenu={(event) => {
									if (event.button === 2) {
										event.preventDefault()
										selectFilter(key)
									}
								}}>
						{AIRCRAFT_MAP.find(item => item.raw_key === key).title}</th>
					{/if}
				{/each}
			</tr>
			</thead>
			<tbody>
			{#each getAircraftsForCurrentPage(($stores.searchAircrafts.length !== 0 ? $stores.searchAircrafts : $stores.tableAircrafts)) as aircraft}
				<tr class="aircraft" on:click={() => {selectAircraft(aircraft.hex)}}
														style="background-color: {getBackgroundColor(aircraft.hex)};"
														on:mouseenter={startHover}
														on:mouseleave={endHover}>
					{#each Object.keys($stores.filters) as key}
						{#if $stores.filters[key]}
							<td class:selected-filter={key === $stores.selectedFilter}>{aircraft[key]}</td>
						{/if}
					{/each}
				</tr>
			{/each}
			</tbody>
		</table>
	</div>
<!--{/if}-->



<style>
    .table {
        width: 100%;
        overflow: auto;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        padding: 10px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

		.filters {
			cursor: pointer;
		}

		.filters:hover {
			background-color: rgba(255, 255, 255, 0.1);
		}

    .aircraft {
				cursor: pointer;
		}

		.selected-filter {
			background-color: rgba(255, 255, 255, 0.1);
		}


</style>