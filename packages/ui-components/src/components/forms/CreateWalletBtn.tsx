import { useCallback, useEffect, useState, FC } from 'react'
import { useAppStore } from '../../state/index'
import { useCreateGroup, useReqSmpcAddress } from '../../hooks/useSigns'

import { useToasts } from 'react-toast-notifications'

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
          const newPollingPubKeyItem = {
            fn: 'getReqAddrStatus',
            params: [res.info],
            data: {
              GroupID: gid,
              ThresHold: createGroup.threshold.toString() + '/' + createGroup.admins.length
            }
          }
          setpollingPubKey(newPollingPubKeyItem)
        }
      }
    }
    run()
  }, [gid, reqSmpcAddr, addToast, setpollingPubKey, createGroup])

  return (
    <button
      onClick={() => {
        create()
      }}
      className="text-white mx-2 bg-indigo-500 border-0 py-2 px-2 lg:px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
    >
      Next
    </button>
  )
}

export default CreateWalletBtn
