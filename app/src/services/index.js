import { WarpFactory, LoggerFactory } from 'warp-contracts'
import Arweave from 'arweave'
import base64js from 'base64-js'

LoggerFactory.INST.logLevel('fatal')
const warp = WarpFactory.forMainnet()

export default {
  init(env) {
    return {
      warp,
      hash: async (txt) => {
        const encoder = new TextEncoder()
        const data = encoder.encode(txt)
        const result = await Arweave.crypto.hash(data)
        return base64js.fromByteArray(result)
      }
    }
  }
}