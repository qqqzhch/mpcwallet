import { useWeb3React } from '@web3-react/core'
import { getChainInfo } from '../constants/chainInfo'

export default function useChainInfo() {
  const { chainId } = useWeb3React()

  const ChainInfo = getChainInfo(chainId)
  return ChainInfo
}
