import { useWeb3React } from '@web3-react/core'
import { useState, useEffect } from 'react'
import { getChainInfo } from '../constants/chainInfo'

export default function useChainName() {
  const { chainId } = useWeb3React()
  const [chianName, setchianName] = useState<string>('')
  useEffect(() => {
    // setUnsupported(false)
    if (chainId != null) {
      const ChainInfo = getChainInfo(chainId)
      if (ChainInfo?.label) {
        setchianName(ChainInfo?.label)
      }
    } else {
      const ChainInfo = getChainInfo(1)
      if (ChainInfo?.label) {
        setchianName(ChainInfo?.label)
      }
    }
  }, [chainId])
  return chianName
}
