import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import Account from './views/account'
import App from './App'
import ErrorPage from './views/errorpage'
import Home from './views/Home'
import NoMatch from './views/noMatch'

import CreatWallet from './views/createwallet'
import Preview from './views/createwallet/preview'
import WalletApprove from './views/approve/walletApprove'
import { ProtectedRoute } from '@monorepo/ui-components'
import ApproveState from './views/createwallet/approveState'
import Dashboard from './views/dashboard'
import WalletHome from './views/dashboard/walletHome'
import Asserts from './views/dashboard/asserts'
import Transactions from './views/dashboard/transactions'
import Txbuild from './views/dashboard/txbuilder'

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
      <Route
        path="creatwallet"
        element={
          <ProtectedRoute>
            <CreatWallet />
          </ProtectedRoute>
        }
      />
      <Route
        path="preview"
        element={
          <ProtectedRoute>
            <Preview />
          </ProtectedRoute>
        }
      />
      <Route
        path="walletApprove"
        element={
          <ProtectedRoute>
            <WalletApprove />
          </ProtectedRoute>
        }
      />
      <Route
        path="walletApproveState"
        element={
          <ProtectedRoute>
            <ApproveState />
          </ProtectedRoute>
        }
      />
      <Route
        path="dashboard/:chainType/:address"
        element={
          <ProtectedRoute>
            <Dashboard></Dashboard>
          </ProtectedRoute>
        }
      >
        <Route
          path=""
          element={
            <ProtectedRoute>
              <WalletHome></WalletHome>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="asserts"
          element={
            <ProtectedRoute>
              <Asserts></Asserts>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="transactions"
          element={
            <ProtectedRoute>
              <Transactions></Transactions>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="txbuild"
          element={
            <ProtectedRoute>
              <Txbuild></Txbuild>
            </ProtectedRoute>
          }
        ></Route>
      </Route>

      <Route path="*" element={<NoMatch />} />
    </Route>
  )
)
const Routes = () => {
  return <RouterProvider router={router} />
}

export default Routes
