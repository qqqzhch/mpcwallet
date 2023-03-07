import React, { FC, useCallback, useEffect, useState } from 'react'
import { Popover } from '@headlessui/react'
import { useWeb3React } from '@web3-react/core'
import { useAppStore, loginAccount } from '../../state/index'

import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useToasts } from 'react-toast-notifications'
import { ClipboardDocumentIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom'
import { cutOut } from '../../utils/index'

type Props = {
  children?: React.ReactNode
}
const AccountInfo: FC<Props> = ({ children }) => {
  const [userAccount, setUserAccount] = useState<loginAccount>()
  const { account, deactivate } = useWeb3React()
  const loginAccount = useAppStore(state => state.getLoginAccount(account))

  const { addToast } = useToasts()
  const clearLoginAccount = useAppStore(state => state.clearLoginAccount)
  const navigate = useNavigate()

  const onCopy = useCallback(() => {
    addToast('Copy successful', { appearance: 'success' })
  }, [addToast])

  useEffect(() => {
    if (loginAccount) {
      setUserAccount(loginAccount)
    }
  }, [account, setUserAccount, loginAccount])

  const onLogout = useCallback(() => {
    localStorage.setItem('walletIsConnectedTo', '')
    deactivate()
    clearLoginAccount(account)
    navigate('/')
  }, [clearLoginAccount, navigate, deactivate, account])

  return (
    <Popover className="relative">
      <Popover.Button className="flex flex-row items-center justify-center focus:outline-none   ">{children}</Popover.Button>

      <Popover.Panel className="absolute   left-2/3  md:left-1/2 z-10 mt-4   w-96   -translate-x-1/2 transform px-4     sm:px-0 lg:max-w-3xl">
        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="relative grid gap-8 bg-white p-6 flex flex-col">
            <div className="-m-3 w-full">Endpoint</div>
            <div className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
              {userAccount?.rpc}
            </div>
            <div className="-m-3 w-full">Address</div>
            <div className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 break-all">
              {account}
            </div>
            <div className="-m-3 w-full">Enodesig</div>
            <div className="-m-3 break-words flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
              <CopyToClipboard text={userAccount ? userAccount.signEnode : ''} onCopy={() => onCopy()}>
                <div className=" flex flex-row  cursor-pointer">
                  <span>{userAccount ? cutOut(userAccount.signEnode, 15, 15) : ''}</span>
                  <ClipboardDocumentIcon className="h-6 w-6 text-blue-700"></ClipboardDocumentIcon>
                </div>
              </CopyToClipboard>
            </div>
            <div className="-m-3 break-words flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
              <button onClick={onLogout} className="text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                log out
              </button>
            </div>
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  )
}

export default AccountInfo
