<script>
	import { stores } from '$lib/Stores.js';


	function getTotalPages(aircrafts) {
		const totalItems = aircrafts.length;
		const itemsPerPage = $stores.tableItemsPerPage;
		return Math.ceil(totalItems / itemsPerPage);
	}

	function isLastPage(aircrafts) {
		return $stores.currentTablePage === getTotalPages(aircrafts);
	}

	function next() {
		$stores.currentTablePage++;
		$stores.paginationClick = true;
	}

	function previous() {
		$stores.currentTablePage--;
		$stores.paginationClick = true;
	}

</script>


<div class="content">
	<div class="buttons">
		<button on:click={previous} disabled={$stores.currentTablePage === 1}>Previous</button>
		<button on:click={next} disabled={isLastPage($stores.searchAircrafts.length !== 0 ? $stores.searchAircrafts : $stores.tableAircrafts)}>Next</button>
	</div>
	<div class="text">
		Page {$stores.currentTablePage} of {getTotalPages($stores.searchAircrafts.length !== 0 ? $stores.searchAircrafts : $stores.tableAircrafts)}
	</div>
</div>


<style>

		.content {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
		}

		.buttons {
				display: flex;
				justify-content: center;
				align-items: center;
		}

    button {
        margin: 10px;
        padding: 5px 10px;
        font-size: 12px;
        font-weight: 500;
        border: none;
        background: rgba(255,255,255,0.6);
        color: black;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.3s;
    }

    button:hover {
        background: rgba(255,255,255,0.9);
    }

    button:disabled {
        background: rgba(255,255,255,0.6);
        cursor: not-allowed;
    }
</style>