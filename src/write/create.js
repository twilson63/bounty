export async function create(state, action) {
  // claim bounty from contract
  const result = await SmartWeave.contracts.write(
    action.input.contract, {
    function: 'claim',
    qty: action.input.qty,
    transaction: action.input.transaction
  })
  if (result.type !== 'ok') {
    return state
  }
  state.bounties[SmartWeave.transaction.id] = {
    name: action.input.name,
    hash: action.input.hash,
    qty: action.input.qty,
    contract: action.input.contract,
    claimHeight: action.input.height,
    done: false
  }
  return { state }
}