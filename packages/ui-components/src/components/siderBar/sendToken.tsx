import { FC, useCallback, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Avvvatars from 'avvvatars-react'
import { Else, If, Then, When } from 'react-if'
import { Listbox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import ChainName from '../chainList/chainName'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { ethers } from 'ethers'
import { useParams } from 'react-router-dom'
import { cutOut, calculateGasMargin } from '../../utils/index'
import { TxInput, assertType, buidTransactionJson, Unsigedtx } from '../../utils/buildMpcTx'

import { useGetTxMsgHash, useTransactionSigner } from '../../hooks/useSigns'
import { rpclist } from '../../constants/rpcConfig'
import { useWeb3React } from '@web3-react/core'
import useAccount from '../../hooks/useAccount'
import { useToasts } from 'react-toast-notifications'

import GasModel from '../transaction/gasmodel'
import Preview from '../transaction/preview'
// import metamask from '../../assets/icon/metamask.svg'
import { formatUnitsErc20, formatUnits } from '../../utils/index'
import { BigNumber } from 'ethers'

import useAsserts from '../../hooks/useAssets'
import useNativeBalance from '../../hooks/useNativeBalance'
import useErc20Balance from '../../hooks/useErc20Balance'

import AddressName from '../walletList/addressName'

// const assertList: Array<assertType> = [
//   { name: 'eth', img: metamask, decimals: 18 },
//   { name: 'weth', img: metamask, contractaddress: '0xc253F9D86Cb529b91FEe2d952f65cd33Bd98617e', decimals: 18 },
//   { name: 'weth1', img: metamask, contractaddress: '0xc253F9D86Cb529b91FEe2d952f65cd33Bd98617e', decimals: 18 }
// ]

type Inputs = {
  toAddress: string
  toAddressRequired: string
  assert: assertType
  assertRequired: string
  amount: string
  amountRequired: string
}

const isAddress = (address: string) => {
  const result = ethers.utils.isAddress(address)
  if (result == false) {
    const message = 'need right address'
    return message
  }
}

type props = {
  open?: boolean
  callBack: () => void
  selectAssert?: assertType
}

const SendToken: FC<props> = ({ open, callBack, selectAssert }) => {
  const [isTokenOpen, setIsTokenOpen] = useState(open || false)
  const [isPreviewStep, setIsPreviewStep] = useState(false)
  const { address, chainType } = useParams<{ address: string; chainType: string }>()
  const [userTxInput, setUsertTxInput] = useState<TxInput>()
  const [unsigedtx, setUnsigedtx] = useState<Unsigedtx>()
  const [userTxInputReview, setUsertTxInputReview] = useState<Unsigedtx>()

  const { execute: getUnsigedTransactionHash } = useGetTxMsgHash(rpclist[0])
  const { execute: TransactionSigner } = useTransactionSigner(rpclist[0])
  const { chainId, library } = useWeb3React()
  const [msgHash, setMsgHash] = useState<{ hash: string; msg: string }>()
  const { addToast } = useToasts()
  const [gas, setGas] = useState<{ gasLimit?: string; gasPrise?: string; gasCustom?: boolean }>({})

  const [selectedAsset, setselectedAsset] = useState<assertType>()

  const [isOpen, setIsOpen] = useState(false)

  const mpcGroupAccount = useAccount(address)
  const [btnLoading, setBtnLoading] = useState<boolean>(false)
  const { data: assertList } = useAsserts()
  const { balance: NativeBalance } = useNativeBalance(address)
  const { balance: erc20Balance } = useErc20Balance(address, selectedAsset?.contractaddress)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    setValue
  } = useForm<Inputs>()

  const closeTokenModal = useCallback(
    function () {
      setIsTokenOpen(false)
      setIsPreviewStep(false)
      if (callBack) {
        callBack()
      }
      reset()
      setselectedAsset(undefined)
      setGas({ gasCustom: false })
    },
    [callBack, reset]
  )
  useEffect(() => {
    if (open != undefined) {
      setIsTokenOpen(open)
    }
  }, [open])

  useEffect(() => {
    if (selectAssert != undefined) {
      setselectedAsset(selectAssert)
      setValue('assert', selectAssert)
    }
  }, [selectAssert, setValue])

  const isAmount = useCallback(
    (Amount: string) => {
      const result = parseFloat(Amount)
      if (isNaN(result) || selectedAsset == undefined) {
        return false
      } else {
        if (result > 0) {
          const amountBig = ethers.utils.parseUnits(Amount, selectedAsset?.decimals)
          if (selectedAsset?.contractaddress == undefined || selectedAsset?.contractaddress == '') {
            if (amountBig.gt(BigNumber.from(NativeBalance))) {
              return 'Insufficient balance'
            } else {
              return true
            }
          } else {
            if (amountBig.gt(BigNumber.from(erc20Balance))) {
              return 'Insufficient balance'
            } else {
              return true
            }
          }

          return true
        } else {
          return false
        }
      }
    },
    [NativeBalance, erc20Balance, selectedAsset]
  )

  const onSubmit: SubmitHandler<Inputs> = useCallback(
    data => {
      setIsPreviewStep(true)
      if (address != undefined && chainType !== undefined && chainId !== undefined) {
        //1 拼接 交易结构
        //
        setUsertTxInput({
          from: address,
          to: data.toAddress,
          gas: 0,
          gasPrice: 0,
          originValue: data.amount,
          name: data.assert.name,
          assert: data.assert
        })
      }
    },
    [setIsPreviewStep, address, chainType, chainId]
  )

  useEffect(() => {
    const run = async function () {
      if (userTxInput !== undefined && chainType !== undefined && chainId !== undefined) {
        const dataUnsigedtx = buidTransactionJson(chainType, chainId, userTxInput)

        setUnsigedtx(dataUnsigedtx)

        setUsertTxInputReview(dataUnsigedtx)
        // dataUnsigedtx.gas=gas.toNumber()
        // dataUnsigedtx.gasPrice=gasprise.toNumber()

        //get gas
        // setUnsigedtx(dataUnsigedtx)
      }
    }

    run()
  }, [chainType, chainId, userTxInput, setUsertTxInputReview])

  useEffect(() => {
    const run = async () => {
      if (unsigedtx != undefined) {
        const txforestimateGas = {
          from: unsigedtx.from,
          to: unsigedtx.to,
          data: selectedAsset?.contractaddress ? unsigedtx.data : '',
          value: selectedAsset?.contractaddress ? '0x0' : unsigedtx.value
        }
        // console.log('gas')

        if (gas.gasCustom == undefined || gas.gasCustom == false) {
          try {
            const gasEstimate: BigNumber = await library.estimateGas(txforestimateGas)
            // const gasEstimate_: BigNumber =BigNumber.from(ethers.utils.parseUnits('0.001',"gwei"))
            // console.log(gasEstimate_.toString(),'gasEstimate_')
            const gasprise: BigNumber = await library.getGasPrice()
            const gasEstimateMore = calculateGasMargin(gasEstimate)

            setGas({ gasLimit: gasEstimateMore.toString(), gasPrise: gasprise.toString() })
            if (unsigedtx) {
              const txinfoInput: Unsigedtx = {
                ...unsigedtx,
                gas: gasEstimateMore.toNumber(),
                gasPrice: gasprise.toNumber()
              }
              setUsertTxInputReview(txinfoInput)
            }
          } catch (error: unknown) {
            console.info(error)
            return
          }
        }
      }
    }
    run()
  }, [unsigedtx, library, chainType, gas.gasCustom, selectedAsset?.contractaddress])

  useEffect(() => {
    const run = async () => {
      if (
        getUnsigedTransactionHash != undefined &&
        chainType != undefined &&
        unsigedtx != undefined &&
        gas != undefined &&
        gas.gasLimit != undefined &&
        gas.gasPrise != undefined &&
        chainId != undefined
      ) {
        const txinfo: Unsigedtx = {
          ...unsigedtx,
          gas: gas.gasLimit as unknown as number,
          gasPrice: gas.gasPrise as unknown as number
        }
        const data = await getUnsigedTransactionHash(txinfo, chainType, chainId)
        if (data.msg == 'success') {
          setMsgHash(data.info)
          setMsgHash({ hash: data.info, msg: data.msgContext })
        } else {
          addToast(data.error, { appearance: 'error' })
        }
      }
    }
    run()
  }, [unsigedtx, gas, chainType, getUnsigedTransactionHash, chainId, addToast])

  const sendSigner = useCallback(async () => {
    if (
      mpcGroupAccount != undefined &&
      chainType != undefined &&
      msgHash != undefined &&
      unsigedtx != undefined &&
      TransactionSigner != undefined &&
      chainId != undefined &&
      gas.gasLimit != undefined &&
      gas.gasPrise != undefined
    ) {
      setBtnLoading(true)
      const data = await TransactionSigner(mpcGroupAccount, chainType, msgHash, chainId)
      if (data.msg == 'success') {
        addToast('Transactions have been sent', { appearance: 'success' })
        closeTokenModal()
      } else {
        addToast(data.error, { appearance: 'error' })
      }
      setBtnLoading(false)
    } else {
      console.info('mpcGroupAccount', mpcGroupAccount)
      console.info('chainType', chainType)
      console.info('msgHash', msgHash)
      console.info('unsigedtx', unsigedtx)
      console.info('TransactionSigner', TransactionSigner)
      console.info('chainId', chainId)
      console.info('gas.gasLimit', gas.gasLimit)
      console.info('gas.gasPrise', gas.gasPrise)
      if (msgHash === undefined) {
        addToast('get Unsiged TransactionHash error', { appearance: 'error' })
        return
      }
      if (TransactionSigner === undefined) {
        addToast('get Transaction Signer error', { appearance: 'error' })
        return
      }

      if (gas.gasLimit === undefined || gas.gasLimit == undefined) {
        addToast('get gas error', { appearance: 'error' })
        return
      }
    }
  }, [TransactionSigner, mpcGroupAccount, chainType, msgHash, unsigedtx, addToast, closeTokenModal, gas, chainId])

  const previous = useCallback(() => {
    setIsPreviewStep(false)
    setGas({ gasCustom: false })
  }, [setIsPreviewStep])

  function openGasModel() {
    setIsOpen(true)
  }
  function editGas({ gasLimit, gasPrise }: { gasLimit?: string; gasPrise?: string }) {
    setGas({ gasLimit, gasPrise, gasCustom: true })
    setIsOpen(false)
    if (gasLimit != undefined && gasPrise != undefined) {
      setUsertTxInput((prevState: TxInput | undefined) => {
        return {
          ...(prevState || {}),
          gas: parseInt(gasLimit),
          gasPrice: parseInt(gasPrise)
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
                      <div className="mt-4 flex flex-col    space-y-1  w-80 sm:w-96 ">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="mb-6">
                            <label htmlFor="sendingfrom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Sending from{' '}
                            </label>
                            <div className="flex flex-row   items-center ">
                              <Avvvatars value={address ? address : ''} style="shape" size={40} />
                              <div className="flex-1 flex flex-col ">
                                <div className="break-all pl-2">
                                  <AddressName address={address}></AddressName>
                                </div>
                                <div className="break-all pl-2">{address ? cutOut(address, 12, 12) : ''}</div>
                              </div>
                            </div>
                          </div>
                          <div className="mb-6">
                            <label htmlFor="assert" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Asset{' '}
                            </label>

                            <Controller
                              name="assert"
                              control={control}
                              rules={{
                                validate: (assertValue: assertType) => {
                                  if (assertValue == undefined) {
                                    return 'need select assert'
                                  }
                                }
                              }}
                              render={({ field: { onChange } }) => {
                                return (
                                  <Listbox
                                    value={selectedAsset}
                                    onChange={e => {
                                      onChange(e)
                                      setselectedAsset(e)
                                    }}
                                  >
                                    <div className="relative mt-1">
                                      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                        <span className="block truncate">{selectedAsset ? selectedAsset.name : 'please select asset'}</span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                      </Listbox.Button>

                                      <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                          {assertList.map((Assert, AssertIdx) => (
                                            <Listbox.Option
                                              key={AssertIdx}
                                              className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                  active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                                }`
                                              }
                                              value={Assert}
                                            >
                                              {({ selected }) => (
                                                <div className="flex flex-row  ">
                                                  {/* <span className="block truncate">
                                                    <img width={16} src={Assert.img} className="m-1"></img>
                                                  </span> */}

                                                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{Assert.name}</span>
                                                  {selected ? (
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                  ) : null}
                                                </div>
                                              )}
                                            </Listbox.Option>
                                          ))}
                                        </Listbox.Options>
                                      </Transition>
                                    </div>
                                  </Listbox>
                                )
                              }}
                            />
                            {errors.assert && <div className=" text-red-400 ">{errors.assert.message}</div>}
                          </div>
                          {errors.toAddressRequired && <span>This field is required</span>}
                          <div className="mb-6">
                            <label htmlFor="recipientAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                              Recipient address{' '}
                            </label>
                            <input
                              {...register('toAddress', { required: true, validate: isAddress })}
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
                                <If condition={selectedAsset?.contractaddress == undefined}>
                                  <Then>Balance:{NativeBalance && selectedAsset ? formatUnits(chainId, NativeBalance) : ''}</Then>
                                  <Else>
                                    Balance:
                                    {erc20Balance && selectedAsset ? formatUnitsErc20(erc20Balance, selectedAsset?.name, selectedAsset?.decimals) : ''}
                                  </Else>
                                </If>
                              </label>
                            </div>

                            <input
                              type="text"
                              id="Amount"
                              {...register('amount', { required: true, validate: isAmount })}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                            <div>{errors.amount && <div className=" text-red-400 ">{errors.amount.message}</div>}</div>
                          </div>
                          {errors.toAddressRequired && <span>This field is required</span>}
                          <div className="mb-6 flex  flex-col-reverse sm:flex-row  pt-8">
                            {/* <div className=" text-center">
                              <button className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                Previous
                              </button>
                            </div> */}

                            <button
                              type="submit"
                              // onClick={next}
                              className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 "
                            >
                              next
                            </button>
                            {/* </div> */}
                          </div>
                        </form>
                      </div>
                    </Dialog.Panel>
                  </When>
                  <When condition={isPreviewStep === true}>
                    <Preview
                      userTxInput={userTxInputReview}
                      openGasModel={openGasModel}
                      previous={previous}
                      next={sendSigner}
                      assert={userTxInput?.assert}
                      btnLoading={btnLoading}
                      userTxInputShow={userTxInput}
                    ></Preview>
                  </When>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <GasModel isOpen={isOpen} closeModal={editGas} gasPrise={gas.gasPrise} gasLimit={gas.gasLimit}></GasModel>
    </>
  )
}

export default SendToken
