import { FC, useCallback, useState } from 'react'
import useAccounts from '../../hooks/useAccounts'
import { walletaccount } from '../../state/walletaccount'
// import { Fragment } from 'react'
import Avvvatars from 'avvvatars-react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'
import { When } from 'react-if'
// import { Transition } from '@headlessui/react'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useNavigate } from 'react-router-dom'


const WalletList: FC = props => {
  const { data: walletAccounts,isLoading } = useAccounts()
  const [showwalletMobile, setshowwalletMobile] = useState<boolean>(false)
  const navigate = useNavigate();

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
        <When condition={isLoading}>
        <Skeleton count={10} height={100} />
        </When>
        <When condition={isLoading==false}>
        {walletAccounts.map((item: walletaccount) => {
          return (
            <div onClick={()=>{navigate(`dashboard/${item.Mpc_address}`)}} key={item.Mpc_address} className="flex flex-wrap -m-2 cursor-pointer">
              
              <div className="w-full p-4 ">
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg hover:bg-blue-200">
                  <div className="relative mr-4">
                    <Avvvatars value={item.Mpc_address} style="shape" size={50} />
                    <span className=" absolute  bg-green-200  text-[12px]  p-[3px]  rounded-xl  -top-2 left-6  ">{item.Threshold}</span>
                  </div>

                  <div className="flex-1 ">
                    <h2 className="text-gray-900 title-font font-medium">anme</h2>
                    <p className="text-gray-500  w-80 md:w-full text-ellipsis overflow-hidden">{item.Mpc_address}</p>
                  </div>
                </div>
              </div>
              
            </div>
          )
        })}
        
        </When>
        
        
      </div>
    </>
  )
}

export default WalletList
