import { getChainInfo } from '../constants/chainInfo'
import { ethers, BigNumber } from 'ethers'
import { Unsigedtx } from './buildMpcTx'

export function cutOut(str: string, start: number, end: number) {
  // console.log(str)
  if (!str) return ''
  const str1 = str.substr(0, start)
  const str2 = str.substr(str.length - end)
  return (str = str1 + '…' + str2)
}

export function formatUnits(chainId: number | undefined, value: string | number | undefined) {
  const chainInfo = getChainInfo(chainId)
  if (chainInfo && value !== undefined) {
    const num = ethers.utils.formatUnits(value.toString(), chainInfo?.nativeCurrency.decimals)
    const result = parseFloat(num)

    return result.toFixed(4) + ' ' + chainInfo?.nativeCurrency.symbol
  } else {
    return '...'
  }
}

export function formatUnitsErc20(value: string | number | undefined, symbol: string, decimals: number) {
  if (value !== undefined && decimals) {
    const num = ethers.utils.formatUnits(value.toString(), decimals)
    const result = parseFloat(num)

    return result.toFixed(4) + ' ' + symbol
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

export function nowThreshold(str: string, Signed: number, issignHIstory: boolean) {
  if (issignHIstory) {
    return str
  }
  const list = str.split('/')
  return Signed + '/' + list[1]
}

export function gasFee(gas: number | string, gasPrise: number | string): string {
  const gasBN = BigNumber.from(gas.toString())
  const gasPriseBN = BigNumber.from(gasPrise.toString())
  return gasBN.mul(gasPriseBN).toString()
}

export function serverStatusIsSuccess(res: { Status: string }) {
  if (res !== undefined && res.Status.toLowerCase() == 'success') {
    return true
  } else {
    return false
  }
}

export type metamaskError = {
  reason: string
  message: string
}

export function calculateGasMargin(value: BigNumber): BigNumber {
  return value.mul(120).div(100)
}
