import { test, assert } from 'vitest'
import testUtils from '../test-utils.js'

test('create bounty', async () => {
  const services = testUtils
  const Domains = await import('./index.js')
  const bounties = Domains.default.init(services)
  const result = await bounties.create({
    name: 'Challenge',
    hash: 'cak3q8/MbtS9Ej6vy3hObrGIgynJknZb0aGs1CUBcF4=',
    qty: 10000,
    height: 1210000,
    contract: 'KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw'
  }).toPromise()

  assert.ok(true)
})