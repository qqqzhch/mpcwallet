import { useAppStore } from '../state/index'
import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { BigNumber,Contract } from 'ethers'
import useChainInfo from './useChainInfo'
import erc20ABI from './../constants/ABI/ERC20.json'
import useNativeBalance from './useNativeBalance'


type Currency={ 
 name: string,
 symbol: string, 
 decimals: number
}

export default function useErc20Balance(mpcAddress: string | undefined,contractAddress:string|undefined) {
  const { library,account,chainId } = useWeb3React()
//   const mpcinfo = useAppStore(state => state.getWalletAccount(account, mpcAddress))
  const ChainInfo = useChainInfo();
  const [balance,setBalance]= useState<string>()
  
  useEffect(()=>{
      const run =async () => {
          if(mpcAddress&&contractAddress){
            const contract=new Contract(contractAddress,erc20ABI,library)
            const result:BigNumber = await contract.balanceOf(mpcAddress)
            setBalance(result.toString())
            console.log(result)
          }
        
      }
      run();

  },[mpcAddress,library,contractAddress])

  return {
    balance
  }
}