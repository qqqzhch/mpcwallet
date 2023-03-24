import { useAppStore } from '@monorepo/ui-components'
// import { useNavigate } from 'react-router-dom'
import { useCreateWalletStatus } from '@monorepo/ui-components/src/hooks/useCreateWalletStatus'
import { useCallback } from 'react'
import { When } from 'react-if'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useToasts } from 'react-toast-notifications'
import { ClipboardDocumentListIcon } from '@heroicons/react/20/solid'
import dayjs from 'dayjs'
import Avvvatars from 'avvvatars-react'
import { Link } from 'react-router-dom'

const ApproveState = () => {
  const createGroup = useAppStore(state => state.createGroup)
  const { data } = useCreateWalletStatus()

  // const navigate = useNavigate()
  const { addToast } = useToasts()

  const onCopy = useCallback(() => {
    addToast('Copy successful', { appearance: 'success' })
  }, [addToast])

  return (
    <div className="flex flex-col lg:flex-row  xl:mx-40 2xl:mx-80 ">
      <div className="felx flex-col w-full xl:w-2/3 p-10 bg-white">
        <h1 className="font-semibold text-3xl mb-4 pb-4  border-b ">Your wallet has been created successfully</h1>
        <div className="mb-4 pb-4  border-b  px-4">
          <h3 className="font-semibold text-xl pb-4 ">Status</h3>
          <p>View the creation status of wallet</p>
        </div>
        <div className="mb-4 pb-4  border-b  px-4">
          <div className="relative mb-4">
            <span className="leading-7 text-sm text-gray-600 inline-block w-40 ">Wallet Status:</span>
            <When condition={data?.status == 0}>
              <div className="px-3 py-1 w-20 inline-block text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
                pending...
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
          <div className="relative mb-4">
            <span className="leading-7 text-sm text-gray-600 inline-block w-40">Mpc Type:</span>
            {createGroup.keytype}
          </div>
          <div className="relative mb-4 flex  flex-col">
            <span className="leading-7 text-sm text-gray-600 inline-block w-40 ">Wallet Address:</span>

            <When condition={data != undefined && data.mpcAddress != undefined}>
              <CopyToClipboard text={data?.mpcAddress ? data?.mpcAddress : ''} onCopy={() => onCopy()}>
                <div className="inline-block  cursor-pointer break-all">
                  <span>{data?.mpcAddress}</span>
                  <ClipboardDocumentListIcon className="h-6 w-6 inline-block text-green-500"></ClipboardDocumentListIcon>
                  <div className="inline-block">
                    <Avvvatars value={data ? data.mpcAddress : ''} style="shape" size={20} />
                  </div>
                </div>
              </CopyToClipboard>
            </When>
          </div>
          {data?.list.map((item, index) => {
            return (
              <div className="relative mb-4" key={item.User_account}>
                <div className="leading-7 text-sm text-gray-600  w-40">User account {index + 1}:</div>
                <div className="break-all ">{item.User_account}</div>
                <div className="leading-7 text-sm text-gray-600  w-40">Reply status:</div>
                <div className="break-all">{item.Reply_status}</div>
                <div className="leading-7 text-sm text-gray-600  w-40">Reply time:</div>
                <div className="break-all">{dayjs(Number(item.Reply_timestamp)).format('DD/MM/YYYY:HH:MM')}</div>
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
            <When condition={data !== undefined && data != null}>
              <Link to={`/dashboard/evm/${data?.mpcAddress}`}>
                <button className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                  Open wallet
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
