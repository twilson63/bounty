import { test } from 'uvu'
import * as assert from 'uvu/assert'
import Arweave from 'arweave'

test('create bounty', async () => {
  globalThis.ContractAssert = (expr, msg) => {
    if (!expr) {
      throw new Error(msg)
    }
  }
  globalThis.SmartWeave = {
    contracts: {
      write: (id, input) => Promise.resolve({ type: 'ok' })
    },
    arweave: {
      crypto: {
      hash: (secret) => Arweave.crypto.hash(secret)
    }
  },
    block: {
      height: 1212072
    }
  }
  const state = {
    bounties: {
      "XS7rezPRnBJ10nnGILFlo_AArsGxmj5YoTGbP0tPj2s": {
        hash: "DXSavhN3VzST4N90340SguRpZ3VKHrx8xjI5I6eIrVw=",
        qty: 1000000,
        contract: "KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw",
        claimHeight: 1212071,
        done: false
      }
    }
  }
  const action = {
    caller: 'vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI',
    input: {
      function: 'claimBounty',
      secret: 'FooBar',
      bounty: 'XS7rezPRnBJ10nnGILFlo_AArsGxmj5YoTGbP0tPj2s'
    }
  }
  const { handle } = await import('../src/contract.js')
  const result = await handle(state, action)
  //console.log(JSON.stringify(result, null, 2))
  assert.equal(
    result.state.bounties['XS7rezPRnBJ10nnGILFlo_AArsGxmj5YoTGbP0tPj2s'].done,
    true
  )
  assert.ok(true)
})

test.run()