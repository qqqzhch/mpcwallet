import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, FC, useCallback, useEffect } from 'react'
import { ProposedTransaction } from '../../hooks/useServices/models'
import Preview from '../transaction/preview'
import { TxInput, assertType, Unsigedtx, buidTransactionForTxbuild } from '../../utils/buildMpcTx'
import { useParams } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import useChainInfo from '../../hooks/useChainInfo'
import { BigNumber } from 'ethers'
import { useGetTxMsgHash, useTransactionSigner } from '../../hooks/useSigns'
import { rpclist } from '../../constants/rpcConfig'
import { useToasts } from 'react-toast-notifications'
import useAccount from '../../hooks/useAccount'
import GasModel from '../transaction/gasmodel'
import { getChainInfo } from '../../constants/chainInfo'
import { calculateGasMargin } from '../../utils/index'

type Props = {
  isOpen: boolean
  closeModal: () => void
  transaction: ProposedTransaction | undefined
}

const ContractModel: FC<Props> = ({ isOpen, closeModal, transaction }) => {
  const [userTxInputReview, setUsertTxInputReview] = useState<Unsigedtx>()
  const { address, chainType } = useParams<{ address: string; chainType: string }>()
  const { chainId, library } = useWeb3React()
  const [assert, setAssert] = useState<assertType>()
  const ChainInfo = useChainInfo()
  const [gas, setGas] = useState<{ gasLimit?: string; gasPrise?: string }>({})
  const [isShow, setIsShow] = useState(false)
  const [userTxInputReviewnew, setUsertTxInputReviewnew] = useState<Unsigedtx>()
  const { execute: getUnsigedTransactionHash } = useGetTxMsgHash(rpclist[0])
  const { execute: TransactionSigner } = useTransactionSigner(rpclist[0])
  const [msgHash, setMsgHash] = useState<{ hash: string; msg: string }>()
  const [btnLoading, setBtnLoading] = useState<boolean>(false)

  const [isgasOpen, setGasIsOpen] = useState(false)

  const mpcGroupAccount = useAccount(address)

  const { addToast } = useToasts()

  function openGasModel() {
    setGasIsOpen(true)
  }

  useEffect(() => {
    if (transaction != undefined) {
      const item: ProposedTransaction = transaction
      if (chainType != undefined && chainId != undefined && isOpen) {
        const txinfo: TxInput = {
          from: item.raw.from,
          to: item.raw.to,
          gas: 0,
          gasPrice: 0,
          originValue: item.raw.value.toString(),
          name: 'wei ' + getChainInfo(chainId)?.nativeCurrency.name
        }
        const haveNative = item.raw.haveNative

        const dataUnsigedtx = buidTransactionForTxbuild(chainType, chainId, txinfo, transaction.raw.data, haveNative)

        if (haveNative && ChainInfo && ChainInfo.logoUrl) {
          setAssert({
            name: ChainInfo.nativeCurrency.name,
            img: ChainInfo.logoUrl,
            balance: '',
            decimals: ChainInfo?.nativeCurrency.decimals,
            contractaddress: item.raw.to
          })
        }
        setUsertTxInputReview(dataUnsigedtx)
      }
    }
  }, [transaction, ChainInfo, chainId, chainType, library, isOpen])

  useEffect(() => {
    const run = async () => {
      if (userTxInputReview && isOpen) {
        const txforestimateGas = {
          from: userTxInputReview.from,
          to: userTxInputReview.to,
          data: userTxInputReview.assert?.contractaddress ? userTxInputReview.data : '',
          value: userTxInputReview.assert?.contractaddress ? '0x' : userTxInputReview.value
        }
        setIsShow(true)
        const gasprise: BigNumber = await library.getGasPrice()
        const gasEstimate: BigNumber = await library.estimateGas(txforestimateGas)
        const gasEstimateMore = calculateGasMargin(gasEstimate)
        setGas({ gasLimit: gasEstimateMore.toString(), gasPrise: gasprise.toString() })

        const txinfoInput: Unsigedtx = {
          ...userTxInputReview,
          gas: gasEstimateMore.toNumber(),
          gasPrice: gasprise.toNumber()
        }
        setUsertTxInputReviewnew(txinfoInput)
      }
    }
    run()
  }, [userTxInputReview, library, isOpen])
  useEffect(() => {
    if (isOpen == false) {
      setIsShow(false)
    }
  }, [isOpen])

  useEffect(() => {
    const run = async () => {
      if (
        getUnsigedTransactionHash != undefined &&
        chainType != undefined &&
        userTxInputReviewnew != undefined &&
        gas != undefined &&
        gas.gasLimit != undefined &&
        gas.gasPrise != undefined &&
        chainId != undefined
      ) {
        const txinfo: Unsigedtx = {
          ...userTxInputReviewnew,
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
  }, [userTxInputReviewnew, gas, chainType, getUnsigedTransactionHash, chainId, addToast])

  const previous = useCallback(() => {
    closeModal()
  }, [closeModal])

  const sendSigner = useCallback(async () => {
    if (
      mpcGroupAccount != undefined &&
      chainType != undefined &&
      msgHash != undefined &&
      TransactionSigner != undefined &&
      chainId != undefined &&
      gas.gasLimit != undefined &&
      gas.gasPrise != undefined
    ) {
      setBtnLoading(true)
      const data = await TransactionSigner(mpcGroupAccount, chainType, msgHash, chainId)
      if (data.msg == 'success') {
        addToast('Transactions have been sent', { appearance: 'success' })
        closeModal()
      } else {
        addToast(data.error, { appearance: 'error' })
      }
      setBtnLoading(false)
    } else {
      console.info('mpcGroupAccount', mpcGroupAccount)
      console.info('chainType', chainType)
      console.info('msgHash', msgHash)
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
  }, [TransactionSigner, mpcGroupAccount, chainType, msgHash, addToast, closeModal, gas, chainId])

  function editGas({ gasLimit, gasPrise }: { gasLimit?: string; gasPrise?: string }) {
    setGas({ gasLimit, gasPrise })
    setGasIsOpen(false)
    if (gasLimit != undefined && gasPrise != undefined) {
      // setUsertTxInputReviewnew(txinfoInput)
      setUsertTxInputReviewnew((prevState: Unsigedtx | undefined) => {
        return {
          ...(prevState || {}),
          gas: parseInt(gasLimit),
          gasPrice: parseInt(gasPrise)
        } as Unsigedtx
      })
    }
  }
  return (
    <div>
      <Transition appear show={isShow} as={Fragment}>
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
                  <Preview
                    btnLoading={btnLoading}
                    userTxInput={userTxInputReviewnew}
                    openGasModel={openGasModel}
                    previous={previous}
                    next={sendSigner}
                    assert={assert}
                    isTxBuild={true}
                  ></Preview>
                  <GasModel isOpen={isgasOpen} closeModal={editGas} gasPrise={gas.gasPrise} gasLimit={gas.gasLimit}></GasModel>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default ContractModel
