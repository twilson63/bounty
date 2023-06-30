import { WarpFactory } from 'warp-contracts'
import fs from 'fs'

const jwk = JSON.parse(fs.readFileSync('./wallet.json', 'utf-8'))
const warp = WarpFactory.forMainnet()
const U = 'KTzTXT_ANmF84fWEKHzWURD1LWd9QaFR9yfYUwH2Lxw'
const BOUNTY = '3aKev6c03KbpHQMLy9I83i1OoSDmOHJo7GsMBomjCiM'
const REWARD = 10000
const options = {
  allowBigInt: true,
  unsafeClient: 'skip',
  internalWrites: true,
  remoteStateSyncEnabled: true
}
async function main() {
  const u = warp.contract(U).connect(jwk).setEvaluationOptions(options)
  const bounty = warp.contract(BOUNTY).connect(jwk).setEvaluationOptions(options)

  const {originalTxId} = await u.writeInteraction({
    function:'allow',
    target: BOUNTY,
    qty: REWARD
  })

  const result = await bounty.writeInteraction({
    function: 'createBounty',
    name: 'riddle',
    hash: 'cak3q8/MbtS9Ej6vy3hObrGIgynJknZb0aGs1CUBcF4=',
    contract: U,
    qty: REWARD,
    height: 1210568,
    transaction: originalTxId
  })
  console.log(result)
}

main()