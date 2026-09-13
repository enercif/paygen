<script lang="ts">
	import favicon from '$lib/assets/favicon.png';
	import { ModeWatcher } from 'mode-watcher';
	import './layout.css';

	let { children } = $props();
</script>

<ModeWatcher />
<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
