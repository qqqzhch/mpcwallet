import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import Account from './views/account'
import App from './App'
import ErrorPage from './views/errorpage'
import Home from './views/Home'
import NoMatch from './views/noMatch'
import Login from './views/login'
import CreatWallet from './views/createwallet'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route path="" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="account" element={<Account />} />
      <Route path="creatwallet" element={<CreatWallet />} />
      <Route path="*" element={<NoMatch />} />
    </Route>
  )
)
const Routes = () => {
  return <RouterProvider router={router} />
}

export default Routes
