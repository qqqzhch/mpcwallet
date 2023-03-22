import { FC } from 'react'
import { ArrowUpRightIcon, UsersIcon } from '@heroicons/react/20/solid'
import { useAppStore } from '../..'
import { formatTxApprove } from '../../utils'
import { Link, useParams } from 'react-router-dom'
import {nowThreshold} from '../../utils/index'

const TransactionQueue: FC = () => {
  const needMpcApproves = useAppStore(state => state.getTxApproveListByStatus(0))

  const { address, chainType } = useParams<{ address: string; chainType: string }>()

  return (
    <div className="flex  min-h-80 rounded bg-gray-50 flex-col  gap-6 p-8">
      <h1 className=" border-b border-blue-300 pb-4 flex  flex-row">
        <span className=" flex-1 ">Transaction queue ({needMpcApproves.length})</span>
        <span className="  text-blue-500 cursor-pointer ">more</span>
      </h1>

      <div className="flex flex-col sm:flex-row sm:flex-wrap w-full ">
        {needMpcApproves.slice(0, 3).map(item => {
          const txList = formatTxApprove(item.Msg_context)

          return (
            <div key={item.Key_id} className="p-2  w-full">
              <Link to={`/dashboard/${chainType}/${address}/txinfo/${item.Key_id}`}>
                <div className="bg-gray-100 rounded flex p-4 h-full items-center flex-row">
                  <div className="flex-1  inline-flex">
                    <ArrowUpRightIcon className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"></ArrowUpRightIcon>

                    <span className="title-font font-medium">
                      send{' '}
                      {txList.map(tx => {
                        return tx.originValue + ' ' + tx.name + ' '
                      })}{' '}
                    </span>
                  </div>
                  <div className="inline-flex">
                    <UsersIcon className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"></UsersIcon>
                    <span className="title-font font-medium">{nowThreshold(item.Threshold,item.Signed)}</span>
                  </div>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TransactionQueue
