# Bounty Contract

This is a contract idea based off of many ideas that are in discussion, from Luke's Dark Asset, to $U, and the ability to provide micro rewards to users and developers.

This micro-bounty contract allows any owner of a PST to post a bounty to be claimed with a secret greater than a given height.

To create the secret the user must hash a secret string.

```js
const hash = (await arweave.crypto.hash('My Secret String')).toString('base64')
```

Then the user must create the bounty using FCP 2.0. First the user will call allow on the contract they want to reward. For example U, they would call allow on U with the amount of U they want to reward and the target would be this bounty contract.

Then the user would call `create` on this bounty contract to create the bounty.

```js
const input = {
  function: 'create',
  hash: hash,
  qty: 0.01 * 1e6,
  name: 'Hackathon bounty',
  contract: UContract,
  transaction: AllowTransaction,
  height: blockHeight
}
```

## Claim the prize

So when the contest is over, the author will share the secret with the winner, and they can call the contract to claim the prize. And the contract will transfer the bounty to the caller with the correct secret.

```js
const input = {
  function: 'claim',
  bounty: bountyIdentifier,
  secret: 'My Secret String'
}
```

And the winner gets their loot! This should work for any FCP 2.0 PST!

