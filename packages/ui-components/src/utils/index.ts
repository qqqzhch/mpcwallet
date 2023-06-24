import { ethers, BigNumber } from 'ethers'
import numbro from 'numbro'

function numFormat(value: string | number, mantissa?: number) {
    const string = numbro(value).format({ thousandSeparated: true, mantissa: mantissa || 6, trimMantissa: true })
    return string
  }
  
  export function cutOut(str: string, start: number, end: number) {
    // console.log(str)
    if (!str) return ''
    const str1 = str.substr(0, start)
    const str2 = str.substr(str.length - end)
    return (str = str1 + '…' + str2)
  }

  export function formatUnitsErc20(value: string | number | undefined, symbol: string, decimals: number) {
    if (value !== undefined && decimals) {
      const num = ethers.utils.formatUnits(value.toString(), decimals)
      const result = parseFloat(num)
      if (result < 0.000001 && result > 0) {
        return '<0.000001' + ' ' + symbol.toUpperCase()
      }
      return numFormat(num) + ' ' + symbol.toUpperCase()
    } else {
      return '...'
    }
  }

  export const validateAmount = (amount?: string) => {
    if (!amount || isNaN(Number(amount))) {
      return 'The value must be a number'
    }
    const isnum = /^(?!0\d)\d+(\.\d+)?$/.test(amount)
    if (isnum == false) {
      return 'The value must be a number'
    }
  
    if (parseFloat(amount) <= 0) {
      return 'The value must be greater than 0'
    }
  }
  