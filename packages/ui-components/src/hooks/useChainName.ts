import { useWeb3React } from '@web3-react/core'
import { useState, useEffect } from 'react'
import { getChainInfo } from '../constants/chainInfo'
import {CHAIN_IDS_TO_NAMES,getNameBychainId} from '../constants/chains'

export default function useChainName() {
  const { chainId } = useWeb3React()
  const [chianName, setchianName] = useState<string>('')
  useEffect(() => {
    // setUnsupported(false)
    setchianName(getNameBychainId(chainId))
  }, [chainId])
  return chianName
}
