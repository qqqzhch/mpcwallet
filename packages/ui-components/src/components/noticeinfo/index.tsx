import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { useAppStore } from '../../state'
import Txinfo from './txinfo'



export default function Noticeinfo() {
  const [isOpen, setIsOpen] = useState(true)
  const list = useAppStore((state=>state.getHistory()))

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
       <div onClick={openModal} className="relative py-2   cursor-pointer mr-4">
              <FontAwesomeIcon icon={icon({ name: 'bell', style: 'solid' })} />
              <span className="absolute  rounded-full bg-red-400 py-0 px-1.5 text-xs text-white">{list.length}</span>
        </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                   Historical records
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      
                        <dl className="max-w-md text-gray-900 divide-y  max-h-96 overflow-y-scroll divide-gray-200 dark:text-white dark:divide-gray-700">
                            {list.map((item,key)=>{
                                return (
                                    <Txinfo key={key}  Item={item}></Txinfo>
                                )
                            })}
                            
                    
                        </dl>
                    </p>
                  </div>

      
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}