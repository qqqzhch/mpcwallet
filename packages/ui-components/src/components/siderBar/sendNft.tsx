import { FC, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Avvvatars from 'avvvatars-react'

const SendNft: FC<{ open?: boolean; callBack: () => void }> = ({ open, callBack }) => {
  const [isTokenOpen, setIsTokenOpen] = useState(open || false)

  function closeTokenModal() {
    setIsTokenOpen(false)
    if (callBack) {
      callBack()
    }
  }
  useEffect(() => {
    if (open != undefined) {
      setIsTokenOpen(open)
    }
  }, [open])
  return (
    <>
      <Transition appear show={isTokenOpen} as={Fragment}>
        <Dialog as="div" className="relative   z-40" onClose={closeTokenModal}>
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
                    Send NFT
                  </Dialog.Title>
                  <div className="mt-4 flex flex-col   space-y-1 ">
                    <div className="mb-6">
                      <label htmlFor="sendingfrom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Sending from{' '}
                      </label>
                      <div className="flex flex-row ">
                        <Avvvatars value={'0x12CF5132064Ee45AcD4843E8C9D7Ae5e3852Aaab'} style="shape" size={40} />
                        <div className="break-all pl-2">0x12CF5132064Ee45AcD4843E8C9D7Ae5e3852Aaab</div>
                      </div>
                    </div>
                    <div className="mb-2">
                      <label htmlFor="assert" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Token Name: artblock
                      </label>
                    </div>
                    <div className="mb-2">
                      <label htmlFor="assert" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Token ID: 123
                      </label>
                    </div>
                    <div className="mb-2">
                      <label htmlFor="assert" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Token Image{' '}
                      </label>
                      <img
                        width={100}
                        src="https://i.seadn.io/gae/GQYM6Cy8UjIdrd9K_ZOlN1nAmdl7T7s-BxTSrOetVwOBZlh0OS9ZH_3cq-RbPj9ogq3-srOkrb-kuebNDQmYLeuh-cb_Nt-f1MxAfg?auto=format&w=256"
                      ></img>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="recipientAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Recipient address{' '}
                      </label>
                      <input
                        type="text"
                        id="recipientAddress"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>

                    <div className="mb-6 flex flex-col sm:flex-row justify-between  space-y-8">
                      <button className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 "
                      >
                        next
                      </button>
                    </div>
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

export default SendNft
