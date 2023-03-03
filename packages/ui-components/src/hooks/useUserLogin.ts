import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { rpclist } from '../constants/rpcConfig'
import { web3 } from '@monorepo/api'
import { getsmpc } from '@monorepo/api/src/web3'
import { useAppStore } from '../state/index'
import { useToasts } from 'react-toast-notifications'
import { useSignEnode } from './useSigns'

export default function useUserLogin() {
  const { account } = useWeb3React()
  const [selected] = useState<string>(rpclist[0])
  const setLoginAccount = useAppStore(state => state.setLoginAccount)
  const { addToast } = useToasts()
  const loginAccount = useAppStore(state => state.loginAccount)
  const { execute } = useSignEnode(loginAccount.enode)
  const clearLoginAccount = useAppStore(state => state.clearLoginAccount)
  useEffect(() => {
    const run = async () => {
      if (selected == undefined || account == undefined || account == null || loginAccount.enode !== '') {
        return
      }
      clearLoginAccount()
      web3.setProvider(selected)
      try {
        const res = await getsmpc().getEnode()
        setLoginAccount(selected, res.Data.Enode, account)
      } catch (error: unknown) {
        const err = error as Error
        addToast(err.message, { appearance: 'error' })
      }
    }
    if (selected) {
      run()
    }
  }, [selected, setLoginAccount, addToast, account, clearLoginAccount, loginAccount.enode])
  useEffect(() => {
    const run = async () => {
      if (loginAccount.signEnode) {
        return
      }
      if (loginAccount.enode != '' && loginAccount.rpc != '' && account) {
        try {
          const signEnode = await execute()
          setLoginAccount(loginAccount.rpc, loginAccount.enode, account, loginAccount.enode + signEnode)
        } catch (error: unknown) {
          const err = error as Error
          addToast(err.message, { appearance: 'error' })
        }
      }
    }
    run()
  }, [execute, loginAccount.rpc, loginAccount.enode, account, addToast, setLoginAccount, loginAccount.signEnode])
}
