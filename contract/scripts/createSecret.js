import Arweave from 'arweave'

async function main() {
  const hash = (await Arweave.crypto.hash('permaweb')).toString('base64')
  console.log(hash)
}  

main()