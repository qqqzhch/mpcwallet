import { Navigate } from 'react-router-dom'
import { useAppStore } from '../state/index'
import { useWeb3React } from '@web3-react/core'

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return children
}

export const HaveloginRoute = ({ children }: { children: JSX.Element }) => {
  const { account } = useWeb3React()
  const loginAccount = useAppStore(state => state.getLoginAccount(account))
  if (account != undefined && loginAccount?.signEnode != '') {
    return <Navigate to="/creatwallet" replace />
  } else {
    return children
  }
}

//   export {ProtectedRoute,LaveloginRoute}
