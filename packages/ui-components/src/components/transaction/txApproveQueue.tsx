import { FC } from 'react'
import { useAppStore } from '../..'

import TxApproveItem from './txApproveItem'
import { When } from 'react-if'
import { useParams } from 'react-router-dom'

const TxApproveQueue: FC = () => {
  const { address } = useParams<{ address: string; chainType: string }>()
  const needMpcApproves = useAppStore(state => state.getTxApproveListByStatus(0, address))

  return (
    <div className="flex flex-col overflow-x-auto  text-base">
      {needMpcApproves.map(item => {
        return <TxApproveItem key={item.Key_id} txApprove={item}></TxApproveItem>
      })}
      <When condition={needMpcApproves.length == 0}>
        <div className=" text-center">This wallet has no queued transactions</div>
      </When>
    </div>
  )
}

export default TxApproveQueue
