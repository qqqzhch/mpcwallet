import React, { FC, useCallback } from 'react'
import { Popover } from '@headlessui/react'
import { useWeb3React } from '@web3-react/core'
import { useAppStore } from '../../state/index'
import { When } from 'react-if'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useToasts } from 'react-toast-notifications'
import { ClipboardDocumentListIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom'

type Props = {
  children?: React.ReactNode
}
const ChainList: FC<Props> = ({ children }) => {
  const { account } = useWeb3React()
  const loginAccount = useAppStore(state => state.loginAccount)
  const { addToast } = useToasts()
  const clearLoginAccount = useAppStore(state => state.clearLoginAccount)
  const navigate = useNavigate()

  const onCopy = useCallback(() => {
    addToast('Copy successful', { appearance: 'success' })
  }, [addToast])

  const onLogout = useCallback(() => {
    clearLoginAccount()
    navigate('/login')
  }, [clearLoginAccount, navigate])

  return (
    <Popover className="relative">
      <Popover.Button className="flex flex-row items-center justify-center focus:outline-none   ">{children}</Popover.Button>

      <Popover.Panel className="absolute   left-2/3  md:left-1/2 z-10 mt-4    max-w-sm -translate-x-1/2 transform px-4     sm:px-0 lg:max-w-3xl">
        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="relative grid gap-8 bg-white p-6 flex flex-col">
            <div className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
              {account?.substring(0, 15)}...{account?.substring(27, 42)}
            </div>
            <When condition={loginAccount.signEnode !== ''}>
              <div className="-m-3 break-words flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                <CopyToClipboard text={loginAccount.signEnode} onCopy={() => onCopy()}>
                  <span>
                    {loginAccount.signEnode?.substring(0, 15)}...
                    {loginAccount.signEnode?.substring(loginAccount.signEnode.length, loginAccount.signEnode.length - 15)}
                  </span>
                </CopyToClipboard>
                <ClipboardDocumentListIcon className="h-6 w-6"></ClipboardDocumentListIcon>
              </div>
              <div className="-m-3 break-words flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                <button onClick={onLogout} className="text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  log out
                </button>
              </div>
            </When>
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  )
}

export default ChainList
