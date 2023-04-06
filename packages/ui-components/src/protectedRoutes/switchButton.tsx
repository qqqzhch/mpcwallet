import { useWeb3React } from '@web3-react/core'

import { useCallback, useState, useEffect } from 'react'
import { appSupportedChainId, SupportedChainId } from '../constants/chains'
import { L1ChainInfo, L2ChainInfo } from '../constants/chainInfo'
import { getChainInfo } from '../constants/chainInfo'
import switchEthereumChain from '../metamask/switchEthereumChain'
import { RPC_URLS } from '../constants/networks'

export const SwitchButton = ({ children, className }: { children: JSX.Element; className?: string }) => {
  const { chainId, library } = useWeb3React()
  const [isSupported, setIsSupported] = useState<boolean>(false)
  const [nextChain, setNextChain] = useState<L1ChainInfo | L2ChainInfo>()

  useEffect(() => {
    if (appSupportedChainId && chainId) {
      const isSupported = appSupportedChainId.includes(chainId as SupportedChainId)
      setIsSupported(isSupported)
      const nextChainInfo = getChainInfo(appSupportedChainId[0])
      setNextChain(nextChainInfo)
    }
  }, [chainId])

  const SwitchingNetwork = useCallback(async () => {
    if (nextChain && chainId !== undefined) {
      await switchEthereumChain(
        appSupportedChainId[0],
        nextChain?.label,
        RPC_URLS[chainId as SupportedChainId],
        library,
        false,
        nextChain.nativeCurrency,
        nextChain.explorer
      )
    }
  }, [library, nextChain, chainId])

  if (isSupported == false) {
    return (
      <button
        onClick={SwitchingNetwork}
        className={className ? className : 'bg-sky-500 hover:bg-sky-700 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white'}
      >
        Switch to {nextChain?.label} Chain
      </button>
    )
  }

  return children
}
