import { providers } from 'ethers'

import { SupportedChainId } from '../constants/chains'
import { RPC_URLS } from '../constants/networks'
import { useWeb3React } from '@web3-react/core'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FallbackProviderConfig } from '@ethersproject/providers/lib/fallback-provider'

export function useWeb3LibOnly(): providers.FallbackProvider | undefined {
  const { chainId } = useWeb3React()
  const { address } = useParams<{ address: string; chainType: string }>()
  const [Provider, setProvider] = useState<providers.FallbackProvider>()

  useEffect(() => {
    if (chainId == undefined || address == undefined) {
      return
    }
    const providerlist: Array<FallbackProviderConfig> = []

    RPC_URLS[chainId as SupportedChainId].forEach(item => {
      providerlist.push({
        provider: new providers.JsonRpcProvider(item),
        stallTimeout: 1000 * 5
      } as FallbackProviderConfig)
    })
    const fallbackProvider = new providers.FallbackProvider(providerlist, 2)

    setProvider(fallbackProvider)
  }, [chainId, address])

  return Provider
}
