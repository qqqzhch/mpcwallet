import useSWR from 'swr'
import { web3 } from '@monorepo/api'
import { getsmpc } from '@monorepo/api/src/web3'

import { TxApprove } from '../state/approve'
import { useEffect, useState } from 'react'
import { rpclist } from '../constants/rpcConfig'
import { useWeb3React } from '@web3-react/core'

async function fetcher(account: string | null | undefined): Promise<Array<TxApprove> | undefined> {
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
  const [list, setList] = useState<Array<TxApprove>>([])

  const { data, error, isLoading } = useSWR(account ? ['/smw/SignHistory', account] : null, () => fetcher(account), {
    refreshInterval: 1000 * 15
  })

  useEffect(() => {
    if (data == undefined) {
      return
    }
    data.sort((a, b) => {
      if (b.Reply_timestamp !== undefined && a.Reply_timestamp !== undefined) {
        return parseInt(b.Reply_timestamp || '943891200') - parseInt(a.Reply_timestamp || '943891200')
      } else {
        return 0
      }
    })
    setList(data)
  }, [data])

  return {
    data: list,
    error,
    isLoading
  }
}
