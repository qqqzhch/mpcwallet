import { useCallback, useEffect, useState, FC } from 'react'
import { useAppStore } from '../../state/index'
import { useCreateGroup, useReqSmpcAddress } from '../../hooks/useSigns'

import { useToasts } from 'react-toast-notifications'
import { useNavigate } from 'react-router-dom'
import { rpclist } from '../../constants/rpcConfig'
import loadingiImg from '../../assets/loading.svg'
import { Else, If, Then } from 'react-if'

const CreateWalletBtn: FC = () => {
  const createGroup = useAppStore(state => state.createGroup)

  const setpollingPubKey = useAppStore(state => state.setpollingPubKey)
  const setcreateGroupWalletKeyID = useAppStore(state => state.setcreateGroupWalletKeyID)

  const { execute } = useCreateGroup(
    rpclist[0],
    createGroup.threshold.toString() + '/' + createGroup.admins.length,
    createGroup.admins.map(item => item.address)
  )
  const [gid, setGid] = useState<string>('')
  const [uuid, setUuid] = useState<string>('')
  const [sigs, setSigs] = useState<string>('')
  const [btnLoading, setBtnLoading] = useState<boolean>(false)

  const { addToast } = useToasts()
  const navigate = useNavigate()

  const { execute: reqSmpcAddr } = useReqSmpcAddress(
    rpclist[0],
    gid,
    createGroup.threshold.toString() + '/' + createGroup.admins.length,
    sigs,
    createGroup.keytype,
    uuid
  )

  const create = useCallback(() => {
    const run = async () => {
      if (execute && btnLoading == false) {
        setBtnLoading(true)
        setGid('')
        setUuid('')
        setSigs('')
        const res = await execute()

        if (res.msg == 'error') {
          addToast(res.error, { appearance: 'error' })
          setBtnLoading(false)
        }
        if (res.msg === 'success') {
          setGid(res.info.Gid)
          setUuid(res.info.Uuid)
          setSigs(res.info.Sigs)
        }
      }
    }
    run()
  }, [execute, addToast, btnLoading])

  useEffect(() => {
    const run = async () => {
      if (gid != '' && uuid !== '' && reqSmpcAddr && btnLoading) {
        const res = await reqSmpcAddr()

        if (res.msg == 'error') {
          addToast(res.error, { appearance: 'error' })
        }
        if (res.msg === 'success') {
          const keyid = res.info
          setcreateGroupWalletKeyID(keyid)
          addToast('Created successfully', { appearance: 'success' })
          navigate('/walletApproveState')
        }
        setBtnLoading(false)
      }
    }
    run()
  }, [gid, reqSmpcAddr, addToast, setpollingPubKey, createGroup, navigate, uuid, sigs, setcreateGroupWalletKeyID, btnLoading])

  return (
    <button
      onClick={() => {
        create()
      }}
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      <If condition={btnLoading}>
        <Then>
          <img className="inline w-4 h-4 mr-3 text-white animate-spin" src={loadingiImg}></img>
          loading...
        </Then>
        <Else>Next</Else>
      </If>
    </button>
  )
}

export default CreateWalletBtn
