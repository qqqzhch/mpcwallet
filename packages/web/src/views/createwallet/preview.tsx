import { useAppStore } from '@monorepo/ui-components'
import { useNavigate } from 'react-router-dom'
import CreateWalletBtn from '@monorepo/ui-components/src/components/forms/CreateWalletBtn'

const Preview = () => {
  const createGroup = useAppStore(state => state.createGroup)
  const navigate = useNavigate()
  return (
    <div className="flex flex-col lg:flex-row  xl:mx-40 2xl:mx-80 ">
      <div className="felx flex-col w-full xl:w-2/3 p-10 bg-white">
        <h1 className="font-semibold text-3xl mb-4 pb-4  border-b ">Review</h1>
        <div className="mb-4 pb-4  border-b  px-4">
          <p>Please review the details of your newly created Vault and sign with your connected wallet.</p>
        </div>
        <div className="mb-4 pb-4  border-b  px-4">
          <div className="relative mb-4">
            <div className="leading-7 text-sm text-gray-600 inline-block w-40 ">Wallet Name:</div>
            <div>{createGroup.walletname} </div>
          </div>
          {/* <div className="relative mb-4">
            <span className="leading-7 text-sm text-gray-600 inline-block w-40">Mpc Type:</span>
            {createGroup.keytype}
          </div> */}
          {createGroup.admins.map((item, index) => {
            return (
              <div className="relative mb-4" key={item.key}>
                <div className="leading-7 text-sm text-gray-600  w-40">Owner address {index + 1}:</div>
                <div className="break-all">{item.address}</div>
              </div>
            )
          })}

          <div className="flex flex-col  mb-20  ">
            <div className="">
              <h2 className="leading-7 text-sm text-gray-600  w-40">Threshold</h2>
            </div>
            <div className="">
              {createGroup.threshold} out of {createGroup.admins.length} owners
            </div>
          </div>
          <div className="flex  flex-col-reverse   lg:flex-row  justify-around space-y-reverse space-y-8 text-center">
            <div>
              <button
                onClick={() => {
                  navigate('/creatwallet')
                }}
                className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Previous
              </button>
            </div>
            <div>
              <CreateWalletBtn></CreateWalletBtn>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-gray-50 rounded-md">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl"> Matters needing attention</h2>

          <div className="flow-root mt-12 sm:mt-16">
            <div className="divide-y divide-gray--200 -my-9">
              <div className="py-9">
                <p className="text-xl font-semibold text-black">How to create an account?</p>
                <p className="mt-3 text-base text-gray-600">**</p>
                <p className="mt-3 text-base text-gray-600">**</p>
              </div>

              <div className="py-9">
                <p className="text-xl font-semibold text-black">What payment method do you support?</p>
                <p className="mt-3 text-base text-gray-600">**</p>
              </div>

              <div className="py-9">
                <p className="text-xl font-semibold text-black">What payment method do you support?</p>
                <p className="mt-3 text-base text-gray-600">**</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview
