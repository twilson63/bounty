<script>
  import { Modals, closeModal, openModal } from "svelte-modals";
  import Claim from "./components/dialogs/claim.svelte";
  import Loading from "./components/dialogs/loading.svelte";
  import Success from "./components/dialogs/success.svelte";
  import Error from "./components/dialogs/error.svelte";
  import Text from "./components/core/text.svelte";
  import Button from "./components/core/button.svelte";
  import Card from "./components/core/card.svelte";
  import Services from "./services/index.js";
  import Bounties from "./domains/index.js";

  let showCreate = false;
  let bounty = {
    name: "",
    secret: "",
    contract: "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw",
    qty: "1",
  };
  const services = Services.init({});
  const bounties = Bounties.init(services);

  async function handleSubmit() {
    openModal(Loading);
    //await new Promise((r) => setTimeout(r, 5000));
    //const result = await Promise.resolve({ ok: false });

    if (!globalThis.arweaveWallet) {
      closeModal();
      return alert("ArConnect Wallet Required!");
    }
    await globalThis.arweaveWallet.connect([
      "ACCESS_ADDRESS",
      "SIGN_TRANSACTION",
      "DISPATCH",
      "ACCESS_PUBLIC_KEY",
    ]);

    bounty.address = await globalThis.arweaveWallet.getActiveAddress();

    const result = await bounties
      .create(bounty)
      .toPromise()
      .catch((e) => {
        //console.log(e);
        return { ok: false };
      });
    closeModal();
    if (result.ok) {
      showCreate = false;
      bounty = {};
      getList();
      openModal(Success);
    } else {
      openModal(Error, { message: "Could not create bounty!" });
    }
  }
  function showClaim(contract) {
    return () =>
      openModal(Claim, {
        contract,
        onDone: (result) => {
          if (result.ok) {
            openModal(Success);
          } else {
            openModal(Error, { message: "Incorrect Claim Secret!" });
          }
          getList();
        },
      });
  }

  function getList() {
    list = bounties.list().toPromise();
  }
  let list = bounties.list().toPromise();
</script>

<main>
  <div class="min-h-screen">
    <div class="flex flex-col items-center">
      <h1 class="text-xl md:text-6xl mb-8">Permaweb Bounties</h1>
      {#if showCreate}
        <div class="md:w-1/3">
          <h3 class="text-sm md:text-2xl my-4">Create Bounty</h3>
          <form
            class="font-mono flex flex-col space-y-2"
            on:submit|preventDefault={handleSubmit}
          >
            <Text required={true} bind:value={bounty.name}>Name</Text>
            <Text required={true} bind:value={bounty.secret}>Secret</Text>
            <Text required={true} bind:value={bounty.contract}
              >Reward Asset</Text
            >
            <Text required={true} bind:value={bounty.qty}>Reward Qty</Text>
            <Button>Create Bounty</Button>
            <Button type="button" on:click={() => (showCreate = false)}
              >Cancel</Button
            >
          </form>
        </div>
      {:else}
        <Button on:click={() => (showCreate = true)}>Create Bounty</Button>
      {/if}
    </div>
    {#await list then bs}
      <div class="mt-16 md:mx-8 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
        {#each bs as b}
          <div class="mt-4 h-32 rounded-lg bg-gray-100 w">
            <Card bounty={b} on:click={showClaim(b.id)} />
          </div>
        {/each}
      </div>
    {/await}
  </div>
</main>
<Modals>
  <div
    class="backdrop"
    slot="backdrop"
    on:click={closeModal}
    on:keydown={(e) => (e.key === "Escape" ? closeModal() : null)}
  />
</Modals>

<style>
  .backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
  }
</style>
