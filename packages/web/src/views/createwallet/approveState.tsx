import { useAppStore } from '@monorepo/ui-components'
// import { useNavigate } from 'react-router-dom'

const ApproveState = () => {
  const createGroup = useAppStore(state => state.createGroup)
  // const navigate = useNavigate()
  return (
    <div className="flex flex-col lg:flex-row  xl:mx-40 2xl:mx-80 ">
      <div className="felx flex-col w-full xl:w-2/3 p-10">
        <h1 className="font-semibold text-3xl mb-4 pb-4  border-b ">Your wallet has been created successfully</h1>
        <div className="mb-4 pb-4  border-b  px-4">
          <h3 className="font-semibold text-xl pb-4 ">Status</h3>
          <p>Your wallet needs approval from other participants</p>
        </div>
        <div className="mb-4 pb-4  border-b  px-4">
          <div className="relative mb-4">
            <span className="leading-7 text-sm text-gray-600 inline-block w-40 ">Wallet Name:</span>
            {createGroup.walletname}
          </div>
          <div className="relative mb-4">
            <span className="leading-7 text-sm text-gray-600 inline-block w-40 ">Wallet Address:</span>
            *******
          </div>
          <div className="relative mb-4">
            <span className="leading-7 text-sm text-gray-600 inline-block w-40">Mpc Type:</span>
            {createGroup.keytype}
          </div>
          {createGroup.admins.map((item, index) => {
            return (
              <div className="relative mb-4" key={item.key}>
                <div className="leading-7 text-sm text-gray-600  w-40">Admin Enodesig {index + 1}:</div>
                <div className="break-all">{item.address}</div>
              </div>
            )
          })}

          <div className="flex flex-col   lg:flex-row  mb-10">
            <div className="w-2/3">
              <h2 className="font-semibold text-xl">Threshold</h2>
            </div>
            <div className="flex items-center">
              {createGroup.threshold} out of {createGroup.admins.length} owner(s)
            </div>
          </div>

          <div className="flex flex-col   lg:flex-row  mb-20">
            <div className="w-2/3">
              <h2 className="font-semibold text-xl">Recharge</h2>
              <p>After approval, you can recharge your wallet</p>
            </div>
          </div>
          <div className="flex flex-col   lg:flex-row  justify-around gap-8">
            <button className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
              Open wallet
            </button>
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
                <p className="mt-3 text-base text-gray-600">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam
                  consequat sunt nostrud amet.
                </p>
                <p className="mt-3 text-base text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>

              <div className="py-9">
                <p className="text-xl font-semibold text-black">What payment method do you support?</p>
                <p className="mt-3 text-base text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam.
                </p>
              </div>

              <div className="py-9">
                <p className="text-xl font-semibold text-black">What payment method do you support?</p>
                <p className="mt-3 text-base text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApproveState
