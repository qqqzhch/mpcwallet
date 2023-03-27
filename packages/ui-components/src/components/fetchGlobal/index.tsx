import { FC, useEffect } from 'react'
import useAccounts from '../../hooks/useAccounts'
import useApprovalList from '../../hooks/useApprovalList'
import { useToasts } from 'react-toast-notifications'
const FetchDataGlobal: FC = () => {
  const { error: error1 } = useAccounts()
  const { error: error2 } = useApprovalList()
  const { addToast } = useToasts()

  useEffect(() => {
    if (error1) {
      addToast(error1.message, { appearance: 'error' })
    }
    // if (error2) {
    //   addToast(error2.message, { appearance: 'error' })
    // }
  }, [error1, error2, addToast])

  return <></>
}

export default FetchDataGlobal
