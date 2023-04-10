import { useEffect, useState } from 'react'
import ERC20 from '../constants/ABI/ERC20.json'
import { ethers } from 'ethers'
import { Unsigedtx } from '../utils/buildMpcTx'
import useSWR from 'swr'
import { useWeb3LibOnly } from './useWeb3LibOnly'

async function fetcher(
  txchainId: string | undefined,
  data: string | undefined,
  contractAddress: string | undefined,
  weblib: ethers.providers.FallbackProvider | undefined
): Promise<Array<string | number> | undefined> {
  if (txchainId == undefined || data == undefined || contractAddress == undefined || weblib == undefined) {
    return
  }
  if (data == '0x' || data == '0x0') {
    return
  }

  const erc20Contract = new ethers.Contract(contractAddress, ERC20, weblib)
  const result = await Promise.all([erc20Contract.symbol(), erc20Contract.decimals()])

  return result
}

export default function useContractInfo(pra: Unsigedtx | undefined) {
  const [contractInfo, setContractInfo] = useState<Array<string | number>>()
  const web3LibOnly = useWeb3LibOnly()
  const { data } = useSWR(pra ? ['/smw/useContractInfo', pra?.chainId, pra?.to, web3LibOnly] : null, () =>
    fetcher(pra?.chainId, pra?.data, pra?.to, web3LibOnly)
  )
  useEffect(() => {
    setContractInfo(data)
  }, [data])

  return contractInfo
}
