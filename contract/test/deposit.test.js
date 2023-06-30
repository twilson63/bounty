import { test } from 'uvu'
import * as assert from 'uvu/assert'

test('deposit bounty', async () => {
  globalThis.ContractAssert = (expr, msg) => {
    if (!expr) {
      throw new Error(msg)
    }
  }
  globalThis.SmartWeave = {
    block: {
      height: 1210500
    },
    transaction: {
      id: 'XS7rezPRnBJ10nnGILFlo_AArsGxmj5YoTGbP0tPj2s'
    },
    contracts: {
      write: (id, input) => Promise.resolve({ type: 'ok' })
    }
  }
  const state = {
    bounties: {
      '9LIaZ2EM8SwrCg5vahGZ54kAlvDB2DX7gs0CUeVQxF0':{
        claimHeight:2220568,
        contract:"KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw",
        done:false,
        hash:"foobarbaz=",
        name:"riddle",
        qty:1_000_000
      }
    }
  }
  const action = {
    caller: 'vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI',
    input: {
      function: 'deposit',
      bounty: '9LIaZ2EM8SwrCg5vahGZ54kAlvDB2DX7gs0CUeVQxF0',
      qty: 1_000_000, // one U
      transaction: 'SQ859AcynNpG6Bga5X7twCLfSWYO7MGTzGduBzEM6DY',
    }
  }
  const { handle } = await import('../src/contract.js')
  const result = await handle(state, action)
  
  assert.equal(result.state.bounties["9LIaZ2EM8SwrCg5vahGZ54kAlvDB2DX7gs0CUeVQxF0"].qty, 2_000_000)
  assert.ok(true)
})

test.run()