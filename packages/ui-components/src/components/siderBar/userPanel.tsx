import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { cutOut } from '../../utils'
// import { When } from 'react-if'

import NewTransaction from './newTransaction'

// import { SquaresPlusIcon, Bars3Icon } from '@heroicons/react/20/solid'
import { Bars3Icon } from '@heroicons/react/20/solid'

import MpcAvvvatar from '../mpcAvvvatar'
import CopyAddress from '../mpcinfo/copyAddress'

import { useWeb3React } from '@web3-react/core'

import { formatUnits } from '../../utils'
import ScanUrl from '../mpcinfo/scanUrl'
import { useAppStore } from '../..'
import useNativeBalance from '../../hooks/useNativeBalance'
import { Tooltip } from 'react-tooltip'
import { ProtectedButton } from '@monorepo/ui-components'

import { useUserStore } from '../..'

const UserPanel: FC = () => {
  const { address } = useParams<{ address: string; chainType: string }>()

  const { chainId } = useWeb3React()
  const togglesidewalletMenu = useAppStore(state => state.togglesidewalletMenu)
  const togglesideBar = useAppStore(state => state.togglesideBar)
  const showsideBar = useAppStore(state => state.sideBar)
  const nativeBalance = useNativeBalance(address)

  const getAddressName = useUserStore(state => state.getAddressName)

  return (
    <>
      <div className="flex items-center pl-2.5 mb-5 flex-row " title={address}>
        <div className=" w-12 ">
          {/* <Avvvatars value={address ? address : ''} style="shape" size={40} /> */}
          <MpcAvvvatar address={address} chainid={chainId}></MpcAvvvatar>
        </div>
        <div className=" flex-1  flex flex-col text-sm">
          <div className=" break-all  ">{getAddressName(address)}</div>
          <div className=" break-all ">{address ? cutOut(address, 8, 8) : ''}</div>
          <div>{formatUnits(chainId, nativeBalance.balance)}</div>
        </div>
      </div>
      <div className="pl-2.5 mb-5 flex flex-row justify-between ">
        <Tooltip id="tooltip"></Tooltip>
        {/* <button
          type="button"
          data-tooltip-id="tooltip"
          data-tooltip-content="Hello world!"
          data-tooltip-place="left"
          className="text-blue-700  bg-gray-200 my-anchor-element
      hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 
      font-medium rounded-lg text-sm   p-1.5 text-center inline-flex items-center mr-2"
        >
          <SquaresPlusIcon className=" h-4 w-4 "></SquaresPlusIcon> 
        </button> */}
        <button
          type="button"
          className="text-blue-700  bg-gray-200
      hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 
      font-medium rounded-lg text-sm   p-1.5 text-center inline-flex items-center mr-2"
        >
          <CopyAddress></CopyAddress>
        </button>

        <button
          type="button"
          className="text-blue-700  bg-gray-200
      hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 
      font-medium rounded-lg text-sm   p-1.5 text-center inline-flex items-center mr-2"
        >
          <ScanUrl></ScanUrl>
        </button>
        <button
          onClick={() => {
            togglesidewalletMenu()
            if (showsideBar == false) {
              togglesideBar()
            }
          }}
          type="button"
          data-tooltip-id="tooltip"
          data-tooltip-content="Open My Vaults"
          className="text-blue-700  bg-gray-200
      hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 
      font-medium rounded-lg text-sm   p-1.5 text-center inline-flex items-center mr-2"
        >
          <Bars3Icon className=" h-4 w-4 "></Bars3Icon>
        </button>
      </div>
      <div className="pl-2.5 mb-5">
        <ProtectedButton className="text-white  bg-black  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full">
          <NewTransaction></NewTransaction>
        </ProtectedButton>
      </div>
    </>
  )
}

export default UserPanel
