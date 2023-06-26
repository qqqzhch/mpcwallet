import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { BigNumber, Contract, ethers } from 'ethers'
import { useAppStore } from '../state';
import useRelayerAddress from './useRelayer'
import UsdcRelayerABI from '../constants/ABI/UsdcRelayer.json'
import { Circle_Chainid } from '../constants/relayer';


export default function useRelayerFee() {
    const { library,chainId } = useWeb3React()
    const toChainID = useAppStore((state)=>state.toChainID)
    const contractAddress = useRelayerAddress();
    const setFee = useAppStore((state)=>state.setFee)
    const [balance, setBalance] = useState<string>()
  
    useEffect(() => {
      const run = async () => {
        console.log('useRelayerFee')
        if ( contractAddress && library != undefined&&toChainID!==null) {
          const CircleID = Circle_Chainid[toChainID]
          const contract = new Contract(contractAddress, UsdcRelayerABI, library)

          const result: BigNumber = await contract.feeByDestinationDomain(CircleID)
          if(result.eq(0)){
            setBalance(ethers.utils.parseEther('0.00011').toString())
            setFee(ethers.utils.parseEther('0.00011').toString())
          }else{
            
            setBalance(result.add(1).toString())
            setFee(result.add(1).toString())
          }
          
          
        }else{
          setBalance('0')
          setFee('0')
        }
      }
     
      
      
      run()
  
      
    }, [library, contractAddress,chainId,toChainID,setFee])
  
    return balance
  }