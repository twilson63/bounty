<script>
  export let href;
</script>

<a
  {href}
  class="inline-block rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
>
  <span
    class="block uppercase font-bold rounded-sm bg-white px-8 py-3 text-sm font-medium hover:bg-transparent"
  >
    <slot />
  </span>
</a>
