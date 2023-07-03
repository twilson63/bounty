import { of, fromPromise, Resolved, Rejected } from 'hyper-async'
import { path, filter, propEq, mapObjIndexed, assoc, values } from 'ramda'
//import { InjectedArweaveSigner } from 'warp-contracts-plugin-signature';

const BOUNTY = 'vN2driMRZwdrDcKmYL3Rz72OIEqxZVg-vL9IFhZg4Ck'
const options = {
  allowBigInt: true,
  internalWrites: true,
  unsafeClient: 'skip',
  remoteStateSyncEnabled: true,
  remoteStateSyncSource: 'https://dre-5.warp.cc/contract'
}

export default {
  init(env) {    
    function list() {
      const contract = env.warp
        .contract(BOUNTY)
        .setEvaluationOptions(options)

      return fromPromise(contract.readState.bind(contract))()
        .map(path(['cachedValue', 'state', 'bounties']))
        .map(filter(propEq(false, 'done')))
        .map(mapObjIndexed((v,k) => assoc('id', k, v)))
        .map(values)
    }

    function create(bounty) {
      //const userSigner = new InjectedArweaveSigner(globalThis.arweaveWallet)
      const contract = env.warp
        .contract(BOUNTY)
        //.connect(userSigner)
        .connect('use_wallet')
        .setEvaluationOptions(options)
  
      const asset = env.warp.contract(bounty.contract)
      .connect('use_wallet').setEvaluationOptions(options)
      const createBounty = fromPromise(contract.writeInteraction.bind(contract))
      const readState = fromPromise(asset.readState.bind(asset))
      const allowClaim = fromPromise(asset.writeInteraction.bind(asset))
      const createHash = fromPromise(async (input) => {
        input.hash = await env.hash(bounty.secret)
        return input
      })
      // check balance first
      return readState()
        .map(path(['cachedValue', 'state', 'balances', bounty.address]))
        .chain(balance => Number(bounty.qty) < Number(balance)
          ? Resolved({function: 'allow', target: BOUNTY, qty: Number(bounty.qty)}) 
          : Rejected('Not enough Balance!')
        )
        .chain(allowClaim)
        .map(({originalTxId}) => ({
          function: 'createBounty',
          name: bounty.name,
          transaction: originalTxId,
          contract: bounty.contract,
          qty: Number(bounty.qty),
          height: 1211892,
          hash: ''
        }))
        .chain(createHash)
        .chain(createBounty)
        // sync DRE
        // verify
        .map(x => (console.log('result', x), {ok : true}))


    }

    function claim(bounty, secret) {
      const contract = env.warp
        .contract(BOUNTY)
        //.connect(userSigner)
        .connect('use_wallet')
        .setEvaluationOptions(options)
      const claimBounty = fromPromise(contract.writeInteraction.bind(contract))
      const readState = fromPromise(contract.readState.bind(contract))
      return of({function: 'claimBounty', bounty, secret })
        .chain(claimBounty)
        .chain(readState)
        .map(path(['cachedValue', 'state', 'bounties', bounty]))
        .map(({done}) => ({ok: done}))
    }

    return {
      list,
      create,
      /*
      deposit,
      */
      claim
    }

  }
}

