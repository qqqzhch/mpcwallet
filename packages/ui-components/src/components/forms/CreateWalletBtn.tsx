import { useCallback, useEffect, useState, FC } from 'react'
import { useAppStore } from '../../state/index'
import { useCreateGroup, useReqSmpcAddress } from '../../hooks/useSigns'

import { useToasts } from 'react-toast-notifications'
import { useNavigate } from 'react-router-dom'

const CreateWalletBtn: FC = () => {
  const createGroup = useAppStore(state => state.createGroup)
  const loginAccount = useAppStore(state => state.loginAccount)
  const setpollingPubKey = useAppStore(state => state.setpollingPubKey)
  const setcreateGroupWalletKeyID = useAppStore(state => state.setcreateGroupWalletKeyID)

  const { execute } = useCreateGroup(
    loginAccount.rpc,
    createGroup.threshold.toString() + '/' + createGroup.admins.length,
    createGroup.admins.map(item => item.address)
  )
  const [gid, setGid] = useState<string>('')
  const [uuid, setUuid] = useState<string>('')
  const [sigs, setSigs] = useState<string>('')
  const { addToast } = useToasts()
  const navigate = useNavigate()

  const { execute: reqSmpcAddr } = useReqSmpcAddress(
    loginAccount.rpc,
    gid,
    createGroup.threshold.toString() + '/' + createGroup.admins.length,
    sigs,
    createGroup.keytype,
    uuid
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
        setUuid(res.info.Uuid)
        setSigs(res.info.Sigs)
      }
    }
    run()
  }, [execute, addToast])

  useEffect(() => {
    const run = async () => {
      if (gid != '' && uuid !== '' && reqSmpcAddr) {
        const res = await reqSmpcAddr()

        if (res.msg == 'Error') {
          addToast(res.error, { appearance: 'error' })
          return
        }
        if (res.msg === 'Success') {
          const keyid = res.info
          setcreateGroupWalletKeyID(keyid)
          addToast('Created successfully', { appearance: 'success' })
          //use res.info and getReqAddrStatus to get adress status
          const newPollingPubKeyItem = {
            fn: 'getReqAddrStatus',
            params: [keyid],
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
  }, [gid, reqSmpcAddr, addToast, setpollingPubKey, createGroup, navigate, uuid, sigs, setcreateGroupWalletKeyID])

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
