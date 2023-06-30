export async function create(state, action) {
  // validate inputs
  ContractAssert(action.input.name, 'Name is required!')
  ContractAssert(action.input.contract, 'Contract is required!')
  ContractAssert(action.input.transaction, 'Transaction is required!')
  ContractAssert(action.input.hash, 'Hash of secret is required!')
  ContractAssert(action.input.height, 'Block Height required!')
  ContractAssert(action.input.contract.length === 43, 'Contract should be Valid')
  ContractAssert(action.input.transaction.length === 43, 'Transaction should be valid!')
  
  ContractAssert(Number.isInteger(action.input.qty), 'qty must be integer')
  ContractAssert(Number.isInteger(action.input.height), 'height must be integer')
  // claim bounty from contract
  await SmartWeave.contracts.write(
    action.input.contract, {
    function: 'claim',
    qty: action.input.qty,
    txID: action.input.transaction
  })
  
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