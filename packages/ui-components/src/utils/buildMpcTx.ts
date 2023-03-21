import { ethers, BigNumber } from 'ethers'

import ERC20ABI from '../constants/ABI/ERC20.json'
import { formatToWei } from './index'

export type assertType = {
  name: string
  img: string
  contractaddress?: string
  balance: string
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
}

export function buidTransactionJson(chainType: string, chainId: number, data: TxInput): Unsigedtx {
  const havecontractaddress = data.assert?.contractaddress === '' ? false : true
  let encodeFunctionData = ''
  if (havecontractaddress && data.assert?.contractaddress !== undefined) {
    const erc20Contract = new ethers.utils.Interface(ERC20ABI)
    //  erc20Contract.transfer(data.from,data.to,formatToWei(data.originValue,18))
    encodeFunctionData = erc20Contract.encodeFunctionData('transferFrom', [data.from, data.to, formatToWei(data.originValue, 18)])
  }
  return {
    from: data.from,
    to: data.assert?.contractaddress || data.to,
    gas: data.gas,
    gasPrice: data.gasPrice,
    originValue: formatToWei(data.originValue, 18),
    name: data.name,
    chainId: ethers.utils.hexValue(chainId),
    value: ethers.utils.hexValue(BigNumber.from(formatToWei(data.originValue, 18))),
    data: encodeFunctionData
  }
}
