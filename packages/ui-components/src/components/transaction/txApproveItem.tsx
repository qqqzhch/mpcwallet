import { FC, useState, useCallback, useEffect } from 'react'

import { ArrowDownIcon, ArrowUpRightIcon, UsersIcon } from '@heroicons/react/20/solid'
import { cutOut, formatTxApprove } from '../../utils'
import dayjs from '../../utils/dayjs'
import { classNames } from '../../utils'
import { When, If, Then, Else } from 'react-if'
import Avvvatars from 'avvvatars-react'
import { TxApprove } from '../../state/approve'
import { useTxApproveAccept } from '../../hooks/useSigns'
import { rpclist } from '../../constants/rpcConfig'
import { useParams } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import { TxtxSignHistory } from '../../state/txSignHistory'
import { useWeb3React } from '@web3-react/core'
import { nowThreshold, gasFee, formatUnits, formatUnitsErc20, formatFromWei } from '../../utils/index'
import useTxStatusByKeyId from '../../hooks/useTxStatusByKeyId'
import useTxHashByKeyId from '../../hooks/useTxHashByKeyId'
import loadingiImg from '../../assets/loading.svg'
import ScanTxUrl from '../mpcinfo/scanTxUrl'
import { getChainInfo } from '../../constants/chainInfo'
import { BigNumber, ethers } from 'ethers'

//eslint-disable-next-line  @typescript-eslint/ban-ts-comment
//@ts-ignore
import abiDecoder from 'abi-decoder'

// const abiDecoder = require('abi-decoder');
import ERC20 from '../../constants/ABI/ERC20.json'
import { RPC_URLS } from '../../constants/networks'
import { SupportedChainId } from '../../constants/chains'
abiDecoder.addABI(ERC20)

import useMpcAddressDetail from '../../hooks/useMpcAddressDetail'
import useApprovalListByKeyId from '../../hooks/useApprovalListByKeyId'
import AddressName from '../walletList/addressName'

function checkThreshold(str: string) {
  const list = str.split('/')
  if (list[0] === list[1]) {
    return true
  } else {
    return false
  }
}

interface Props {
  txApprove: TxtxSignHistory | TxApprove | undefined
  issignHIstory?: boolean
}

type tokenTxType = {
  [key: number]: {
    to: string
    tokenAmount: string
  }
}

type mpcOwnerStatusType = {
  address: string
  reply_status?: string
  signed?: number
  status?: number
}

