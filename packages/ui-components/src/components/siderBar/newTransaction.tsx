import { FC, useCallback } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import SendToken from './sendToken'
import { useParams, useNavigate } from 'react-router-dom'

const NewTransaction: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isTokenOpen, setIsTokenOpen] = useState(false)
  const { address, chainType } = useParams<{ address: string; chainType: string }>()
  const navigate = useNavigate()
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function openTokenModal() {
    setIsOpen(false)
    setIsTokenOpen(true)
  }
  const pageToTxbuild = useCallback(
    function () {
      navigate(`/dashboard/${chainType}/${address}/txbuild`)
      closeModal()
    },
    [navigate, chainType, address]
  )

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full"
      >
        New transaction
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative   z-40" onClose={closeModal}>
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
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    New transaction
                  </Dialog.Title>
                  <div className="mt-2 flex flex-col m-10  space-y-4 p-10">
                    {/* <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full"
                    >
                      Send Nfts
                    </button> */}
                    <button
                      type="button"
                      onClick={openTokenModal}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full"
                    >
                      Send Tokens
                    </button>

                    <button
                      onClick={pageToTxbuild}
                      type="button"
                      className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      Contract interaction
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <SendToken
        open={isTokenOpen}
        callBack={() => {
          setIsTokenOpen(false)
        }}
      ></SendToken>
    </>
  )
}

export default NewTransaction
