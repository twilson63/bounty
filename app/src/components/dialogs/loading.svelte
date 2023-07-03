<script>
  export let isOpen;
</script>

{#if isOpen}
  <div role="dialog" class="modal">
    <div
      class="flex flex-col bg-white rounded-md min-width-[240px] p-4 justify-between pointer-events-auto"
    >
      <img
        src="https://g8way.io/IkMJRqi_0Xx_QhstK4WE3rsQqQxC07n84UagPgqGXfc"
        alt="Loading"
      />
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
