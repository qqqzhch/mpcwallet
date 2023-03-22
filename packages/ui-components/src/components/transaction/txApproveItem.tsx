import { FC, useState, useCallback } from 'react'

import { ArrowDownIcon, ArrowUpRightIcon, UsersIcon } from '@heroicons/react/20/solid'
import { formatTxApprove } from '../../utils'
import dayjs from 'dayjs'
import { classNames } from '../../utils'
import { When,If,Then,Else } from 'react-if'
import Avvvatars from 'avvvatars-react'
import { TxApprove } from '../../state/approve'
import { useTxApproveAccept } from '../../hooks/useSigns'
import { rpclist } from '../../constants/rpcConfig'
import { useParams } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import { TxtxSignHistory } from '../../state/txSignHistory'
import { useWeb3React } from '@web3-react/core'
import {nowThreshold} from '../../utils/index'
import useTxStatusByKeyId from '../../hooks/useTxStatusByKeyId'

function checkThreshold(str: string) {
  const list = str.split('/')
  if (list[0] === list[1]) {
    return true
  } else {
    return false
  }
}



interface Props {
  txApprove: TxtxSignHistory | TxApprove | undefined,
  issignHIstory?:boolean
}

const TxApproveItem: FC<Props> = ({ txApprove,issignHIstory=false }) => {
  const { execute } = useTxApproveAccept(rpclist[0])
  const { chainId } = useWeb3React()
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
  const txStatus = useTxStatusByKeyId(txApprove?.Key_id)

  const Agree = useCallback(
    async (nameType: string) => {
      if (execute != undefined && chainType != undefined && txApprove != undefined&&chainId!=undefined) {
        const result = await execute(txApprove.Key_id, chainType, txApprove?.Msg_hash, txApprove?.Msg_context, nameType,chainId)

        //"Status": "success",
        if (result.Status == 'success') {
          addToast(nameType + ' Operation succeeded', { appearance: 'success' })
        } else {
          addToast(result.Tip, { appearance: 'error' })
        }
      }
    },
    [execute, chainType, txApprove, addToast,chainId]
  )

  return (
    <div className="flex flex-col overflow-x-auto  text-base p-2">
      {txApprove &&
        [txApprove].map(item => {
          const txList = formatTxApprove(item.Msg_context)
          return (
            <>
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
                <div className=" w-full sm:w-1/5 ">{dayjs(Number(item.Timestamp || item.Reply_timestamp)).format('DD/MM/YYYY:HH:MM')}</div>
                <div className=" w-full sm:w-1/5 ">
                  {txList.map(tx => {
                    return tx.originValue + ' ' + tx.name + ' '
                  })}{' '}
                </div>
                <div className=" w-full sm:w-1/5 ">
                  <UsersIcon className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4 inline-block"></UsersIcon>
                  {nowThreshold(item.Threshold,item.Signed)}
                </div>
                <div className=" w-full sm:w-1/5 text-right sm:text-left text-indigo-500">
                <If condition={item.Status == 0&&issignHIstory===false}>
                  <Then>
                  Needs your confirmation
                  <ArrowDownIcon className=" w-6 h-6 flex-shrink-0 ml-4 inline-block"></ArrowDownIcon>
                  </Then>
                  <Else>
                  TX Status:{txStatus.data.text}
                  </Else>
                  
                </If>

                </div>
              </div>
              <When condition={actives[item.Key_id]}>
                <div className="w-full  flex flex-col sm:flex-row p-4   bg-gray-50 ">
                  <div className=" w-full sm:w-2/3 flex flex-col ">
                    {txList.map((tx, index) => {
                      return (
                        <div key={index} className="flex flex-row border-b  border-gray-200 border-solid p-4">
                          <div className="flex-1">
                            Sent {tx.originValue} {tx.name} to
                            <div className=" flex items-center p-1 ">
                              <span className=" ">
                                <Avvvatars value={tx.to} style="shape" size={30} />
                              </span>
                              <span className=" p-2 break-all ">{tx.to}</span>
                            </div>
                          </div>
                          <div>{/* ... */}</div>
                        </div>
                      )
                    })}
                    <div className="flex flex-col gap-2 p-4">
                      <When condition={item.Timestamp !== undefined&&item.Timestamp!==""}>
                        <div className="flex flex-row">
                          <div className="w-1/3">Created:</div>
                          <div className="w-2/3">{dayjs(Number(item.Timestamp)).format('DD/MM/YYYY:HH:MM')} </div>
                        </div>
                      </When>
                      <When condition={item.Reply_timestamp !== undefined&&item.Reply_timestamp!==""}>
                        <div className="flex flex-row">
                          <div className="w-1/3">Reply time:</div>
                          <div className="w-2/3">{dayjs(Number(item.Reply_timestamp)).format('DD/MM/YYYY:HH:MM')} </div>
                        </div>
                      </When>
                    </div>
                    <When condition={item.Reply_status !== undefined && item.Reply_status !== ''}>
                      <div className="flex flex-col gap-2 p-4">
                        <div className="flex flex-row">
                          <div className="w-1/3">Reply status:</div>
                          <div className="w-2/3">{item.Reply_status} </div>
                        </div>
                      </div>
                    </When>
                    <When condition={item.Txid !== undefined && item.Txid !== ''}>
                      <div className="flex flex-col gap-2 p-4">
                        <div className="flex flex-row">
                          <div className="w-1/3">Transaction Hash:</div>
                          <div className="w-2/3 break-words">{item.Txid} </div>
                        </div>
                      </div>
                    </When>
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
                    <div className="lg:w-2/5 md:w-1/2 ">
                      <div className="flex relative pb-2">
                        <div className="h-full w-8 absolute inset-0 flex items-center justify-center">
                          <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                        </div>
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                          <When condition={checkThreshold(item.Threshold) === true}>✓</When>
                          <When condition={checkThreshold(item.Threshold) === false}>~</When>
                        </div>
                        <div className="flex-grow pl-4">
                          <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">Confirmations {nowThreshold(item.Threshold,item.Signed)}</h2>
                          <p className="leading-relaxed">{/* xx */}</p>
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-2/5 md:w-1/2 ">
                      <div className="flex relative pb-2">
                        <div className="h-full w-8 absolute inset-0 flex items-center justify-center">
                          <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                        </div>
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                          <When condition={item.Status == 0}>~</When>
                          <When condition={item.Status == 1}>✓</When>
                        </div>
                        <div className="flex-grow pl-4">
                          <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">Executed </h2>
                          <p className="leading-relaxed"> Status:{txStatus.data.text}</p>
                        </div>
                      </div>
                    </div>
                    <When condition={item.Status == 0&&issignHIstory===false}>
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
                    </When>
                  </div>
                </div>
              </When>
            </>
          )
        })}
    </div>
  )
}

export default TxApproveItem
