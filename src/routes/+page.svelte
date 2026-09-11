<script lang="ts">
	import Combobox from '$lib/components/ui/combobox/combobox.svelte';
	import * as Field from '$lib/components/ui/field/index.js';
	import * as InputGroup from '$lib/components/ui/input-group/index.js';
	import { currencyNameToCode } from '$lib/const/currency.map';
	import { UseClipboard } from '$lib/hooks/use-clipboard.svelte';
	import { usernameState } from '$lib/state/username.state.svelte';
	import AtSignIcon from '@lucide/svelte/icons/at-sign';
	import IconCheck from '@lucide/svelte/icons/check';
	import IconCopy from '@lucide/svelte/icons/copy';

	const clipboard = new UseClipboard();

	const currencyItems = Array.from(currencyNameToCode.entries()).map(([label, value]) => ({
		value,
		label
	}));

	let value: number = $state(0);
	let currency: string = $state('EUR');
	let link: string = $derived(`https://paypal.me/${usernameState.current}/${value}${currency}`);
</script>

<div class="flex h-dvh w-screen items-center justify-center">
	<Field.Set class="w-full max-w-xl">
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
						<InputGroup.Addon>€</InputGroup.Addon>
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
							onclick={() => clipboard.copy(link)}
						>
							{#if clipboard.copied}
								<IconCheck />
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
