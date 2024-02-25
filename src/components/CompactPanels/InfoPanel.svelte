<script>
	export let position = {
		horizontal: 'left',
		vertical: 'bottom',
		horizontalMargin: '10px',
		verticalMargin: '10px'
	};

	export let info = [
		{"label": "", "value": ""}
	]

</script>



<div class="container" style="{position.horizontal}: {position.horizontalMargin}; {position.vertical}: {position.verticalMargin}">
	{#each info as {label, value}}
		<div class="item">{label}: <span>{value}</span></div>
	{/each}
</div>


<style>
    .container {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-end;
        padding: 5px;
        font-weight: 400;
        z-index: 100;
        color: rgba(255, 255, 255, 0.7);
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
        transition: 0.2s ease-in-out;
        border-radius: 5px;
    }


    .container:hover {
        background-color: rgba(0, 0, 0, 0.7);
    }

    .item {
        font-size: 13px;
    }

    .item:not(:last-child) {
        margin-bottom: 2px;
    }

    .item span {
        color: rgba(255, 255, 255, 0.85);
    }
</style>