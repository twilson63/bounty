<script>
  import { closeModal } from "svelte-modals";
  import Button from "../core/button.svelte";

  export let isOpen;
  export let message;
</script>

{#if isOpen}
  <div role="dialog" class="modal">
    <div
      class="flex flex-col bg-white rounded-md min-width-[240px] p-4 justify-between pointer-events-auto"
    >
      <div class="text-xl md:text-3xl my-8 text-center uppercase text-red-700">
        {message}
      </div>
      <Button on:click={() => closeModal()}>Close</Button>
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
