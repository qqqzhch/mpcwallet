import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { useAppStore } from '../..'
import { When } from 'react-if'
import TxApproveItem from './txApproveItem'

const TxApproveDetails: FC = () => {
  const { keyid } = useParams<{ address: string; chainType: string; keyid: string }>()
  const txApprove = useAppStore(state => state.getTxApproveByKeyID(keyid))

  return (
    <div>
      <When condition={txApprove !== undefined}>
        <TxApproveItem txApprove={txApprove}></TxApproveItem>
      </When>
    </div>
  )
}

export default TxApproveDetails
