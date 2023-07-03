<script>
  export let isOpen;
</script>

{#if isOpen}
  <div role="dialog" class="modal">
    <div class="contents">
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

  .contents {
    min-width: 240px;
    border-radius: 6px;
    padding: 16px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: auto;
  }

  .actions {
    margin-top: 32px;
    display: flex;
    justify-content: flex-end;
  }
</style>
