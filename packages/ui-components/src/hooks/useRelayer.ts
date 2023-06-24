import { useWeb3React } from '@web3-react/core'
import { Relayer_IDS_TO_ADDR } from '../constants/relayer'
import { SupportedChainId } from '../constants/chains'


export default function useRelayerAddress():string|undefined{
    const { chainId } = useWeb3React()
    if(chainId==undefined){
        return 
    }
    return  Relayer_IDS_TO_ADDR[chainId as SupportedChainId]
}