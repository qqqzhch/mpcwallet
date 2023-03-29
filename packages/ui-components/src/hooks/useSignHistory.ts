import useSWR from 'swr'
import { web3 } from '@monorepo/api'
import { getsmpc } from '@monorepo/api/src/web3'

import { TxtxSignHistory } from '../state/txSignHistory'
import { useEffect, useState } from 'react'
import { rpclist } from '../constants/rpcConfig'
import { useWeb3React } from '@web3-react/core'
import { useParams } from 'react-router-dom'

async function fetcher(account: string | null | undefined): Promise<Array<TxtxSignHistory> | undefined> {
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
  const { account } = useWeb3React()
  const [list, setList] = useState<Array<TxtxSignHistory>>([])
  const { address: mpcaddress } = useParams<{ address: string; chainType: string }>()

  const { data, error, isLoading } = useSWR(account ? ['/smw/SignHistory', account] : null, () => fetcher(account), {
    refreshInterval: 1000 * 15
  })

  useEffect(() => {
    if (data == undefined) {
      return
    }

    const result = data
      .filter(tx => {
        return tx.Mpc_address == mpcaddress
      })
      .sort((a, b) => {
        return parseInt(b.Local_timestamp) - parseInt(a.Local_timestamp)
      })

    setList(result)
  }, [data, mpcaddress])

  return {
    data: list,
    error,
    isLoading
  }
}
