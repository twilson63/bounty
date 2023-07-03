import {assert, test} from 'vitest'
import testUtils from '../test-utils.js'

test('list bounties', async () => {
  const services = testUtils
  const Domains = await import('./index.js')
  const bounties = Domains.default.init(services)
  const results = await bounties.list().toPromise()
  assert.equal(results.length, 2)
  assert.ok(true)
})