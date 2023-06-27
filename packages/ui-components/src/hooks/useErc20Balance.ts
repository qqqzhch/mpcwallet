import { useWeb3React } from '@web3-react/core'
import { useCallback, useEffect, useState } from 'react'
import { BigNumber, Contract } from 'ethers'
import { useAppStore } from '../state';

import erc20ABI from './../constants/ABI/ERC20.json'

export default function useErc20Balance(mpcAddress: string | undefined|null, contractAddress: string | undefined) {
    const { library,chainId } = useWeb3React()
    const fromChainID = useAppStore((state)=>state.fromChainID)
    //   const mpcinfo = useAppStore(state => state.getWalletAccount(account, mpcAddress))
  
    const [balance, setBalance] = useState<string>()
    const run = useCallback(async ()=>{
      console.log('useErc20Balance')
      if (mpcAddress && contractAddress && library != undefined&&chainId==fromChainID) {
        const contract = new Contract(contractAddress, erc20ABI, library)
        const result: BigNumber = await contract.balanceOf(mpcAddress)
        setBalance(result.toString())
        
      }else{
        setBalance('0')
        
      }
    },[mpcAddress, library, contractAddress,chainId,fromChainID])

    useEffect(() => {
      
      if(library){
        library.on('block', () => {
          console.log('block run 1')
          run()
        })
      }
      
      
      run()
  
      return () => {
        if (library) {
          library.off('block',run)
        }
      }
    }, [library,run])
  
    return {
      balance
    }
  }