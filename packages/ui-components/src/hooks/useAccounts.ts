import useSWR from 'swr'
import { useAppStore } from '../state/index'
import { web3 } from '@monorepo/api'
import { getsmpc } from '@monorepo/api/src/web3'

import { useWeb3React } from '@web3-react/core'
import { walletaccount } from '../state/walletaccount'
import { useEffect, useState } from 'react'
import { rpclist } from '../constants/rpcConfig'

async function fetcher(account: string | null | undefined): Promise<Array<walletaccount> | undefined> {
  if (account == null || account == undefined) {
    return
  }
  web3.setProvider(rpclist[0])

  const res = await getsmpc().getAccounts(account)

  if (res.Status === 'Error') {
    throw new Error('get Accounts info error ')
  }

  return res.Data
}

export default function useAccounts() {
  const { account } = useWeb3React()
  const setwalletAccounts = useAppStore(state => state.addWalletAccounts)
  const [list, setList] = useState<Array<walletaccount>>([])

  const { data, error, isLoading } = useSWR(account ? ['/smw/getAccountList',account] : null, () => fetcher(account), {
    refreshInterval: 1000 * 15
  })

  useEffect(() => {
    if (data == undefined) {
      return
    }

    setwalletAccounts(data)
    setList(data)
  }, [data, setwalletAccounts])

  return {
    data: list,
    error,
    isLoading
  }
}
