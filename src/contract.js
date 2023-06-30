import { create } from './write/create.js'
import { claim } from './write/claim.js'

export async function handle(state, action) {
  switch (action.input.function) {
    case 'createBounty':
      return create(state, action)
    case 'claimBounty':
      return claim(state, action)
    default:
      new ContractError('function is not found!')
  }
}