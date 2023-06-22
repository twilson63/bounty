export async function claim(state, action) {

  const attempt = (await SmartWeave.crypto.hash(action.input.secret)).toString('base64')
  const bounty = state.bounties[action.input.bounty]
  if (bounty.done) {
    return { state, result: { message: 'Bounty is done!' } }
  }
  if (bounty.claimHeight > SmartWeave.block.height) {
    return { state, result: { message: 'Not time to claim!' } }
  }

  if (attempt !== bounty.hash) {
    // sorry try again
    return { state, result: { message: 'No Match! ' } }
  }

  // you won
  const result = await SmartWeave.contracts.write(bounty.contract, {
    function: 'transfer',
    target: action.caller,
    qty: bounty.qty,
  })
  if (result.type !== 'ok') {
    return { state, result: { message: 'could not transfer bounty' } }
  }
  state.bounties[action.input.bounty].done = true
  state.bounties[action.input.bounty].height = SmartWeave.block.height
  return { state }
}