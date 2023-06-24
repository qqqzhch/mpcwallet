import { useWeb3React } from '@web3-react/core'
import { USDC_IDS_TO_ADDR } from '../constants/usdc'
import { SupportedChainId } from '../constants/chains'


export default function useUSDCAddress():string|undefined{
    const { chainId } = useWeb3React()
    if(chainId==undefined){
        return 
    }
    return  USDC_IDS_TO_ADDR[chainId as SupportedChainId]
}