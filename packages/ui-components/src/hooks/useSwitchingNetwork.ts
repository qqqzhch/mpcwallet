import { useWeb3React } from '@web3-react/core'


import {RPC_URLS} from '../constants/networks'
import switchEthereumChain from '../metamask/switchEthereumChain'
import {useAsyncFn} from 'react-use';
import { useAppStore } from '../state'

export default function useSwitchingNetwork(){
    const { library } = useWeb3React()
    const network= useAppStore((state)=>state.fromChain) 
    const chainId = useAppStore((state)=>state.fromChainID)

    const [state,doSwitch] = useAsyncFn(async()=>{
        const unsupported =false;
        if(network&&library&&chainId!==null){
            await switchEthereumChain(chainId,network.label,RPC_URLS[chainId],library,unsupported)
        }
        
    },[library,network])
    return {
        state,
        doSwitch
    }

}