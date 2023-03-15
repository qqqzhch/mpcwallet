import { FC, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm, SubmitHandler } from 'react-hook-form'

type Props = {
  isOpen: boolean
  closeModal: (data: { gasLimit?: string; gasPrise?: string }) => void
}

type Inputs = {
  gasPrise: string
  gasPriseRequired: string
  gasLimit: string
  gasLimitRequired: string
}

const GsaModel: FC<Props> = ({ isOpen, closeModal }) => {
  const { register, handleSubmit, reset } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = data => {
    const { gasLimit, gasPrise } = data

    closeModal({ gasLimit, gasPrise })
    reset()
  }

  function close() {
    reset()
    closeModal({})
  }

  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative  z-50" onClose={close}>
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
                    gas
                  </Dialog.Title>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        <div className="mb-6">
                          <label htmlFor="gaslimit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Gas limit{' '}
                          </label>
                          <input
                            type="number"
                            id="gaslimit"
                            {...register('gasLimit', { required: true, min: 1 })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                        </div>
                        <div className="mb-6">
                          <label htmlFor="gasprise" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Gas Prise{' '}
                          </label>
                          <input
                            type="number"
                            id="gasprise"
                            {...register('gasPrise', { required: true, min: 1 })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                        </div>
                      </p>
                    </div>

                    <div className="mt-4">
                      <div className="mb-6 flex flex-col sm:flex-row justify-between gap-8">
                        <button
                          onClick={close}
                          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 "
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default GsaModel
