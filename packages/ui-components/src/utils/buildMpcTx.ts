import { ethers, BigNumber } from 'ethers'

import ERC20ABI from '../constants/ABI/ERC20.json'
import { formatToWei } from './index'

export type assertType = {
  name: string
  img: string
  contractaddress?: string
  balance?: string
  decimals: number
}

export type TxInput = {
  from: string
  to: string
  gas: number
  gasPrice: number
  originValue: string
  name: string
  assert?: assertType
}
export type Unsigedtx = TxInput & {
  chainId: string
  value: string
  data: string
  nonce?: number
  toReview?: string
}

export function buidTransactionJson(chainType: string, chainId: number, data: TxInput): Unsigedtx | undefined {
  const havecontractaddress = data.assert?.contractaddress === '' ? false : true
  if (data.assert == undefined) {
    return undefined
  }
  let encodeFunctionData = '0x'
  if (havecontractaddress && data.assert?.contractaddress !== undefined) {
    const erc20Contract = new ethers.utils.Interface(ERC20ABI)
    //  erc20Contract.transfer(data.from,data.to,formatToWei(data.originValue,18))
    encodeFunctionData = erc20Contract.encodeFunctionData('transfer', [data.to, formatToWei(data.originValue, data.assert.decimals)])
    // encodeFunctionData = erc20Contract.encodeFunctionData('transferFrom', [data.from, data.to, formatToWei(data.originValue, data.assert.decimals)])
  }

  return {
    from: data.from,
    to: data.assert?.contractaddress || data.to,
    gas: data.gas,
    gasPrice: data.gasPrice,
    originValue: data.originValue,
    name: data.name,
    chainId: ethers.utils.hexValue(chainId),
    value: data.assert?.contractaddress == undefined ? ethers.utils.hexValue(BigNumber.from(formatToWei(data.originValue, data.assert.decimals))) : '0x0',
    data: encodeFunctionData
  }
}

export function buidTransactionForTxbuild(chainType: string, chainId: number, data: TxInput, encodeFunctionData: string, havenative: boolean): Unsigedtx {
  return {
    from: data.from,
    to: data.to,
    gas: data.gas,
    gasPrice: data.gasPrice,
    originValue: data.originValue,
    name: data.name,
    chainId: ethers.utils.hexValue(chainId),
    value: havenative ? ethers.utils.hexValue(BigNumber.from(data.originValue)) : '0x0',
    data: encodeFunctionData
  }
}
