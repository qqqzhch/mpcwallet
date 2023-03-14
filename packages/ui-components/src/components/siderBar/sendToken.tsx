import { FC, useCallback, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Avvvatars from 'avvvatars-react'
import { When } from 'react-if'
import ethlogo from '../../assets/icon/ethereum-logo.png'
import ChainName from '../chainList/chainName'
import { useForm, SubmitHandler } from "react-hook-form";
import {ethers} from 'ethers'
import { useParams } from 'react-router-dom'
import {cutOut} from '../../utils/index'
import {TxInput,buidTransactionJson,Unsigedtx} from '../../utils/buildMpcTx'
import useChainName from '../../hooks/useChainName'

import {useGetTxMsgHash,useTransactionSigner} from '../../hooks/useSigns'
import { rpclist } from '../../constants/rpcConfig'
import { useWeb3React } from '@web3-react/core'
import useAccount from '../../hooks/useAccount'
import { useToasts } from 'react-toast-notifications'
import { formatUnits } from '../../utils'

import GasModel from '../transaction/gasmodel'




type Inputs = {
  toAddress: string,
  toAddressRequired: string,
  assert:string,
  assertRequired: string,
  amount:string,
  amountRequired: string,
};



const isAmount = (Amount: string) => {
  const result = parseFloat(Amount)
  if(isNaN(result)){
    return false
  }else {
    if(result>0) {
      return true
    }else{
     return false
    }
     
  }

};

const isAddress =(address: string)=>{
  const result =  ethers.utils.isAddress(address)
  if(result==false){
    const message="need right address";
    return message
  }
 }

const SendToken: FC<{ open?: boolean; callBack: () => void }> = ({ open, callBack }) => {
  const [isTokenOpen, setIsTokenOpen] = useState(open || false)
  const [isPreviewStep, setIsPreviewStep] = useState(false)
  const { address,chainType } = useParams<{ address: string; chainType: string }>()
  const [userTxInput, setUsertTxInput] = useState<TxInput>()
  const [unsigedtx, setUnsigedtx] = useState<Unsigedtx>()
  
  const chainName = useChainName();
  const {execute:getUnsigedTransactionHash} = useGetTxMsgHash(rpclist[0])
  const {execute:TransactionSigner}=useTransactionSigner(rpclist[0])
  const { chainId } = useWeb3React()
  const [msgHash,setMsgHash] =  useState<string>()
  const { addToast } = useToasts()
  const  [gas,setGas]= useState<{gasLimit?:string,gasPrise?:string}>()

  const [isOpen, setIsOpen] = useState(false);
  

  const wallet = useAccount(address)
  
  

  const { register, handleSubmit, watch,reset, formState: { errors } } = useForm<Inputs>();
  
  
  function closeTokenModal() {
    setIsTokenOpen(false)
    setIsPreviewStep(false)
    if (callBack) {
      callBack()
    }
    reset()
  }
  useEffect(() => {
    if (open != undefined) {
      setIsTokenOpen(open)
    }
  }, [open])

  // const onSubmit: SubmitHandler<Inputs> = data =>{
  //   setIsPreviewStep(true)
  // };
  const onSubmit: SubmitHandler<Inputs> = useCallback((data) => {
    console.log('onSubmit',data)
    setIsPreviewStep(true)
    if(address!=undefined&&chainType!==undefined&&chainId!==undefined){
      setUsertTxInput({
        from:address,
        to:data.toAddress,
        gas:0,
        gasPrice:0,
        originValue: data.amount,
        name:data.assert
      })
      
      

    }
    

  }, [setIsPreviewStep,address,chainType,chainId])

  useEffect(()=>{
    
    const run = async function(){
      if(userTxInput!==undefined&&chainType!==undefined&&chainId!==undefined){
        
        const dataUnsigedtx =  buidTransactionJson(chainType,chainId,userTxInput)
        setUnsigedtx(dataUnsigedtx)
         if(getUnsigedTransactionHash!=undefined){
          const data = await  getUnsigedTransactionHash(dataUnsigedtx,chainType)
          if(data.msg=="Success"){
            setMsgHash(data.info)
            
          }
   
         } 
       }

    }

    run();



  },[chainType,chainId,userTxInput,getUnsigedTransactionHash])


const sendSigner= useCallback(async()=>{
  if(wallet!=undefined&&chainType!=undefined&&msgHash!=undefined&&unsigedtx!=undefined&&TransactionSigner!=undefined){
   const data = await TransactionSigner(wallet,chainType,msgHash,unsigedtx)
   if(data.msg=="Success"){
    addToast("Transactions have been sent", { appearance: 'success' })

   }else{
    addToast(data.tip, { appearance: 'error' })
   }
   console.log(data)
   closeTokenModal()
  } 
 },[TransactionSigner,wallet,chainType,msgHash,unsigedtx,addToast,closeTokenModal])



  const previous = useCallback(() => {
    setIsPreviewStep(false)
  }, [setIsPreviewStep])

  function openGasModel(){
    setIsOpen(true)
  }
  function editGas ({gasLimit,gasPrise}:{
    gasLimit?:string,
    gasPrise?:string
}){
    console.log(gasLimit,gasPrise)
    setGas({gasLimit,gasPrise})
    setIsOpen(false)
    if(gasLimit!=undefined&&gasPrise!=undefined){
      setUsertTxInput((prevState: TxInput | undefined)=>{
        return {
          ...(prevState||{}),
          gas:parseInt(gasLimit),
          gasPrice:parseInt(gasPrise),
        } as TxInput
  
      })

    }
    
    
    
  }



  return (
    <>
      <Transition appear show={isTokenOpen} as={Fragment}>
        <Dialog as="div" className="relative   z-40" onClose={closeTokenModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div>
                  <When condition={isPreviewStep == false}>
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 flex  flex-row justify-between">
                        <span className=" flex-1 ">Send Tokens</span>{' '}
                        <div className=" w-28 mx-2">
                          <ChainName></ChainName>
                        </div>
                      </Dialog.Title>
                      <div className="mt-4 flex flex-col  gap-1  w-96 ">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-6">
                          <label htmlFor="sendingfrom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Sending from{' '}
                          </label>
                          <div className="flex flex-row   items-center ">
                            <Avvvatars value={address?address:""} style="shape" size={40} />
                            <div className="break-all pl-2">{address?cutOut(address,12,12):""}</div>
                          </div>
                        </div>
                        <div className="mb-6">
                          <label htmlFor="assert" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Assert{' '}
                          </label>
                          <select
                            id="assert"
                            {...register("assert",{ required: true })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            <option value="eth">eth</option>
                            <option value="bnb">bnb</option>
                            <option value="btc">btc</option>
                          </select>
                        </div>
                        {errors.toAddressRequired && <span>This field is required</span>}
                        <div className="mb-6">
                          <label htmlFor="recipientAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Recipient address{' '}
                          </label>
                          <input
                          {...register("toAddress",{ required: true ,validate:isAddress})}
                            type="text"
                            id="recipientAddress"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                          {errors.toAddress && <div className=" text-red-400 ">{errors.toAddress.message}</div>}
                        </div>
                        <div className="mb-6">
                          <div className="flex flex-row justify-between">
                            <label htmlFor="Amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Amount{' '}
                            </label>
                            <label htmlFor="Amount" className="block mb-2 text-sm font-medium text-gray-600 dark:text-white">
                              Balance:111eth{' '}
                            </label>
                          </div>

                          <input
                            type="text"
                            id="Amount"
                            {...register("amount",{ required: true,validate:isAmount })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                        </div>
                        {errors.toAddressRequired && <span>This field is required</span>}
                        <div className="mb-6 flex flex-col sm:flex-row justify-between gap-8">
                          <button className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            Previous
                          </button>
                          <button
                            type="submit"
                            // onClick={next}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 "
                          >
                            next
                          </button>
                          
                        </div>
                        </form>
                      </div>
                    </Dialog.Panel>
                  </When>
                  <When condition={isPreviewStep === true}>
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 flex  flex-row justify-between">
                        <span className=" flex-1 ">Send Preview</span>{' '}
                        <div className=" w-28 mx-2">
                          <ChainName></ChainName>
                        </div>
                      </Dialog.Title>
                      <div className="mt-4 flex flex-col  gap-1    w-96 ">
                        <div className="mb-6 flex flex-row gap-2  items-center  justify-between text-center">
                          <div>
                            <label htmlFor="sendingfrom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Sending from
                            </label>
                            <div className="flex flex-row  items-center">
                              <Avvvatars value={address?address:""} style="shape" size={40} />
                              <div className="break-all pl-2">{address?cutOut(address,6,6):""}</div>
                            </div>
                          </div>
                          <div>
                            <label htmlFor="sendingfrom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Recipient
                            </label>
                            <div className="flex flex-row items-center">
                              <Avvvatars value={userTxInput?.to?userTxInput?.to:""} style="shape" size={40} />
                              <div className="break-all pl-2">{userTxInput?.to?cutOut(userTxInput?.to,6,6):""}</div>
                            </div>
                          </div>
                        </div>
                        <div className="mb-6">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Assert </label>
                          <div className=" flex flex-row items-center gap-1">
                            <img width={32} src={ethlogo}></img>
                            <span>{userTxInput?.originValue} eth</span>
                          </div>
                        </div>
                        <div className="mb-6">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estimated fee </label>
                          <div className=" flex flex-row ">
                           <span className=" flex-1 "> {formatUnits(chainId, '100000000000')} </span> 
                           <span onClick={openGasModel} className=" underline "> edit </span>
                            </div>
                        </div>
                        <div className="mb-6">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Transaction validity </label>
                          <div>Simulate</div>
                        </div>

                        <div className="mb-6 flex flex-col sm:flex-row justify-between gap-8">
                          <button
                            onClick={previous}
                            className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                          >
                            Previous
                          </button>
                          <button
                            type="button"
                            onClick={sendSigner}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 "
                          >
                            next
                          </button>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </When>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <GasModel isOpen={isOpen} closeModal={editGas} ></GasModel>
    </>
  )
}

export default SendToken
