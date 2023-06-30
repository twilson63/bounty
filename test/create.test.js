import { test } from 'uvu'
import * as assert from 'uvu/assert'

test('create bounty', async () => {
  globalThis.SmartWeave = {
    transaction: {
      id: 'XS7rezPRnBJ10nnGILFlo_AArsGxmj5YoTGbP0tPj2s'
    },
    contracts: {
      write: (id, input) => Promise.resolve({ type: 'ok' })
    }
  }
  const state = {
    bounties: {

    }
  }
  const action = {
    caller: 'vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI',
    input: {
      function: 'create',
      hash: 'DXSavhN3VzST4N90340SguRpZ3VKHrx8xjI5I6eIrVw=',
      qty: 1_000_000, // one U
      contract: 'KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw',
      height: 1212071,
    }
  }
  const { handle } = await import('../src/contract.js')
  const result = await handle(state, action)
  console.log(JSON.stringify(result, null, 2))
  assert.equal(result.state.bounties["XS7rezPRnBJ10nnGILFlo_AArsGxmj5YoTGbP0tPj2s"].done, false)
  assert.ok(true)
})

test.run()