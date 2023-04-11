import { FC, useState, useCallback, useEffect } from 'react'

import { When, If, Then, Else } from 'react-if'
import Avvvatars from 'avvvatars-react'
import AddressName from '../walletList/addressName'
import { nowThreshold } from '../../utils/index'
import { TxtxSignHistory } from '../../state/txSignHistory'
import { TxApprove } from '../../state/approve'
import { cutOut } from '../../utils'
import useTxStatusByKeyId from '../../hooks/useTxStatusByKeyId'
import loadingiImg from '../../assets/loading.svg'
import { useTxApproveAccept } from '../../hooks/useSigns'
import { rpclist } from '../../constants/rpcConfig'
import { useWeb3React } from '@web3-react/core'
import { useParams } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import useMpcAddressDetail from '../../hooks/useMpcAddressDetail'
import useApprovalListByKeyId from '../../hooks/useApprovalListByKeyId'

function checkThreshold(str: string) {
  const list = str.split('/')
  if (list[0] === list[1]) {
    return true
  } else {
    return false
  }
}
type mpcOwnerStatusType = {
  address: string
  reply_status?: string
  signed?: number
  status?: number
}

type Props = {
  item: TxtxSignHistory | TxApprove
  issignHIstory: boolean
}
const TxApproveItemRight: FC<Props> = ({ item, issignHIstory }) => {
  const [ownerStatusList, setOwnerStatusList] = useState<mpcOwnerStatusType[]>()
  const txStatus = useTxStatusByKeyId(item?.Key_id, 1000 * 15)
  const [showBtn, setShowBtn] = useState<boolean>(!issignHIstory)
  const [btnLoading, setBtnLoading] = useState<boolean>(false)
  const { execute } = useTxApproveAccept(rpclist[0])
  const { chainType } = useParams<{ address: string; chainType: string }>()
  const { chainId } = useWeb3React()
  const { addToast } = useToasts()
  const { data: ownerAccountInfo } = useMpcAddressDetail()
  const { data: ApprovalListByKeyIds } = useApprovalListByKeyId(item?.Key_id)

  const Agree = useCallback(
    async (nameType: string) => {
      const txApprove = item
      if (execute != undefined && chainType != undefined && txApprove != undefined && chainId != undefined) {
        setBtnLoading(true)
        const result = await execute(txApprove.Key_id, chainType, txApprove?.Msg_hash, txApprove?.Msg_context, nameType, chainId)

        //"Status": "success",
        if (result.msg == 'success') {
          addToast(nameType + ' Operation succeeded', { appearance: 'success' })
          setShowBtn(false)
        } else {
          addToast(result.error, { appearance: 'error' })
        }
        setBtnLoading(false)
      }
    },
    [execute, chainType, item, addToast, chainId]
  )

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
        const reply_status = status ? (status.Reply_status == '' ? 'pending' : status.Reply_status.toLowerCase()) : undefined
        list.push({
          address: item.User_account,
          reply_status: reply_status == 'timeout' ? 'not participate' : reply_status,
          signed: status ? status.Signed : undefined,
          status: status ? status.Status : undefined
        })
      })
      setOwnerStatusList(list)
    }
  }, [ownerAccountInfo, ApprovalListByKeyIds])

  return (
    <div className=" w-full sm:w-1/3 flex flex-col p-8 gap-4">
      <div className="lg:w-2/5 md:w-1/2 ">
        <div className="flex relative pb-2">
          <div className="h-full w-8 absolute inset-0 flex items-center justify-center">
            <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
          </div>
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">+</div>
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
              Signing...
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
      <When condition={showBtn == false && txStatus && txStatus.data.code !== undefined && ['5', '6', '7', '3'].includes(txStatus.data.code) == false}>
        <div className="flex items-center justify-center   bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          <div className="w-full py-2.5 px-5 text-sm font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
            In process...
          </div>
        </div>
      </When>
    </div>
  )
}

export default TxApproveItemRight
