import { useAppStore } from '../state/index'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { BigNumber } from 'ethers'
import useChainInfo from './useChainInfo'

type Currency={ 
 name: string,
 symbol: string, 
 decimals: number
}

export default function useNativeBalance(mpcAddress: string | undefined) {
  const { library,account,chainId } = useWeb3React()
//   const mpcinfo = useAppStore(state => state.getWalletAccount(account, mpcAddress))
  const ChainInfo = useChainInfo();
  const [balance,setBalance]= useState<string>()
  const [nativeCurrency ,setNativeCurrency]= useState<Currency>()
  
  useEffect(()=>{
      const run =async () => {
          if(mpcAddress&&ChainInfo?.nativeCurrency){
            const result:BigNumber = await library.getBalance(mpcAddress)
            setBalance(result.toString())
            setNativeCurrency(ChainInfo?.nativeCurrency)
            console.log(result)
          }
        
      }
      run();

  },[mpcAddress,library,ChainInfo])

  return {
    balance,
    nativeCurrency
  }
}