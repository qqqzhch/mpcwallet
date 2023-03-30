import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import Account from './views/account'
import App from './App'
import ErrorPage from './views/errorpage'
import Home from './views/Home'
import NoMatch from './views/noMatch'

import CreatWallet from './views/createwallet'
import Preview from './views/createwallet/preview'
// import WalletApprove from './views/approve/walletApprove'
// import { ProtectedRoute } from '@monorepo/ui-components'
import ApproveState from './views/createwallet/approveState'
import Dashboard from './views/dashboard'
import WalletHome from './views/dashboard/walletHome'
import Assets from './views/dashboard/assets'
import Transactions from './views/dashboard/transactions'
import Txbuild from './views/dashboard/txbuilder'
import TxInfo from './views/dashboard/transactions/txInfo'
import Settings from './views/dashboard/settings'
import Setup from '@monorepo/ui-components/src/components/setting/setup'
import Environment from '@monorepo/ui-components/src/components/setting/environment'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route path="" element={<Home />} />
      {/* <Route
        path="login"
        element={
          <HaveloginRoute>
            <Login />
          </HaveloginRoute>
        }
      /> */}
      <Route path="account" element={<Account />} />
      <Route path="creatwallet" element={<CreatWallet />} />
      <Route path="preview" element={<Preview />} />
      {/* <Route
        path="walletApprove"
        element={
          <ProtectedRoute>
            <WalletApprove />
          </ProtectedRoute>
        }
      /> */}
      <Route path="walletApproveState" element={<ApproveState />} />
      <Route path="dashboard/:chainType/:address" element={<Dashboard></Dashboard>}>
        <Route path="" element={<WalletHome></WalletHome>}></Route>
        <Route path="assets" element={<Assets></Assets>}></Route>
        <Route path="transactions" element={<Transactions></Transactions>}></Route>
        <Route path="txbuild" element={<Txbuild></Txbuild>}></Route>
        <Route path="txinfo/:keyid" element={<TxInfo></TxInfo>}></Route>
        <Route path="settings" element={<Settings></Settings>}>
          <Route path="" element={<Setup></Setup>}></Route>
          <Route path="environment" element={<Environment></Environment>}></Route>
        </Route>
      </Route>

      <Route path="*" element={<NoMatch />} />
    </Route>
  )
)
const Routes = () => {
  return <RouterProvider router={router} />
}

export default Routes
