import React, { FC, useState, useCallback, useEffect, useMemo } from 'react'

import { ArrowDownIcon, UsersIcon } from '@heroicons/react/20/solid'
import { formatTxApprove } from '../../utils'
import dayjs from '../../utils/dayjs'
import { classNames } from '../../utils'
import { When, If, Then, Else } from 'react-if'

import { TxApprove } from '../../state/approve'

import { TxtxSignHistory } from '../../state/txSignHistory'
import { useWeb3React } from '@web3-react/core'
import { nowThreshold } from '../../utils/index'
import useTxStatusByKeyId from '../../hooks/useTxStatusByKeyId'

import { getChainInfo } from '../../constants/chainInfo'
import { BigNumber } from 'ethers'

//eslint-disable-next-line  @typescript-eslint/ban-ts-comment
//@ts-ignore
import abiDecoder from 'abi-decoder'

// const abiDecoder = require('abi-decoder');
import ERC20 from '../../constants/ABI/ERC20.json'

abiDecoder.addABI(ERC20)

import TxApproveItemLeft from './txApproveItemLeft'
import TxApproveItemRight from './txApproveItemright'

interface Props {
  txApprove: TxtxSignHistory | TxApprove | undefined
  issignHIstory?: boolean
}

const TxApproveItem: FC<Props> = ({ txApprove, issignHIstory = false }) => {
  const { library } = useWeb3React()
  const [actives, setActives] = useState<{
    [key: string]: boolean
  }>({})

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
  //const [refreshInterval, setRefreshInterval] = useState<number>(1000 * 15)
  const [refreshInterval] = useState<number>(1000 * 15)
  const txStatus = useTxStatusByKeyId(txApprove?.Key_id, refreshInterval)

  const [txnonce, setTxnonce] = useState<{ nonce: number | undefined; logo: string }>()

  const [txSendName, setTxSendName] = useState<string>('')

  const decodeTXname = useMemo(() => {
    if (txApprove == undefined) {
      return
    }
    const txList = formatTxApprove(txApprove.Msg_context)
    if (txList.length == 0) {
      return
    }
    const tx = txList[0]
    if (tx.data === '0x') {
      return 'send'
    }
    try {
      const decodedData = abiDecoder.decodeMethod(tx.data)
      if (decodedData == undefined) {
        return
      }
      const name = decodedData.name as string
      if (['transfer', 'transferFrom'].includes(name)) {
        return 'send'
      }
      return name
    } catch (error) {
      return 'use contracts'
    }
  }, [txApprove])

  useEffect(() => {
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

    setTxnonce({ nonce: tx.nonce, logo: txChainInfo.logoUrl })
    if (decodeTXname == undefined) {
      return
    }

    setTxSendName(decodeTXname)
  }, [txApprove, library, decodeTXname])

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
                <div className=" w-full sm:w-1/5  inline-flex  items-center   ">
                  {/* <ArrowUpRightIcon className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4 inline-block"></ArrowUpRightIcon> */}
                  <When condition={txnonce !== undefined}>
                    <span className=" h-6 w-6 p-1">
                      <img width={24} src={txnonce?.logo}></img>
                    </span>
                    <span className="p-1 flex-1">{txnonce?.nonce}</span>
                    <span className="p-1">{txSendName}</span>
                  </When>
                </div>
                <div className=" w-full sm:w-1/5 ">{dayjs(Number(item.Timestamp || (item as TxtxSignHistory).Local_timestamp)).fromNow()}</div>
                <div className=" w-full sm:w-1/5 break-words">
                  {txList.map(tx => {
                    return tx.originValue + ' ' + tx.name + ' '
                  })}{' '}
                  {/* {txAmount} {txTokenAmount} */}
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
                  <TxApproveItemLeft txList={txList} item={item}></TxApproveItemLeft>
                  <TxApproveItemRight item={item} issignHIstory={issignHIstory}></TxApproveItemRight>
                </div>
              </When>
            </div>
          )
        })}
    </div>
  )
}

export default React.memo(TxApproveItem)
