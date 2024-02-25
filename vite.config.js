import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import cesium from 'vite-plugin-cesium';

export default defineConfig({
	plugins: [sveltekit(), cesium({
	})]
});
