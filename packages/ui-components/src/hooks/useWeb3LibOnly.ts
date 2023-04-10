import { providers } from 'ethers'

import { SupportedChainId } from '../constants/chains'
import { RPC_URLS } from '../constants/networks'
import { useWeb3React } from '@web3-react/core'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Fallbackprovider from '../utils/fallback-provider'

export function useWeb3LibOnly(): providers.FallbackProvider | undefined {
  const { chainId } = useWeb3React()
  const { address } = useParams<{ address: string; chainType: string }>()
  const [Provider, setProvider] = useState<providers.FallbackProvider>()

  useEffect(() => {
    if (chainId == undefined || address == undefined) {
      return
    }
    const providerlist: Array<providers.JsonRpcProvider> = []

    RPC_URLS[chainId as SupportedChainId].forEach(item => {
      providerlist.push(new providers.JsonRpcProvider(item))
    })
    const fallbackProvider = new Fallbackprovider(providerlist, 1)

    setProvider(fallbackProvider)
  }, [chainId, address])

  return Provider
}
