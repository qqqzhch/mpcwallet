import { useAppStore } from '@monorepo/ui-components'
// import { useNavigate } from 'react-router-dom'
import { useCreateWalletStatus } from '@monorepo/ui-components/src/hooks/useCreateWalletStatus'

import { If, When, Then, Else } from 'react-if'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid'
// import { CopyToClipboard } from 'react-copy-to-clipboard'

import CopyAddress from '@monorepo/ui-components/src/components/mpcinfo/copyAddress'

import { Link } from 'react-router-dom'
import ScanUrl from '@monorepo/ui-components/src/components/mpcinfo/scanUrl'
import { Tooltip } from 'react-tooltip'

const ApproveState = () => {
  const createGroup = useAppStore(state => state.createGroup)
  const { data } = useCreateWalletStatus()
  return (
    <div className="flex flex-col lg:flex-row  xl:mx-40 2xl:mx-80 ">
      <div className="felx flex-col w-full xl:w-2/3 p-10 bg-white">
        <h1 className="font-semibold text-3xl mb-4 pb-4  border-b ">
          <When condition={data?.status == 0}>Waiting for the MPC network to create your Vault</When>
          <When condition={data?.status == 1}>Your Vault has been created successfully</When>
          <When condition={data?.status == 2}>Your vault has failed to be created</When>
          <When condition={data?.status == 3}>Your vault has timed out to create</When>
        </h1>
        <div className="mb-4 pb-4  border-b  px-4 ">
          <When condition={data?.status == 0}>
            <h3 className="font-semibold text-xl  bg-blue-200  py-16 text-center mb-6  ">Please do not close this page before you create the vault</h3>
          </When>
          <p>View the creation status of vault</p>
        </div>
        <div className="mb-4 pb-4  border-b  px-4">
          <div className="relative mb-4">
            <span className="leading-7 text-sm text-gray-600 inline-block w-40 ">Vault Status:</span>
            <When condition={data?.status == 0}>
              <div className="px-3 py-2  inline-block text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
                The MPC network nodes are calculating your Vault address. Please wait…
              </div>
            </When>
            <When condition={data?.status == 1}>
              success <CheckCircleIcon className="h-5 w-5 text-gray-400 inline-block text-green-500" aria-hidden="true"></CheckCircleIcon>
            </When>
            <When condition={data?.status == 2}>
              fail <XCircleIcon className="h-5 w-5 text-gray-400 inline-block text-red-500" aria-hidden="true"></XCircleIcon>
            </When>
            <When condition={data?.status == 3}>
              timeout <XCircleIcon className="h-5 w-5 text-gray-400 inline-block text-red-500" aria-hidden="true"></XCircleIcon>
            </When>
          </div>
          {/* <div className="relative mb-4">
            <span className="leading-7 text-sm text-gray-600 inline-block w-40">Mpc Type:</span>
            {createGroup.keytype}
          </div> */}
          <div className="relative mb-4 flex  flex-col">
            <span className="leading-7 text-sm text-gray-600 inline-block w-40 ">Vault address:</span>
            <Tooltip id="tooltip" />
            <If condition={data?.status == 1}>
              <Then>
                {/* <CopyToClipboard text={data?.mpcAddress ? data?.mpcAddress : ''} onCopy={() => onCopy()}> */}
                <div className=" inline-flex    break-all items-center">
                  <span>{data?.mpcAddress}</span>
                  <span className="h-6 w-6 mx-2 inline-block text-blue-500 p-1 hover:bg-blue-200 rounded">
                    <CopyAddress addr={data?.mpcAddress}></CopyAddress>
                  </span>
                  <span className="h-6 w-6 mx-2 inline-block text-blue-500 p-1 hover:bg-blue-200 rounded">
                    <ScanUrl addr={data?.mpcAddress}></ScanUrl>
                  </span>

                  {/* <ClipboardDocumentListIcon className="h-6 w-6 inline-block text-green-500"></ClipboardDocumentListIcon>
                  <div className="inline-block">
                    <Avvvatars value={data ? data.mpcAddress : ''} style="shape" size={20} />
                  </div> */}
                </div>
                {/* </CopyToClipboard> */}
              </Then>
              <Else>
                <span>waiting to be created</span>
              </Else>
            </If>
          </div>
          {data?.list.map((item, index) => {
            return (
              <div className="relative mb-4" key={item.User_account}>
                <div className="leading-7 text-sm text-gray-600  w-40">Owner address {index + 1}:</div>
                <div className="break-all ">{item.User_account}</div>
                {/* <div className="leading-7 text-sm text-gray-600  w-40">Reply status:</div>
                <div className="break-all">{item.Reply_status}</div>
                <div className="leading-7 text-sm text-gray-600  w-40">Reply time:</div>
                <div className="break-all">{dayjs(Number(item.Reply_timestamp)).format('DD/MM/YYYY:HH:MM')}</div> */}
              </div>
            )
          })}

          <div className="flex flex-col   mb-10 ">
            <div className="">
              <h2 className="">Threshold</h2>
            </div>
            <div className="flex items-center">
              {createGroup.threshold} out of {createGroup.admins.length} owners
            </div>
          </div>

          <div className="flex flex-col   lg:flex-row  mb-20">
            <div className="w-2/3">
              <h2 className="font-semibold text-xl">Attention</h2>
              <p>You can deposit assets to your Vault now. Before you send assets from the Vault, please deposit gas coin to the Vault first. </p>
            </div>
          </div>
          <div className="flex flex-col   lg:flex-row  justify-around gap-8">
            <When condition={data !== undefined && data != null}>
              <Link to={`/dashboard/evm/${data?.mpcAddress}`}>
                <button className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                  Open Vault
                </button>
              </Link>
            </When>
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

export default ApproveState
