import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { PencilIcon, EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { walletaccount } from '../../state/walletaccount'
import RenameModel from './renameModel'

import { FC } from 'react'

const AddressMenu: FC<walletaccount> = ({ Mpc_address }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center  rounded-2xl  px-2 py-2 text-sm font-medium  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 hover:bg-blue-300">
            <EllipsisVerticalIcon className=" h-4 w-4 cursor-pointer text-blue-500 "></EllipsisVerticalIcon>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      setIsOpen(true)
                    }}
                    className={`${active ? 'bg-blue-500 text-white' : 'text-gray-900'} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? <PencilIcon className="mr-2 h-5 w-5" aria-hidden="true" /> : <PencilIcon className="mr-2 h-5 w-5" aria-hidden="true" />}
                    Rename
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <RenameModel
        isOpen={isOpen}
        closeModal={() => {
          setIsOpen(false)
        }}
        address={Mpc_address}
      ></RenameModel>
    </div>
  )
}

export default AddressMenu
