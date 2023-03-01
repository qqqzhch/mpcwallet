import { useCallback, useEffect, useState, FC } from 'react'
import { useAppStore } from '../../state/index'
import { useCreateGroup, useReqSmpcAddress } from '../../hooks/useSigns'

import { useToasts } from 'react-toast-notifications'
import { useNavigate } from 'react-router-dom'

const CreateWalletBtn: FC = () => {
  const createGroup = useAppStore(state => state.createGroup)
  const loginAccount = useAppStore(state => state.loginAccount)
  const setpollingPubKey = useAppStore(state => state.setpollingPubKey)
  const { execute } = useCreateGroup(
    loginAccount.rpc,
    createGroup.threshold.toString() + '/' + createGroup.admins.length,
    createGroup.admins.map(item => item.address)
  )
  const [gid, setGid] = useState<string>('')
  const { addToast } = useToasts()
  const navigate = useNavigate()

  const { execute: reqSmpcAddr } = useReqSmpcAddress(
    loginAccount.rpc,
    gid,
    createGroup.threshold.toString() + '/' + createGroup.admins.length,
    createGroup.admins.map(item => item.address).join('|'),
    createGroup.keytype
  )

  const create = useCallback(() => {
    const run = async () => {
      const res = await execute()

      if (res.msg == 'Error') {
        addToast(res.error, { appearance: 'error' })
        return
      }
      if (res.msg === 'Success') {
        setGid(res.info.Gid)
      }
    }
    run()
  }, [execute, addToast])

  useEffect(() => {
    const run = async () => {
      if (gid != '' && reqSmpcAddr) {
        const res = await reqSmpcAddr()
        if (res.msg == 'Error') {
          addToast(res.error, { appearance: 'error' })
          return
        }
        if (res.msg === 'Success') {
          addToast('Created successfully', { appearance: 'success' })
          const newPollingPubKeyItem = {
            fn: 'getReqAddrStatus',
            params: [res.info],
            data: {
              GroupID: gid,
              ThresHold: createGroup.threshold.toString() + '/' + createGroup.admins.length
            }
          }
          setpollingPubKey(newPollingPubKeyItem)
          navigate('/walletApproveState')
        }
      }
    }
    run()
  }, [gid, reqSmpcAddr, addToast, setpollingPubKey, createGroup, navigate])

  return (
    <button
      onClick={() => {
        create()
      }}
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      Next
    </button>
  )
}

export default CreateWalletBtn
