import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState,FC,useCallback, useEffect } from 'react'
import { ProposedTransaction } from '../../hooks/useServices/models'
import Preview from '../transaction/preview'
import { TxInput, assertType, buidTransactionJson, Unsigedtx,buidTransactionForTxbuild } from '../../utils/buildMpcTx'
import { useParams } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import useChainInfo from '../../hooks/useChainInfo'

type Props={
    isOpen:boolean
    closeModal:()=>void,
    transaction:ProposedTransaction|undefined
}

const ContractModel:FC<Props> = ({isOpen,closeModal,transaction}) => {
  const [userTxInputReview, setUsertTxInputReview] = useState<Unsigedtx>()
  const { address, chainType } = useParams<{ address: string; chainType: string }>()
  const { chainId, library } = useWeb3React()
  const [assert, setAssert] = useState<assertType>()
  const  ChainInfo = useChainInfo()
  
  function openGasModel() {
    // setIsOpen(true)
  }
  console.log('- -')
  useEffect(()=>{
    console.log('transactions 2',transaction)
    if(transaction!=undefined){
      const item:ProposedTransaction =transaction;
     if(chainType!=undefined&&chainId!=undefined){
       const txinfo:TxInput={
        from: item.raw.from,
        to: item.raw.to,
        gas: 0,
        gasPrice: 0,
        originValue:item.raw.value.toString(),
        name: ""
       }
      const haveNative =item.raw.haveNative
      const dataUnsigedtx = buidTransactionForTxbuild(chainType, chainId, txinfo,transaction.raw.data,haveNative)
      console.log('- -')
      if(haveNative&&ChainInfo&&ChainInfo.logoUrl){
        setAssert({
          name: ChainInfo.nativeCurrency.name,
          img: ChainInfo.logoUrl,
          balance: "",
          decimals: ChainInfo?.nativeCurrency.decimals
        })

      }
      
      setUsertTxInputReview(dataUnsigedtx)

     }
      

      

    }
    

  },[transaction,ChainInfo,chainId,chainType])

  const previous = useCallback(() => {
    
  }, [])

  const sendSigner = useCallback(() => {
    
  }, [])

  
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
                <div>
                  <Preview  userTxInput={userTxInputReview} openGasModel={openGasModel} previous={previous} next={sendSigner}
                  assert={assert}
                   ></Preview>
                </div>
              </Transition.Child>
            </div>
          </div>

        </Dialog>
      </Transition>
        </div>
    );
};

export default ContractModel;