import useSWR from 'swr'
import { useAppStore } from '../state/index'
import { getsmpc } from '@monorepo/api/src/web3'

import { useWeb3React } from '@web3-react/core'
import { walletaccount } from '../state/walletaccount'
import { useEffect, useState } from 'react'
import { rpclist } from '../constants/rpcConfig'
import { serverStatusIsSuccess } from '../utils/index'

async function fetcher(account: string | null | undefined): Promise<Array<walletaccount> | undefined> {
  if (account == null || account == undefined) {
    return
  }

  const res = await getsmpc(rpclist[0]).getAccounts(account)
  if (serverStatusIsSuccess(res)) {
    return res.Data
  } else {
    throw new Error('get Accounts info error ')
  }
}

export default function useAccounts() {
  const { account } = useWeb3React()
  const setwalletAccounts = useAppStore(state => state.addWalletAccounts)
  const [list, setList] = useState<Array<walletaccount>>([])

  const { data, error, isLoading } = useSWR(account ? ['/smw/getAccountList', account] : null, () => fetcher(account), {
    refreshInterval: 1000 * 15
  })

  useEffect(() => {
    if (data == undefined) {
      return
    }
    if (data.length > 0) {
      data.sort((pre, next) => {
        if (next !== undefined && pre !== undefined) {
          return next.Reply_timestamp - pre.Reply_timestamp
        } else {
          return 0
        }
      })
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
