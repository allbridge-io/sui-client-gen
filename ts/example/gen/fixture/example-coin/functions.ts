import { PUBLISHED_AT } from '..'
import { ObjectArg, obj } from '../../_framework/util'
import { TransactionBlock } from '@mysten/sui.js'

export function faucetMint(txb: TransactionBlock, faucet: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::example_coin::faucet_mint`,
    arguments: [obj(txb, faucet)],
  })
}

export function faucetMintBalance(txb: TransactionBlock, faucet: ObjectArg) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::example_coin::faucet_mint_balance`,
    arguments: [obj(txb, faucet)],
  })
}

export function init(txb: TransactionBlock, otw: ObjectArg) {
  return txb.moveCall({ target: `${PUBLISHED_AT}::example_coin::init`, arguments: [obj(txb, otw)] })
}
