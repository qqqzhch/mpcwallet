import { When } from 'react-if'
import useSignHistory from '../../hooks/useSignHistory'
import TxApproveItem from './txApproveItem'
import Skeleton from 'react-loading-skeleton'
const SignHistory = () => {
  const { data, isLoading } = useSignHistory()
  return (
    <>
      <When condition={isLoading == false}>
        {data.map(item => {
          return <TxApproveItem key={item.Key_id} txApprove={item}></TxApproveItem>
        })}
      </When>
      <When condition={isLoading == true}>
        <Skeleton count={10} height={100} />
      </When>
    </>
  )
}

export default SignHistory
