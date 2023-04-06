import { useWeb3React } from '@web3-react/core'
import { useState, useEffect } from 'react'

import { getNameBychainId } from '../constants/chains'

export default function useChainName() {
  const { chainId } = useWeb3React()
  const [chianName, setchianName] = useState<string>('')
  useEffect(() => {
    if (chainId == undefined) {
      return
    }
    setchianName(getNameBychainId(chainId))
  }, [chainId])
  return chianName
}
