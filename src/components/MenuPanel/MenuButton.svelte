<script>
	import {stores} from "$lib/Stores.js";

	function clickHandler() {
		$stores.isMenuOpen = !$stores.isMenuOpen;
	}

</script>


<div class="content" on:click={clickHandler}
		 style="background: {$stores.isMenuOpen ? 'transparent' : 'rgba(0, 0, 0, 0.5)'}; backdrop-filter: {$stores.isMenuOpen ? 'none' : 'blur(5px)'}">
	<svg class:active={$stores.isMenuOpen} class="ham hamRotate ham4" viewBox="0 0 100 100" >
		<path class="line top" d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20" />
		<path class="line middle" d="m 70,50 h -40" />
		<path class="line bottom" d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20" />
	</svg>
</div>



<style>

			.content {
					position: fixed;
					top: 10px;
					right: 10px;
					display: flex;
					width: 50px;
					height: 50px;
					z-index: 100;
					border-radius: 50%;
			}


    .ham {
        width: 100%;
        z-index: 200;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        transition: transform 400ms;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .hamRotate.active {
        transform: rotate(45deg);
    }
    .hamRotate180.active {
        transform: rotate(180deg);
    }
    .line {
        fill:none;
        transition: stroke-dasharray 400ms, stroke-dashoffset 400ms;
        stroke:white;
        stroke-width:5.5;
        stroke-linecap:round;
    }
    .ham4 .top {
        stroke-dasharray: 40 121;
    }
    .ham4 .bottom {
        stroke-dasharray: 40 121;
    }
    .ham4.active .top {
        stroke-dashoffset: -68px;
    }
    .ham4.active .bottom {
        stroke-dashoffset: -68px;
    }


</style>
