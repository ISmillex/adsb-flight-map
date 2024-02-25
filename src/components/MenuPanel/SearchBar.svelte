<script>
	import { stores } from '$lib/Stores.js';

	let inputText = '';

	function search() {
		if (inputText.trim() !== '') {
			$stores.searchAircrafts = $stores.tableAircrafts.filter(aircraft => {
				return String(aircraft[$stores.selectedFilter]).toLowerCase().includes(inputText.toLowerCase());
			});
		}
		else {
			$stores.searchAircrafts = []
		}
	}


</script>




	<div class="search">
		<input type="text" placeholder="Search..."
					 bind:value={inputText} on:input={search}/>
	</div>



<style>
	.search {
			position: relative;
	}

	.search input {
			padding: 10px 20px;
      box-shadow: 0 0 20px rgba(0,0,0,0.8);
			border-radius: 5px;
      background: rgba(255,255,255,0.6);
			border: none;
	}

	.search input:focus {
			outline: none;
			background: rgba(255,255,255,0.9);
	}

	.search input::placeholder {
			color: #000;
	}

</style>