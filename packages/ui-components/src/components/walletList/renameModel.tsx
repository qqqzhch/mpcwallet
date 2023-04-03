import { FC, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { useUserStore } from '../..'
import { useToasts } from 'react-toast-notifications'

type Props = {
  isOpen: boolean
  closeModal: () => void
  address: string | undefined
}
type formData = {
  address: string
  name: string
}
const RenameModel: FC<Props> = ({ isOpen, closeModal, address }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<formData>()
  const addressName = useUserStore(state => state.getAddressName(address))
  const setAddressName = useUserStore(state => state.setAddressName)
  const { addToast } = useToasts()

  const onSubmit = (data: formData) => {
    if (address !== undefined) {
      setAddressName(address, data.name)
      addToast('Editing success', { appearance: 'success' })
      closeModal()
    }
  }
  useEffect(() => {
    if (address !== undefined) {
      setValue('name', addressName)
      setValue('address', address)
    }
  }, [addressName, setValue, address])

  return (
    <div>
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
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Edit entry
                  </Dialog.Title>
                  <div className="mt-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vault Address</label>
                        <input
                          readOnly
                          disabled
                          {...register('address')}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        ></input>
                      </div>
                      <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vault Name</label>
                        <input
                          {...register('name', { required: true, maxLength: 20 })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        ></input>
                        <div className=" text-red-500">
                          {errors.name && errors.name.type === 'required' && <span>This is required</span>}
                          {errors.name && errors.name.type === 'maxLength' && <span>Max length exceeded</span>}
                        </div>
                      </div>

                      <div className="flex flex-row">
                        <button
                          type="submit"
                          className="text-white flex-1  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default RenameModel
