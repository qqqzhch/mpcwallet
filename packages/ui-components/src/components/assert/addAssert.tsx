import { FC,useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useForm } from "react-hook-form";
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers';
import erc20ABI from '../../constants/ABI/ERC20.json'




type Props = {
  isOpen: boolean
  closeModal: () => void
  openModal: () => void
}

const AddAssert: FC<Props> = ({ isOpen, closeModal, openModal }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { account,library } = useWeb3React()

  //@ts-ignore
  const onSubmit = data => {};
  

  
 const contractAddress:string = watch("Contract");
 useEffect(()=>{
   
   const run = async()=>{
     if(contractAddress==undefined){
       return ;
     }
    const addr =contractAddress.trim();
    const  isAddress = ethers.utils.isAddress(addr)
    if(isAddress){
     const Contract =new ethers.Contract(addr,erc20ABI,library)
     const name= await Contract.name()
     const symbol= await Contract.symbol()
     const decimals= await Contract.decimals()
     
    }

   }
   run();
   

 },[contractAddress,library])

  
  

  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Adding assets
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-6">
                        <label htmlFor="Contract" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Contract Address
                        </label>
                        <input
                          type="text"
                          id="Contract"
                          {...register("Contract",{ required: true })} 
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          
                        ></input>
                      </div>
                      <div className="mb-6">
                        <label htmlFor="Symbol" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Symbol
                        </label>
                        <input
                          type="text"
                          id="Symbol"
                          {...register("Symbol",{ required: true })} 
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          
                        ></input>
                      </div>
                      <div className="mb-6">
                        <label htmlFor="Decimal" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Decimal
                        </label>
                        <input
                          type="text"
                          id="Decimal"
                          {...register("Decimal",{ required: true })} 
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          
                        ></input>
                      </div>
                      <div className="mb-6">
                        <label htmlFor="Name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Name
                        </label>
                        <input
                          type="text"
                          id="Name"
                          {...register("Name",{ required: true })} 
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          
                        ></input>
                      </div>
                      <div className="mt-4 flex flex-col sm:flex-row-reverse justify-around">
                        <button
                          type="submit"
                          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                          
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                          
                        >
                          Reset
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default AddAssert