const TxApproveItem: FC<Props> = ({ txApprove, issignHIstory = false }) => {
  const { execute } = useTxApproveAccept(rpclist[0])
  const { chainId, library } = useWeb3React()
  const [actives, setActives] = useState<{
    [key: string]: boolean
  }>({})
  const { chainType } = useParams<{ address: string; chainType: string }>()
  const openPanel = useCallback(
    (Key_id: string) => {
      setActives(pre => {
        return {
          ...pre,
          [Key_id]: !pre[Key_id]
        }
      })
    },
    [setActives]
  )
  const { addToast } = useToasts()
  const [refreshInterval, setRefreshInterval] = useState<number>(1000 * 15)
  const txStatus = useTxStatusByKeyId(txApprove?.Key_id, refreshInterval)
  const { data: txhashInfo } = useTxHashByKeyId(txApprove?.Key_id)

  const [showBtn, setShowBtn] = useState<boolean>(!issignHIstory)
  const [btnLoading, setBtnLoading] = useState<boolean>(false)
  const [txAmount, setTxAmount] = useState<string>('')
  const [txTokenAmount, setTxTokenAmount] = useState<string>('')

  const [txtokenTxInfo, settxtokenTxInfo] = useState<tokenTxType>({})
  const { data: ownerAccountInfo } = useMpcAddressDetail()

  const [ownerStatusList, setOwnerStatusList] = useState<mpcOwnerStatusType[]>()
  const { data: ApprovalListByKeyIds } = useApprovalListByKeyId(txApprove?.Key_id)

  useEffect(() => {
    if (ownerAccountInfo) {
      const list: mpcOwnerStatusType[] = []

      ownerAccountInfo.forEach(item => {
        let status: TxtxSignHistory | undefined
        if (ApprovalListByKeyIds) {
          status = ApprovalListByKeyIds.find(it => {
            return it.User_account == item.User_account
          })
        }
        if (status == undefined) {
          return
        }

        list.push({
          address: item.User_account,
          reply_status: status ? (status.Reply_status == '' ? 'pending' : status.Reply_status) : undefined,
          signed: status ? status.Signed : undefined,
          status: status ? status.Status : undefined
        })
      })
      setOwnerStatusList(list)
    }
  }, [ownerAccountInfo, ApprovalListByKeyIds, txApprove?.Key_id])

  const Agree = useCallback(
    async (nameType: string) => {
      if (execute != undefined && chainType != undefined && txApprove != undefined && chainId != undefined) {
        setBtnLoading(true)
        const result = await execute(txApprove.Key_id, chainType, txApprove?.Msg_hash, txApprove?.Msg_context, nameType, chainId)

        //"Status": "success",
        if (result.msg == 'success') {
          addToast(nameType + ' Operation succeeded', { appearance: 'success' })
          setRefreshInterval(1000 * 5)
          setShowBtn(false)
        } else {
          addToast(result.error, { appearance: 'error' })
        }
        setBtnLoading(false)
      }
    },
    [execute, chainType, txApprove, addToast, chainId]
  )

  const getChain = useCallback((chainId: string) => {
    const num = BigNumber.from(chainId).toNumber()
    const info = getChainInfo(num)
    return info
  }, [])
  useEffect(() => {
    //const decodedData = abiDecoder.decodeMethod(tx.data);
    const run = async () => {
      if (txApprove == undefined) {
        return
      }
      const txList = formatTxApprove(txApprove.Msg_context)
      if (txList.length == 0) {
        return
      }
      const tx = txList[0]
      const txchainId = BigNumber.from(tx.chainId).toNumber()
      const txChainInfo = getChainInfo(txchainId)

      if (txChainInfo == undefined) {
        return
      }

      {
        // native token
        const amount = BigNumber.from(tx.value).toString()
        if (amount != '0') {
          const nativetokenAmount = formatFromWei(amount, txChainInfo.nativeCurrency.decimals) + txChainInfo.nativeCurrency.symbol
          setTxAmount(nativetokenAmount)
        }
      }

      if (tx.data === '0x') {
        return
      }

      txList.forEach(async (tx, index) => {
        try {
          const decodedData = abiDecoder.decodeMethod(tx.data)
          if (decodedData === undefined) {
            // not erc 20
            return
          }
          // read symbol() decimals()
          // 这里需要从目标链上读取数据而不是当前链
          const rpcurl = RPC_URLS[txchainId as unknown as SupportedChainId]
          const txprovider = new ethers.providers.JsonRpcProvider(rpcurl[0])
          const erc20Contract = new ethers.Contract(tx.to, ERC20, txprovider)
          const result = await Promise.all([erc20Contract.symbol(), erc20Contract.decimals()])
          const [tokensymbol, tokendecimals] = result

          let to = '',
            value = ''
          switch (decodedData.name) {
            case 'transferFrom':
              to = decodedData.params[1].value
              value = decodedData.params[2].value

              break
            case 'transfer':
              to = decodedData.params[0].value
              value = decodedData.params[1].value
              break
          }
          if (value == undefined) {
            return
          }

          const tokenAmount = value == '' ? '' : formatUnitsErc20(value, tokensymbol, tokendecimals)
          const txListTokenInfo: tokenTxType = {}
          txListTokenInfo[index] = {
            to,
            tokenAmount
          }
          settxtokenTxInfo(pre => {
            return {
              ...pre,
              ...txListTokenInfo
            }
          })

          if (index == 0) {
            setTxTokenAmount(tokenAmount)
          }
        } catch (error) {
          console.info(error)
          console.info(tx)
        }
      })
    }
    run()
  }, [txApprove, library])

  return (
    <div className="flex flex-col overflow-x-auto  text-base p-2">
      {txApprove &&
        [txApprove].map(item => {
          const txList = formatTxApprove(item.Msg_context)
          return (
            <div key={item.Key_id}>
              <div
                onClick={() => {
                  openPanel(item.Key_id)
                }}
                key={item.Key_id}
                className={classNames(
                  ' flex flex-col sm:flex-row  border border-gray-200 rounded-md p-4 mt-2   cursor-pointer sm:items-center',
                  actives[item.Key_id] ? 'bg-blue-100' : 'hover:bg-blue-100'
                )}
              >
                <div className=" w-full sm:w-1/5 ">
                  <ArrowUpRightIcon className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4 inline-block"></ArrowUpRightIcon>
                  sent
                </div>
                <div className=" w-full sm:w-1/5 ">{dayjs(Number(item.Timestamp || (item as TxtxSignHistory).Local_timestamp)).fromNow()}</div>
                <div className=" w-full sm:w-1/5 break-words">
                  {/* {txList.map(tx => {
                    return tx.originValue + ' ' + tx.name + ' '
                  })}{' '} */}
                  {txAmount} {txTokenAmount}
                </div>
                <div className=" w-full sm:flex-1 ">
                  <UsersIcon className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4 inline-block"></UsersIcon>

                  {nowThreshold(item.Threshold, item.Signed, issignHIstory)}
                </div>
                <div className=" w-full sm:w-1/4 text-right sm:text-left text-indigo-500">
                  <If condition={item.Status == 0}>
                    <Then>
                      <When condition={issignHIstory === false}>Needs your confirmation</When>
                      <When condition={issignHIstory === true}>Needs other confirmation</When>

                      <ArrowDownIcon className=" w-6 h-6 flex-shrink-0 ml-4 inline-block"></ArrowDownIcon>
                    </Then>
                    <Else>TX Status:{txStatus.data.text}</Else>
                  </If>
                </div>
              </div>
              <When condition={actives[item.Key_id]}>
                <div className="w-full  flex flex-col sm:flex-row p-4   bg-gray-50 ">
                  <div className=" w-full sm:w-2/3 flex flex-col ">
                    {txList.map((tx, index) => {
                      return (
                        <div key={index}>
                          <div className="flex flex-row border-b  border-gray-200 border-solid p-4">
                            <div className="flex-1">
                              <If condition={tx.data == '0x'}>
                                <Then>
                                  Sent {tx.originValue} {tx.name} to
                                  <div className=" flex flex-row items-center p-1 ">
                                    <span className="mr-2 ">
                                      <Avvvatars value={tx.to} style="shape" size={30} />
                                    </span>
                                    <div>
                                      <div className=" pl-2 break-all ">
                                        <AddressName address={tx.to}></AddressName>
                                      </div>
                                      <span className=" pl-2 break-all ">{tx.to}</span>
                                    </div>
                                  </div>
                                </Then>
                                <Else>
                                  Interacting with contracts
                                  <div className=" flex items-center p-1 ">
                                    <span className=" p-2 break-all ">{tx.to}</span>
                                  </div>
                                  <When condition={txtokenTxInfo !== undefined && txtokenTxInfo[index] !== undefined}>
                                    <div>
                                      <When condition={txtokenTxInfo && txtokenTxInfo[index] && txtokenTxInfo[index].to != ''}>
                                        <div className="flex items-center flex-wrap">
                                          <span className=" w-20">To:</span>
                                          <div className=" flex flex-col">
                                            <span className=" break-words    break-all ">
                                              <AddressName address={txtokenTxInfo[index] && txtokenTxInfo[index].to}></AddressName>
                                            </span>
                                            <span className=" break-words    break-all  ">{txtokenTxInfo[index] && txtokenTxInfo[index].to}</span>
                                            {/* <span className=" ">
                                            <Avvvatars value={txtokenTxInfo[index] && txtokenTxInfo[index].to} style="shape" size={20} />
                                          </span> */}
                                          </div>
                                        </div>
                                      </When>
                                      <When condition={(txtokenTxInfo && txtokenTxInfo[index] && txtokenTxInfo[index].tokenAmount != '') || txAmount !== ''}>
                                        <div className=" flex items-center flex-wrap">
                                          <span className=" w-20">Amount:</span>
                                          <span className=" break-words    break-all ">
                                            {txtokenTxInfo[index] && txtokenTxInfo[index].tokenAmount} {txAmount}
                                          </span>
                                        </div>
                                      </When>
                                    </div>
                                  </When>
                                </Else>
                              </If>
                            </div>
                            <div className="flex flex-col sm:flex-row  items-center  justify-center bg-yellow-300 px-4 my-4">
                              <span className="mr-1">
                                <img width={16} src={getChain(txList[0].chainId)?.logoUrl}></img>
                              </span>

                              <span>{getChain(txList[0].chainId)?.label}</span>
                            </div>
                          </div>
                          <div className="flex  flex-col border-b  border-gray-200 border-solid p-4 gap-1">
                            <div className="">Gas Limit:{tx.gas}</div>
                            <div>Gas Prise:{tx.gasPrice}</div>
                            <div>Gas Fee:{formatUnits(chainId, gasFee(tx.gas, tx.gasPrice))}</div>
                          </div>
                        </div>
                      )
                    })}
                    <div className="flex flex-col px-4 py-1">
                      <When condition={item.Timestamp !== undefined && item.Timestamp !== ''}>
                        <div className="flex flex-row">
                          <div className="w-1/3">Created:</div>
                          <div className="w-2/3">{dayjs(Number(item.Timestamp)).fromNow()} </div>
                        </div>
                      </When>
                      <When condition={item.Reply_timestamp !== undefined && item.Reply_timestamp !== ''}>
                        <div className="flex flex-row">
                          <div className="w-1/3">Reply time:</div>
                          <div className="w-2/3">
                            {dayjs(Number(item.Reply_timestamp)).fromNow()}({dayjs(Number(item.Reply_timestamp)).format('YYYY-MM-DDTHH:mm')}){' '}
                          </div>
                        </div>
                      </When>
                    </div>
                    <When condition={item.Reply_status !== undefined && item.Reply_status !== ''}>
                      <div className="flex flex-col px-4 py-1">
                        <div className="flex flex-row">
                          <div className="w-1/3">Reply status:</div>
                          <div className="w-2/3">{item.Reply_status} </div>
                        </div>
                      </div>
                    </When>
                    <When condition={txhashInfo !== undefined && txhashInfo !== ''}>
                      <div className="flex flex-col px-4 py-1">
                        <div className="flex flex-row">
                          <div className="w-1/3">Transaction Hash:</div>
                          <div className="w-2/3">
                            {/* {txhashInfo} */}
                            <ScanTxUrl txhash={txhashInfo} chainId={BigNumber.from(txList[0].chainId).toNumber()}></ScanTxUrl>
                          </div>
                        </div>
                      </div>
                    </When>
                    <div className="flex flex-col px-4 py-1">
                      <div className="flex flex-row">
                        <div className="w-1/3">Key Id:</div>
                        <div className="w-2/3 break-words">
                          {/* {txhashInfo} */}
                          {item.Key_id}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" w-full sm:w-1/3 flex flex-col p-8 gap-4">
                    <div className="lg:w-2/5 md:w-1/2 ">
                      <div className="flex relative pb-2">
                        <div className="h-full w-8 absolute inset-0 flex items-center justify-center">
                          <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                        </div>
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                          +
                        </div>
                        <div className="flex-grow pl-4">
                          <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">Created</h2>
                        </div>
                      </div>
                    </div>
                    <div className="w-full 2xl:w-4/5 ">
                      <div className="flex relative pb-2">
                        <div className="h-full w-8 absolute inset-0 flex items-center justify-center">
                          <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                        </div>
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                          <When condition={checkThreshold(item.Threshold) === true}>✓</When>
                          <When condition={checkThreshold(item.Threshold) === false}>~</When>
                        </div>
                        <div className="flex-grow pl-4 ">
                          <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                            Confirmations {nowThreshold(item.Threshold, item.Signed, issignHIstory)}
                          </h2>
                          <div className="leading-relaxed flex flex-col  ">
                            {ownerStatusList &&
                              ownerStatusList.map((item, index) => {
                                return (
                                  <div key={index} className=" inline-flex flex-row items-center">
                                    <Avvvatars value={item.address} style="shape" size={20} />
                                    <div className="px-2 flex-grow text-sm">
                                      <div>
                                        <AddressName address={item.address}></AddressName>
                                      </div>

                                      <div>{cutOut(item.address, 6, 6)}</div>
                                    </div>
                                    <div className="px-2">{item.reply_status ? item.reply_status : ''}</div>
                                  </div>
                                )
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-3/5 md:w-1/2 ">
                      <div className="flex relative pb-2">
                        <div className="h-full w-8 absolute inset-0 flex items-center justify-center">
                          <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                        </div>
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                          <When condition={txStatus.data.code == '0'}>~</When>
                          <When condition={txStatus.data.code == '1'}>✓</When>
                        </div>
                        <div className="flex-grow pl-4">
                          <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">Executed </h2>
                          <p className="leading-relaxed"> Status:{txStatus.data.text}</p>
                        </div>
                      </div>
                    </div>
                    <When condition={showBtn == true && txStatus.data.code == '0' && issignHIstory === false}>
                      <If condition={btnLoading}>
                        <Then>
                          <div className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-center justify-center">
                            <img className="inline w-4 h-4 mr-3 text-white animate-spin" src={loadingiImg}></img>
                            loading...
                          </div>
                        </Then>
                        <Else>
                          <div className="lg:w-3/5 md:w-2/3 flex  flex-row justify-between ">
                            <button
                              onClick={() => {
                                Agree('DISAGREE')
                              }}
                              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                              Disagree
                            </button>
                            <button
                              onClick={() => {
                                Agree('AGREE')
                              }}
                              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                              Agree
                            </button>
                          </div>
                        </Else>
                      </If>
                    </When>
                    <When condition={showBtn == false && txStatus && txStatus.data.code !== undefined && ['5', '6', '7'].includes(txStatus.data.code) == false}>
                      <div className="flex items-center justify-center   bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                        <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
                          loading...
                        </div>
                      </div>
                    </When>
                  </div>
                </div>
              </When>
            </div>
          )
        })}
    </div>
  )
}

export default TxApproveItem
