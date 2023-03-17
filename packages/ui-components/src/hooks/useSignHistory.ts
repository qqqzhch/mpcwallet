import useSWR from 'swr'
import { useAppStore } from '../state/index'
import { web3 } from '@monorepo/api'
import { getsmpc } from '@monorepo/api/src/web3'


import { TxtxSignHistory } from '../state/txSignHistory'
import { useEffect, useState } from 'react'
import { rpclist } from '../constants/rpcConfig'
import { useParams } from 'react-router-dom'

async function fetcher(account: string | null | undefined): Promise<Array<walletaccount> | undefined> {
  if (account == null || account == undefined) {
    return
  }
  web3.setProvider(rpclist[0])

  const res = await getsmpc().getSignHistory(account)

  if (res.Status === 'Error') {
    throw new Error('get SignHistory info error ')
  }

  return res.Data
}

export default function useSignHistory() {
    const { address } = useParams<{ address: string; chainType: string }>()
  const [list, setList] = useState<Array<TxtxSignHistory>>([])

  const { data, error, isLoading } = useSWR(address ? '/smw/SignHistory' : null, () => fetcher(address), {
    refreshInterval: 1000 * 15
  })

  useEffect(() => {
    if (data == undefined) {
      return
    }
    setList(data)
  }, [data])

  return {
    data: list,
    error,
    isLoading
  }
}