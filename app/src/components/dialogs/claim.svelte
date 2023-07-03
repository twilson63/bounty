<script>
  import { closeModal } from "svelte-modals";
  import Text from "../core/text.svelte";
  import Button from "../core/button.svelte";

  import Services from "../../services/index.js";
  import Bounties from "../../domains/index.js";

  const services = Services.init({});
  const bounties = Bounties.init(services);

  // provided by <Modals />
  export let isOpen;
  export let contract;
  export let onDone;
  let secret;
  let buttonLabel = "CLAIM";
  let buttonDisabled = false;

  async function handleClaim() {
    buttonLabel = "SUBMITTING...";
    buttonDisabled = true;
    const result = await bounties.claim(contract, secret).toPromise();
    closeModal();
    onDone(result);
  }
</script>

{#if isOpen}
  <div role="dialog" class="modal">
    <div
      class="flex flex-col bg-white rounded-md min-width-[240px] p-4 justify-between pointer-events-auto"
    >
      <h2 class="text-3xl">Claim Bounty</h2>
      <div class="px-4 mt-4">
        <p class="text-xl mb-4">Enter Bounty Identifier and Secret to claim!</p>
        <form
          class="flex flex-col space-y-2"
          on:submit|preventDefault={handleClaim}
        >
          <Text value={contract}>Id</Text>
          <Text bind:value={secret}>Secret</Text>
          <Button disabled={buttonDisabled}>{buttonLabel}</Button>
        </form>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    /* allow click-through to backdrop */
    pointer-events: none;
  }
</style>
