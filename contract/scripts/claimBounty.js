import { WarpFactory } from 'warp-contracts'
import fs from 'fs'

const jwk = JSON.parse(fs.readFileSync('./wallet.json', 'utf-8'))
const warp = WarpFactory.forMainnet()

const BOUNTY = '3aKev6c03KbpHQMLy9I83i1OoSDmOHJo7GsMBomjCiM'
const options = {
  allowBigInt: true,
  unsafeClient: 'skip',
  internalWrites: true,
  remoteStateSyncEnabled: true
}
async function main(answer) {
  const bounty = warp.contract(BOUNTY).connect(jwk).setEvaluationOptions(options)
  const result = await bounty.writeInteraction({
    function: 'claimBounty',
    secret: answer,
    bounty: 'XLvpfqqEqZmVaRPeX2MPGaCbIwLc-fMvNcJV2WnghnM'
  })
}

main('YOUR_ANSWER')