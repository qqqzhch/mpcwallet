import { FC, useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import ChainName from '../chainList/chainName'
import Avvvatars from 'avvvatars-react'

import { useParams } from 'react-router-dom'
import { cutOut } from '../../utils/index'
import { assertType, Unsigedtx } from '../../utils/buildMpcTx'
import { formatUnits, gasFee } from '../../utils'
import { useWeb3React } from '@web3-react/core'

import Skeleton from 'react-loading-skeleton'
import { If, Then, Else } from 'react-if'
//Skeleton

type Props = {
  userTxInput: Unsigedtx | undefined
  openGasModel: () => void
  previous: () => void
  next: () => void
  assert?: assertType | undefined
}

const Preview: FC<Props> = ({ userTxInput, openGasModel, previous, next, assert }) => {
  const { address } = useParams<{ address: string; chainType: string }>()
  const { chainId, library } = useWeb3React()
  const [gasError, setGasError] = useState<string>()

  useEffect(() => {
    const run = async () => {
      if (userTxInput != undefined) {
        const txforestimateGas = {
          from: userTxInput?.from,
          to: userTxInput?.to,
          data: userTxInput.assert?.contractaddress ? userTxInput.data : '',
          value: userTxInput.assert?.contractaddress ? '0x' : userTxInput.value
        }

        try {
          await library.estimateGas(txforestimateGas)
          setGasError('')
        } catch (error: unknown) {
          const errorinfo = error as { reason: string }
          setGasError(errorinfo.reason)
          return
        }
      }
    }
    run()
  }, [library, userTxInput])

  return (
    <>
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
                <Avvvatars value={address ? address : ''} style="shape" size={40} />
                <div className="break-all pl-2">{address ? cutOut(address, 6, 6) : ''}</div>
              </div>
            </div>
            <div>
              <label htmlFor="sendingfrom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Recipient
              </label>
              <div className="flex flex-row items-center">
                <Avvvatars value={userTxInput?.to ? userTxInput?.to : ''} style="shape" size={40} />
                <div className="break-all pl-2">{userTxInput?.to ? cutOut(userTxInput?.to, 6, 6) : ''}</div>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Assert </label>
            <div className=" flex flex-row items-center gap-1">
              <img width={20} src={assert?.img}></img>
              <span>
                {userTxInput && assert ? userTxInput?.originValue : ''} {assert?.name}
              </span>
            </div>
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estimated fee </label>
            <div className=" flex flex-row ">
              <If condition={gasError === undefined}>
                <Then>
                  <If condition={userTxInput == undefined || userTxInput.gas == 0 || userTxInput.gasPrice == 0}>
                    <Then>
                      <div className=" flex-1 ">
                        <Skeleton count={1}></Skeleton>
                      </div>
                    </Then>
                    <Else>
                      <span className=" flex-1 "> {userTxInput ? formatUnits(chainId, gasFee(userTxInput?.gas, userTxInput?.gasPrice)) : ''} </span>
                      <span onClick={openGasModel} className=" underline ">
                        {' '}
                        edit{' '}
                      </span>
                    </Else>
                  </If>
                </Then>
                <Else>
                  <div className="text-red-400">{gasError}</div>
                </Else>
              </If>
            </div>
          </div>
          {/* <div className="mb-6">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Transaction validity </label>
                          <div>Simulate</div>
                        </div> */}

          <div className="mb-6 flex flex-col sm:flex-row justify-between gap-8">
            <button
              onClick={previous}
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={next}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 "
            >
              next
            </button>
          </div>
          <p className=" font-light text-xs text-gray-400">
            You&apos;re about to create and execute a transaction and will need to Sign it with your currently connected wallet.
          </p>
        </div>
      </Dialog.Panel>
    </>
  )
}

export default Preview
