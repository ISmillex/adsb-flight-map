<script>
	import { stores } from '$lib/Stores.js';
	import {AIRCRAFT_MAP} from '$lib/Constants.js';

	let groupedItems = AIRCRAFT_MAP.reduce((acc, item) => {
		if (!acc[item.group]) {
			acc[item.group] = [];
		}
		acc[item.group].push(item);
		return acc;
	}, {});

</script>

<div class="information">
	{#each Object.keys(groupedItems) as group}
		<div class="group">{group}</div>
		{#each groupedItems[group] as item}
			<div class="item">
				<div class="title" title={item.description}>{item.title}: </div>
				<div class="value">{$stores.selectedAircraft[item.key]}<span class="units">{item.unit}</span></div>
			</div>
		{/each}
	{/each}
</div>

<style>

    .information {
        width: 95%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: auto;
    }

    .group {
        width: 100%;
        text-align: left;
        font-size: 20px;
        font-weight: 500;
        margin-top: 20px;
        color: #fff;
        border-bottom: 1px solid rgba(255,255,255,0.3);
        padding-bottom: 10px;
    }

    .item {
        width: 100%;
        text-align: left;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        transition: background 0.3s;
    }

    .item:last-child {
        margin-bottom: 10px;
    }

    .item:hover {
        background: rgba(255,255,255,0.1);
    }

    .title {
        font-size: 13px;
        font-weight: 400;
    }

    .value {
        font-size: 15px;
        font-weight: 600;
    }

    .units {
        margin-left: 2px;
        font-size: 15px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.65);
    }

</style>