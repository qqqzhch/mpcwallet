import { useEffect, useState } from 'react'
import ERC20 from '../constants/ABI/ERC20.json'
import { RPC_URLS } from '../constants/networks'
import { SupportedChainId } from '../constants/chains'
import { ethers, BigNumber } from 'ethers'
import { Unsigedtx } from '../utils/buildMpcTx'
import useSWR from 'swr'

async function fetcher(
  txchainId: string | undefined,
  data: string | undefined,
  contractAddress: string | undefined
): Promise<Array<string | number> | undefined> {
  if (txchainId == undefined || data == undefined || contractAddress == undefined) {
    return
  }
  if (data == '0x' || data == '0x0') {
    return
  }

  const chainId = BigNumber.from(txchainId).toString()
  const rpcurl = RPC_URLS[chainId as unknown as SupportedChainId]
  const txprovider = new ethers.providers.JsonRpcProvider(rpcurl[0])
  const erc20Contract = new ethers.Contract(contractAddress, ERC20, txprovider)
  const result = await Promise.all([erc20Contract.symbol(), erc20Contract.decimals()])

  return result
}

export default function useContractInfo(pra: Unsigedtx | undefined) {
  const [contractInfo, setContractInfo] = useState<Array<string | number>>()
  const { data } = useSWR(pra ? ['/smw/useContractInfo', pra?.chainId, pra?.to] : null, () => fetcher(pra?.chainId, pra?.data, pra?.to))
  useEffect(() => {
    setContractInfo(data)
  }, [data])

  return contractInfo
}
