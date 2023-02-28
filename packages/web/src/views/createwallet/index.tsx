import { FC } from 'react'
import MpcType from '@monorepo/ui-components/src/components/mpctype'
import Threshold from '@monorepo/ui-components/src/components/threshold'
import { useAppStore } from '@monorepo/ui-components'
import InputeMinus from '@monorepo/ui-components/src/components/forms/index'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import { useState } from 'react'

const CreatWallet: FC = props => {
  const loginAccount = useAppStore(state => state.loginAccount)
  const createGroup = useAppStore(state => state.createGroup)
  const [walletnameerror, setwalletnameerror] = useState<string>('')
  const [keytypeerror, setkeytypeerror] = useState<string>('')
  const [adminserror, setadminserror] = useState<string>('')

  const setcreateGroupWalletName = useAppStore(state => state.setcreateGroupWalletName)
  const addcreateGroupAdmin = useAppStore(state => state.addcreateGroupAdmin)
  const editcreateGroupAdmin = useAppStore(state => state.editcreateGroupAdmin)
  const navigate = useNavigate()

  useEffect(() => {
    editcreateGroupAdmin(0, loginAccount.signEnode)
  }, [editcreateGroupAdmin, loginAccount.signEnode])

  const formvaValidation = useCallback(() => {
    if (createGroup.walletname == '') {
      setwalletnameerror('wallet name required')
      return
    }
    if (createGroup.keytype == '') {
      setkeytypeerror('keytype required')
      return
    }
    const isempty = createGroup.admins.every(item => {
      return item.address !== ''
    })
    if (isempty == false) {
      setadminserror('admin Enodesig cannot be isempty')
      return
    }
    const repeat = createGroup.admins.every(item => {
      return createGroup.admins.filter(it => item.address == it.address).length == 1
    })
    if (repeat == false) {
      setadminserror('admin Enodesig cannot be repeated')
      return
    }
    const formatcheck = createGroup.admins.every(item => {
      return item.address.startsWith('enode://') && item.address.length > 260
    })

    if (formatcheck == false) {
      setadminserror('admin Enodesig Incorrect format')
      return
    }

    navigate('/preview')
  }, [navigate, createGroup.admins, createGroup.walletname, createGroup.keytype])

  useEffect(() => {
    if (createGroup.walletname !== '') {
      setwalletnameerror('')
    }
    if (createGroup.keytype != '') {
      setkeytypeerror('')
    }
    const repeat = createGroup.admins.every(item => {
      return createGroup.admins.filter(it => item.address == it.address).length == 1
    })
    const formatcheck = createGroup.admins.every(item => {
      return item.address.startsWith('enode://') && item.address.length > 260
    })

    if (repeat == true || formatcheck) {
      setadminserror('')
    }
  }, [createGroup.admins, createGroup.walletname, createGroup.keytype])

  return (
    <div className="flex flex-col lg:flex-row  xl:mx-40 2xl:mx-80 ">
      <div className="felx flex-col w-full xl:w-2/3 p-10">
        <h1 className="font-semibold text-3xl mb-4 pb-4  border-b ">Create new Wallet</h1>
        <div className="mb-4 pb-4  border-b  px-4">
          <h3 className="font-semibold text-xl pb-4 ">Owners and confirmations</h3>
          <p>Set the owner wallets of your wallet and how many need to confirm to execute a valid transaction.</p>
        </div>
        <div className="mb-4 pb-4  border-b  px-4">
          <div className=" bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
            <div className="relative mb-4">
              <label htmlFor="walletname" className="leading-7 text-sm text-gray-600">
                Wallet Name
              </label>
              <input
                type="text"
                id="walletname"
                name="walletname"
                value={createGroup.walletname}
                onChange={e => {
                  setcreateGroupWalletName(e.target.value)
                }}
                className="w-full  rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              ></input>
              <div className="text-red-400">{walletnameerror ? walletnameerror : null}</div>
            </div>

            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">MpcType</label>
              <MpcType></MpcType>
              <div className="text-red-400">{keytypeerror ? keytypeerror : null}</div>
            </div>

            {createGroup.admins.map((item, index) => {
              return <InputeMinus key={item.key} index={index} value={item}></InputeMinus>
            })}
            <div className="text-red-400">{adminserror ? adminserror : null}</div>

            <div className="relative mb-4 py-8">
              <span onClick={addcreateGroupAdmin} className="bg-white hover:bg-gray-200 text-black font-semibold text-center py-2 px-4 rounded ">
                + add new owner
              </span>
            </div>
            <div className="flex flex-col   lg:flex-row  mb-20">
              <div className="w-2/3">
                <h2 className="font-semibold text-xl">Threshold</h2>
                <p>Any transaction requires the confirmation </p>
              </div>
              <div className="flex items-center">
                <Threshold></Threshold>
              </div>
            </div>
            <div className="flex flex-col   lg:flex-row  justify-around gap-8">
              <button
                onClick={() => {
                  formvaValidation()
                }}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Next
              </button>
              <button className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-gray-50 rounded-md">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Frequently Asked Questions</h2>

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

export default CreatWallet
