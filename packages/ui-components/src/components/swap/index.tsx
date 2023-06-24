import React,{useCallback, useState} from 'react'
import SelectChainModal from '../selectChainModal'
import { ArrowDownIcon } from '@heroicons/react/24/solid'
import { useAppStore } from '../../state'
import useUSDCAddress from '../../hooks/useUsdc'
import useErc20Balance from '../../hooks/useErc20Balance'
import { useWeb3React } from '@web3-react/core'
import { formatUnitsErc20, validateAmount } from '../../utils'
import useErcCheckAllowance from '../../hooks/useCheckAllowance'
import { BigNumber } from 'ethers'
import { Else, If, Then } from 'react-if'
import useErc20Approve from '../../hooks/useApprove'






const Swap = () => {
  const [isFromOpen, setIsFromOpen] = useState(false)
  const [isToOpen, setIsToOpen] = useState(false)
  const { account } = useWeb3React()
  const [inputAmount,setInputAmount]=useState("0")

  const fromChainInfo= useAppStore((state)=>state.fromChain) 
  const toChainInfo = useAppStore((state)=>state.toChain)
  const USDCAddress = useUSDCAddress()
  const usdcBalance=  useErc20Balance(account,USDCAddress)
  const num =parseFloat(inputAmount)*1000000;
  const ApproveUSDT = useErc20Approve()
  console.log('ApproveUSDT.state.loading',ApproveUSDT.state.loading)
  const {allowance}= useErcCheckAllowance(BigNumber.from(num.toString()))
  

  const inputAmountChange= useCallback((e)=>{
    const value = e.currentTarget.value
    
    if(validateAmount(value)==undefined){
      setInputAmount(value)
    }
  },[])

  

  return (
    <div className=" text-left">
      <div>
        <div onClick={()=>{setIsFromOpen(true)}} className=" inline-flex  items-center  z-0 w-full   mb-6 group  pb-1  cursor-pointer ">
        <span className='peer-focus:font-medium  text-lg text-gray-500    min-w-[40%]' >from {fromChainInfo?.label}  </span>  
       
          <ArrowDownIcon  className="h-4 w-4 text-blue-500  "></ArrowDownIcon>
          
        </div>
        <div className="relative z-0 w-full mb-6 group  flex flex-row">
          <div className=' flex-1'>
          <input
            type="text"
            name="input"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={(e)=>{inputAmountChange(e)}}
          />
          </div>
          <div className='flex  flex-col  text-gray-500 '>
            <div>Balance</div>
            <div>{formatUnitsErc20(usdcBalance.balance,'usdc',6)} </div>

          </div>
          
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            input
          </label>
        </div>
        <div onClick={()=>{setIsToOpen(true)}} className=" inline-flex  items-center  z-0 w-full   mb-6 group  pb-1  cursor-pointer">
        <span className='peer-focus:font-medium  text-lg text-gray-500    min-w-[40%]' >to {toChainInfo?.label}  </span>  
       
          <ArrowDownIcon  className="h-4 w-4 text-blue-500  "></ArrowDownIcon>
          
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="output"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            output
          </label>
        </div>
        <div className=' flex'>
        <If condition={allowance}>
         <Then>
          
          <button
         onClick={ApproveUSDT.doFetch}
          className="text-white flex-1  bg-red-400 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
         { ApproveUSDT.state.loading?"Approve loading":"Approve"}  
        </button>

          
        

         </Then>
         <Else>
         <button
          
          className="text-white flex-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Swap
        </button>

         </Else>
        </If>
        </div>
      </div>
        <SelectChainModal isOpen={ isFromOpen} closeModal={()=>{setIsFromOpen (false)}}  dataType={true}   ></SelectChainModal>
        <SelectChainModal isOpen={ isToOpen} closeModal={()=>{setIsToOpen(false)}} dataType={false} ></SelectChainModal>
    </div>
  )
}

export default Swap
