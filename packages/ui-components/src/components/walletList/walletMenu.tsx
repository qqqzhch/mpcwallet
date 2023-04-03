import { FC } from 'react'

import { walletaccount } from '../../state/walletaccount'
// import { Fragment } from 'react'
import Avvvatars from 'avvvatars-react'
import { Squares2X2Icon } from '@heroicons/react/20/solid'
import { When } from 'react-if'
import { useWeb3React } from '@web3-react/core'
// import { Transition } from '@headlessui/react'
import { useAppStore } from '../../state/index'

import { useNavigate, Link } from 'react-router-dom'
import { cutOut } from '../../utils/index'
import { useUserStore } from '../..'

const WalletMenu: FC = props => {
  // const { data: walletAccounts, isLoading } = useAccounts()
  const { account } = useWeb3React()
  // const [showwalletMobile, setshowwalletMobile] = useState<boolean>(false)
  const navigate = useNavigate()
  const walletAccounts = useAppStore(state => state.getWalletAccounts(account))
  const togglesideBar = useAppStore(state => state.togglesideBar)
  const togglesidewalletMenu = useAppStore(state => state.togglesidewalletMenu)

  const getAddressName = useUserStore(state => state.getAddressName)

  // const toggle = useCallback(() => {
  //   setshowwalletMobile(!showwalletMobile)
  // }, [setshowwalletMobile, showwalletMobile])

  return (
    <div className="fixed flex flex-col z-40 top-14 left-0  bg-white  h-screen">
      {/* <div className=" flex-1 flex   flex-col">
        <div className="flex flex-row border-b items-center py-1 mx-2 text-center ">
          <h1 className="  border-gray-300 flex-1 ">My MPC Wallets</h1>
        </div>
          <button
            type="button"
            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            <Link to={'/creatwallet'}>Create a wallet</Link>
          </button>
        </div> */}
      <div className=" pb-4 sm:pb-8">
        <div className="flex flex-row border-b items-center py-1 mx-2  text-center ">
          <h1 className="  border-gray-300 flex-1   ">My Vaults</h1>
          <Link className="text-yellow-600" to={'/creatwallet'}>
            {' '}
            add new
          </Link>
        </div>
      </div>
      <div className="block sm:block w-64  h-5/6   overflow-x-hidden  overflow-y-auto">
        {/* <When condition={isLoading}>
          <Skeleton count={10} height={100} />
        </When> */}
        <When condition={walletAccounts.length > 0}>
          {walletAccounts.map((item: walletaccount) => {
            return (
              <div
                onClick={() => {
                  navigate(`/dashboard/evm/${item.Mpc_address}`)
                  togglesidewalletMenu()
                  togglesideBar()
                }}
                key={item.Mpc_address}
                className="flex flex-wrap  cursor-pointer"
              >
                <div className=" p-1  w-full  ">
                  <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg hover:bg-blue-200">
                    <div className="relative mr-4">
                      <Avvvatars value={item.Mpc_address} style="shape" size={40} />
                      <span className=" absolute  bg-green-200  text-[12px]  p-[3px]  rounded-xl  -top-2 left-6  ">{item.Threshold}</span>
                    </div>

                    <div className="flex-1 ">
                      <p className="text-gray-500 text-sm text-ellipsis overflow-hidden  break-words">{getAddressName(item.Mpc_address)}</p>
                      <p className="text-gray-500 text-sm  text-ellipsis overflow-hidden  break-words">{cutOut(item.Mpc_address, 6, 6)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </When>
        <When condition={walletAccounts.length == 0}>
          <div className="flex flex-col  items-center text-center">
            <span>
              <Squares2X2Icon className="h-52 w-52 text-gray-200 mt-32"></Squares2X2Icon>
            </span>
            <span className="text-gray-400 my-10 ">Create a Vault or import a Vault</span>
          </div>
        </When>
      </div>
    </div>
  )
}

export default WalletMenu
