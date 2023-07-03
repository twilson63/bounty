<script>
  export let value;
  export let required = false;
</script>

<div>
  <label class="block text-xs font-medium text-gray-700">
    <slot />
    <input
      type="text"
      {required}
      bind:value
      class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
    />
  </label>
</div>
