import { useWeb3React } from '@web3-react/core'
import { useCallback, useEffect, useState } from 'react'
import { BigNumber, Contract } from 'ethers'


import erc20ABI from './../constants/ABI/ERC20.json'
import useRelayerAddress from './useRelayer'
import useUSDCAddress from './useUsdc'


export default function useErcCheckAllowance(inputAmount:string) {
    const { library,account } = useWeb3React()
    const checkAddress = useRelayerAddress();
    const contractAddress =useUSDCAddress()
    const [allowance, setAllowance] = useState<boolean>(false)
    const run = useCallback(async()=>{
      console.log('--useCheckAllowance')
      if (account && contractAddress && library != undefined) {
        const contract = new Contract(contractAddress, erc20ABI, library)
      //   const result: BigNumber = await contract.balanceOf(mpcAddress)
        const allowance: BigNumber = await contract.allowance(account,checkAddress)
        if(allowance.gte(BigNumber.from(inputAmount))){
          setAllowance(false )
        }else{
          setAllowance(true)
        }
        
        
      }
    },[account, library, contractAddress,inputAmount,checkAddress])
  
    useEffect(() => { 
      if(library){
        library.on('block', () => {
          console.log('block run 2')
          run()
        })
      }
      
      run()
  
      return () => {
        if (library) {
          library.off('block',run)
        }
      }
    }, [library, run])
  
    return {
        allowance
    }
  }