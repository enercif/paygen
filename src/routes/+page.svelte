<script lang="ts">
	import Combobox from '$lib/components/ui/combobox/combobox.svelte';
	import * as Field from '$lib/components/ui/field/index.js';
	import * as InputGroup from '$lib/components/ui/input-group/index.js';
	import { currencyCodeToSymbol, currencyNameToCode } from '$lib/const/currency.map';
	import { UseClipboard } from '$lib/hooks/use-clipboard.svelte';
	import { usernameState } from '$lib/state/username.state.svelte';
	import AtSignIcon from '@lucide/svelte/icons/at-sign';
	import IconCheck from '@lucide/svelte/icons/check';
	import IconCopy from '@lucide/svelte/icons/copy';
	import { Confetti } from 'svelte-confetti';

	const clipboard = new UseClipboard({ delay: 2000 });

	const currencyItems = Array.from(currencyNameToCode.entries()).map(([label, value]) => ({
		value,
		label
	}));

	let value: number = $state(0);
	let currency: string = $state('EUR');
	let link: string = $derived(`https://paypal.me/${usernameState.current}/${value}${currency}`);
</script>

<svelte:head>
	<title>PayMe Link Generator</title>
</svelte:head>

<div class="flex h-dvh w-screen items-center justify-center">
	<Field.Set class="mx-10 w-full max-w-xl">
		<Field.Legend>PayMe Link Generator</Field.Legend>
		<Field.Group>
			<Field.Field>
				<Field.Label for="username">Nutzername</Field.Label>
				<InputGroup.Root>
					<InputGroup.Input id="username" bind:value={usernameState.current} />
					<InputGroup.Addon>
						<AtSignIcon />
					</InputGroup.Addon>
				</InputGroup.Root>
				<Field.Description>Dein Paypal Nutzername</Field.Description>
			</Field.Field>
			<Field.Field>
				<Field.Label for="value">Wert</Field.Label>

				<div class="flex flex-row items-center gap-1">
					<InputGroup.Root>
						<InputGroup.Input id="value" bind:value type="number" />
						<InputGroup.Addon>{currencyCodeToSymbol.get(currency)}</InputGroup.Addon>
					</InputGroup.Root>
					<Combobox
						items={currencyItems}
						bind:value={currency}
						placeholder="Währung wählen..."
						searchPlaceholder="Währung suchen..."
						emptyText="Keine Währung gefunden."
					/>
				</div>
			</Field.Field>

			<Field.Field>
				<Field.Label for="link">Link</Field.Label>

				<InputGroup.Root>
					<InputGroup.Input value={link} readonly />
					<InputGroup.Addon align="inline-end">
						<InputGroup.Button
							aria-label="Copy"
							title="Copy"
							size="icon-xs"
							class="relative"
							onclick={() => clipboard.copy(link)}
						>
							{#if clipboard.copied}
								<IconCheck />
								<span class="pointer-events-none absolute inset-0 flex items-center justify-center">
									<Confetti cone size={8} amount={40} x={[-0.4, 0.4]} y={[0.25, 0.75]} />
								</span>
							{:else}
								<IconCopy />
							{/if}
						</InputGroup.Button>
					</InputGroup.Addon>
				</InputGroup.Root>
			</Field.Field>
		</Field.Group>
	</Field.Set>
</div>
