import { FC, useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import ChainName from '../chainList/chainName'
import Avvvatars from 'avvvatars-react'

import { useParams } from 'react-router-dom'
import { cutOut } from '../../utils/index'
import { assertType, Unsigedtx, TxInput } from '../../utils/buildMpcTx'
import { formatUnits, gasFee } from '../../utils'
import { useWeb3React } from '@web3-react/core'

import Skeleton from 'react-loading-skeleton'
import { If, Then, Else, When } from 'react-if'
import loadingiImg from '../../assets/loading.svg'
import { ProtectedButton } from '../../protectedRoutes/protectedButton'
import { SwitchButton } from '../../protectedRoutes/switchButton'

type Props = {
  userTxInput: Unsigedtx | undefined
  openGasModel: () => void
  previous: () => void
  next: () => void
  assert?: assertType | undefined
  btnLoading: boolean
  isTxBuild?: boolean
  userTxInputShow?: TxInput | undefined
}

const Preview: FC<Props> = ({ userTxInput, openGasModel, previous, next, assert, btnLoading, isTxBuild = false, userTxInputShow }) => {
  const { address } = useParams<{ address: string; chainType: string }>()
  const { chainId, library } = useWeb3React()
  const [gasError, setGasError] = useState<string | undefined>()

  useEffect(() => {
    const run = async () => {
      if (userTxInput != undefined) {
        const txforestimateGas = {
          from: userTxInput?.from,
          to: userTxInput?.to,
          data: assert?.contractaddress ? userTxInput.data : '',
          value: userTxInput.value
        }

        try {
          await library.estimateGas(txforestimateGas)

          setGasError(undefined)
        } catch (error: unknown) {
          const errorinfo = error as { reason: string; message: string }
          setGasError(errorinfo.reason || errorinfo.message)
          return
        }
      }
    }
    run()
  }, [library, userTxInput, assert])

  return (
    <>
      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 flex  flex-row justify-between">
          <span className=" flex-1 ">Send Preview</span>{' '}
          <div className=" w-28 mx-2">
            <ChainName></ChainName>
          </div>
        </Dialog.Title>
        <div className="mt-4 flex flex-col   space-y-1    w-80 sm:w-96 ">
          <div className="mb-6 flex flex-row  space-x-2  items-center  justify-between text-center">
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
              <If condition={userTxInputShow?.to}>
                <Then>
                  <label htmlFor="Recipient" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Recipient
                  </label>
                  <div className="flex flex-row items-center">
                    <Avvvatars value={userTxInputShow?.to ? userTxInputShow?.to : ''} style="shape" size={40} />
                    <div className="break-all pl-2">{userTxInputShow?.to ? cutOut(userTxInputShow?.to, 6, 6) : ''}</div>
                  </div>
                </Then>
                <Else>
                  <label htmlFor="Recipient" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Contract interaction
                  </label>
                  <div className="flex flex-row items-center">
                    <Avvvatars value={userTxInput?.to ? userTxInput?.to : ''} style="shape" size={40} />
                    <div className="break-all pl-2">{userTxInput?.to ? cutOut(userTxInput?.to, 6, 6) : ''}</div>
                  </div>
                </Else>
              </If>
            </div>
          </div>
          <When condition={isTxBuild == false}>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Asset </label>
              <div className=" flex flex-row items-center space-x-1">
                {/* <img width={20} src={assert?.img}></img> */}
                <span>
                  {userTxInput && assert ? userTxInput?.originValue : ''} {assert?.name}
                </span>
              </div>
            </div>
          </When>

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

          <div className="mb-6 flex flex-col sm:flex-row justify-between space-y-reverse   space-y-8    pt-8">
            <div className=" text-center">
              <button
                onClick={previous}
                className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Previous
              </button>
            </div>
            <div className=" text-center">
              <ProtectedButton>
                <SwitchButton className="text-white  bg-black  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full">
                  <button
                    type="button"
                    onClick={next}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 "
                  >
                    <If condition={btnLoading}>
                      <Then>
                        <img className="inline w-4 h-4 mr-3 text-white animate-spin" src={loadingiImg}></img>
                        Signing
                      </Then>
                      <Else>Next</Else>
                    </If>
                  </button>
                </SwitchButton>
              </ProtectedButton>
            </div>
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
