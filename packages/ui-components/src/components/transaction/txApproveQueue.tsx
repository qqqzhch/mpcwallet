import { FC } from 'react'
import { useAppStore } from '../..'

import TxApproveItem from './txApproveItem'
import { When } from 'react-if'

const TxApproveQueue: FC = () => {
  const needMpcApproves = useAppStore(state => state.getTxApproveListByStatus(0))

  return (
    <div className="flex flex-col overflow-x-auto  text-base p-2">
      {needMpcApproves.map(item => {
        return <TxApproveItem key={item.Key_id} txApprove={item}></TxApproveItem>
      })}
      <When condition={needMpcApproves.length==0}>
        <div className=' text-center'>
          No tx need to approve
        </div>

      </When>

    </div>
  )
}

export default TxApproveQueue
