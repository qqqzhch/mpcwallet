import { FC, useCallback, useState } from 'react'

import { walletaccount } from '../../state/walletaccount'
// import { Fragment } from 'react'
import Avvvatars from 'avvvatars-react'
import { ChevronDownIcon, ChevronUpIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { When } from 'react-if'
import { useWeb3React } from '@web3-react/core'
// import { Transition } from '@headlessui/react'
import { useAppStore } from '../../state/index'

import { useNavigate } from 'react-router-dom'

const WalletList: FC = props => {
  // const { data: walletAccounts, isLoading } = useAccounts()
  const { account } = useWeb3React()
  const [showwalletMobile, setshowwalletMobile] = useState<boolean>(false)
  const navigate = useNavigate()
  const walletAccounts = useAppStore(state => state.getWalletAccounts(account))

  const toggle = useCallback(() => {
    setshowwalletMobile(!showwalletMobile)
  }, [setshowwalletMobile, showwalletMobile])

  return (
    <>
      <div className="flex flex-row border-b items-center py-4 mx-2">
        <h1 className="text-2xl font-semibold  border-gray-300 flex-1 ">My MPC Wallets</h1>
        <div
          onClick={() => {
            toggle()
          }}
          className="block sm:hidden  cursor-pointer"
        >
          <When condition={showwalletMobile == false}>
            <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"></ChevronDownIcon>
          </When>
          <When condition={showwalletMobile == true}>
            <ChevronUpIcon className="h-5 w-5 text-gray-400" aria-hidden="true"></ChevronUpIcon>
          </When>
        </div>
      </div>

      <div className={showwalletMobile ? 'block sm:block' : 'hidden sm:block'}>
        {/* <When condition={isLoading}>
          <Skeleton count={10} height={100} />
        </When> */}
        <When condition={walletAccounts.length > 0}>
          {walletAccounts.map((item: walletaccount) => {
            return (
              <div
                onClick={() => {
                  navigate(`dashboard/evm/${item.Mpc_address}`)
                }}
                key={item.Mpc_address}
                className="flex flex-wrap -m-2 cursor-pointer"
              >
                <div className="w-full p-4 ">
                  <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg hover:bg-blue-200">
                    <div className="relative mr-4">
                      <Avvvatars value={item.Mpc_address} style="shape" size={50} />
                      <span className=" absolute  bg-green-200  text-[12px]  p-[3px]  rounded-xl  -top-2 left-6  ">{item.Threshold}</span>
                    </div>

                    <div className="flex-1 ">
                      <p className="text-gray-500  w-80 md:w-full text-ellipsis overflow-hidden">{item.Mpc_address}</p>
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
            <span className="text-gray-400 my-10 ">Create a wallet or import a wallet</span>
          </div>
        </When>
      </div>
    </>
  )
}

export default WalletList
