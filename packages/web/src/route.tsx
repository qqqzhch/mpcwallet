import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import Account from './views/account'
import App from './App'
import ErrorPage from './views/errorpage'
import Home from './views/Home'
import NoMatch from './views/noMatch'
import Login from './views/login'
import CreatWallet from './views/createwallet'
import Preview from './views/createwallet/preview'
import WalletApprove from './views/approve/walletApprove'
import { ProtectedRoute, HaveloginRoute } from '@monorepo/ui-components'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route path="" element={<Home />} />
      <Route
        path="login"
        element={
          <HaveloginRoute>
            <Login />
          </HaveloginRoute>
        }
      />
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
      <Route path="*" element={<NoMatch />} />
    </Route>
  )
)
const Routes = () => {
  return <RouterProvider router={router} />
}

export default Routes
