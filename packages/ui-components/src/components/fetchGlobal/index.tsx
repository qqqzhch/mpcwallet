import { FC } from 'react'
import useAccounts from '../../hooks/useAccounts'
import useApprovalList from '../../hooks/useApprovalList'

const FetchDataGlobal: FC = () => {
  useAccounts()
  useApprovalList();
  return <></>
}

export default FetchDataGlobal
