import { getChainInfo } from '../constants/chainInfo'
import { ethers,BigNumber } from 'ethers'
import { Unsigedtx } from './buildMpcTx'

export function cutOut(str: string, start: number, end: number) {
  // console.log(str)
  if (!str) return ''
  const str1 = str.substr(0, start)
  const str2 = str.substr(str.length - end)
  return (str = str1 + '…' + str2)
}

export function formatUnits(chainId: number | undefined, value: string | number) {
  const chainInfo = getChainInfo(chainId)
  if (chainInfo) {
    return ethers.utils.formatUnits(value.toString(), chainInfo?.nativeCurrency.decimals) + ' ' + chainInfo?.nativeCurrency.symbol
  } else {
    return '...'
  }
}

export function formatTxApprove(txmsglist: Array<string>): Array<Unsigedtx> {
  const result: Array<Unsigedtx> = []
  txmsglist.forEach(str => {
    const json: Unsigedtx = JSON.parse(str)
    result.push(json)
  })
  return result
}

export function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(' ')
}

export function formatToWei(value: string | number, decimals: number) {
  return ethers.utils.parseUnits(value.toString(), decimals).toString()
  //ethers.utils.parseUnits
}

export function formatFromWei(value: string | number, decimals: number) {
  return ethers.utils.formatUnits(value.toString(), decimals).toString()
  //ethers.utils.parseUnits
}

export function checkThreshold(str: string) {
  const list = str.split('/')
  if (list[0] === list[1]) {
    return true
  } else {
    return false
  }
}

export function nowThreshold(str: string,Signed:number  ) {
  const list = str.split('/')
  return Signed+"/"+list[1]
}

export function gasFee(gas:number|string,gasPrise:number|string):string{
  const gasBN = BigNumber.from (gas.toString())
  const gasPriseBN = BigNumber.from(gasPrise.toString())
  return gasBN.mul(gasPriseBN).toString()

}
