import React, { FC } from 'react'
import { Popover } from '@headlessui/react'

import { useAppStore } from '../../state/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

import { When } from 'react-if'
import { Link, useParams } from 'react-router-dom'

type Props = {
  children?: React.ReactNode
}

const NoticeInfo: FC<Props> = ({ children }) => {
  // const Navigate = useNavigate()
  const txApproveWallet = useAppStore(state => state.getTxApproveGroupByaccountByStatus(0))
  const txApproveList = useAppStore(state => state.getTxApproveListByStatus(0))
  const { chainType } = useParams<{ address: string; chainType: string }>()

  return (
    <Popover className="relative">
      <Popover.Button className="flex flex-row items-center justify-center focus:outline-none   ">
        <div className="relative py-2   cursor-pointer mr-4">
          <FontAwesomeIcon icon={icon({ name: 'bell', style: 'solid' })} />
          <When condition={txApproveList.length > 0}>
            <span className="absolute  rounded-full bg-red-400 py-0 px-1.5 text-xs text-white">{txApproveList.length}</span>
          </When>
        </div>
      </Popover.Button>

      <Popover.Panel className="absolute   left-28 md:left-1/2 z-10 mt-3  w-screen  max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-1xl">
        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="relative  bg-white p-7 flex flex-col gap-8">
            {txApproveWallet.map((item, index) => {
              return (
                <div
                  key={index}
                  className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 cursor-pointer"
                >
                  <div className="ml-4">
                    <Link to={`/dashboard/${chainType}/${item.mpcAddress}/transactions`}>
                      <p className="text-sm font-medium text-gray-900">Transactions Approval {item.count}</p>
                      <p className="text-sm text-gray-500">Authorization to send transactions</p>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  )
}

export default NoticeInfo
