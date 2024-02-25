<script>

	import Draggable from './Draggable.svelte';
	import SearchBar from './SearchBar.svelte';
	import Filter from './Filter.svelte';
	import Table from './Table.svelte';
	import Pagination from './Pagination.svelte';

	import { stores } from '$lib/Stores.js';

	let initialRect;

</script>



<div class="content" bind:contentRect={initialRect} style="width: {$stores.isMenuOpen ? $stores.menuSize : 0}%">
	<Draggable initialRect={initialRect} />
	<div class="wrapper">
		<div class="flex-container">
			<SearchBar />
			<Filter />
		</div>
		<Table />
		<Pagination/>
	</div>
</div>




<style>
    .content {
        position: fixed;
        top: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        width: 250px;
        height: 100vh;
        background: linear-gradient(45deg, rgba(0,0,0,0.5), rgba(0,0,0,0.6));
        backdrop-filter: blur(10px);
        z-index: 10;
        color: rgba(255, 255, 255, 0.8);
        box-shadow: 0 0 20px rgba(0,0,0,0.8);
        transition: width 0.3s;
        user-select: none; /* Add this line */
				align-items: flex-end;
    }

    .wrapper {
        width: 100%;
        height: 93%;
        display: flex;
        margin: 0 auto;
        position: relative;
        flex-direction: column;
        align-items: center;
				justify-content: center;
        overflow-y: auto;
    }

		.flex-container {
				display: flex;
				justify-content: space-between;
				width: 98%;
				margin-bottom: 10px;
		}


</style>