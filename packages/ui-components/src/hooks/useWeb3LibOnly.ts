import { ethers, providers } from 'ethers'
import { SupportedChainId } from '../constants/chains'
import { RPC_URLS } from '../constants/networks'
import { useWeb3React } from '@web3-react/core'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export function useWeb3LibOnly(): ethers.providers.JsonRpcProvider | undefined {
  const { chainId } = useWeb3React()
  const { address } = useParams<{ address: string; chainType: string }>()
  const [Provider, setProvider] = useState<ethers.providers.JsonRpcProvider>()

  useEffect(() => {
    if (chainId == undefined || address == undefined) {
      return
    }
    const provider = new providers.JsonRpcProvider(RPC_URLS[chainId as SupportedChainId][0])

    setProvider(provider)
  }, [chainId, address])

  return Provider
}
