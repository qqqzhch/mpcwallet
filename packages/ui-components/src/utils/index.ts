import { getChainInfo } from '../constants/chainInfo'
import { ethers } from 'ethers'

export function cutOut(str: string, start: number, end: number) {
  // console.log(str)
  if (!str) return ''
  const str1 = str.substr(0, start)
  const str2 = str.substr(str.length - end)
  return (str = str1 + '…' + str2)
}

export function formatUnits(chainId: number | undefined, value: string) {
  const chainInfo = getChainInfo(chainId)
  if (chainInfo) {
    return ethers.utils.formatUnits(value, chainInfo?.nativeCurrency.decimals) + ' ' + chainInfo?.nativeCurrency.symbol
  } else {
    return '...'
  }
}
