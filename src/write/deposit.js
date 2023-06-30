// allow wallet holders to deposit to a bounty
// bounty: id
// qty: 1000
// transaction: AllowTX
export async function deposit(state, action) {
  ContractAssert(action.input.bounty, 'Bounty is required!')
  ContractAssert(action.input.qty, 'Qty is required!')
  ContractAssert(action.input.transaction, 'Transaction is required!')
  ContractAssert(Number.isInteger(action.input.qty), 'Qty MUST be integer!')
  ContractAssert(action.input.bounty.length === 43, 'Bounty MUST be valid identifier!')
  ContractAssert(action.input.transaction.length === 43, 'Transaction MUST be valid identifier!')

  const bounty = state.bounties[action.input.bounty]
  
  ContractAssert(!bounty.done, 'Bounty is completed!')
  ContractAssert(bounty.claimHeight > SmartWeave.block.height, 'No more deposits allowed!')
  
  await SmartWeave.contracts.write(
    bounty.contract, {
    function: 'claim',
    qty: action.input.qty,
    txID: action.input.transaction
  })
  
  state.bounties[action.input.bounty].qty += action.input.qty

  return { state }

}