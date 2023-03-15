import { ethers, BigNumber } from 'ethers'

export type TxInput = {
  from: string
  to: string
  gas: number
  gasPrice: number
  originValue: string
  name: string
}
export type Unsigedtx = TxInput & {
  chainId: string
  value: string
  data: string
  nonce?: number
}

export function buidTransactionJson(chainType: string, chainId: number, data: TxInput): Unsigedtx {
  return {
    ...data,
    chainId: ethers.utils.hexValue(chainId),
    value: ethers.utils.hexValue(BigNumber.from(data.originValue)),
    data: ''
  }
}
