import useSWR from 'swr'
import { web3 } from '@monorepo/api'
import { getsmpc } from '@monorepo/api/src/web3'

import { TxApprove } from '../state/approve'
import { useEffect, useState } from 'react'
import { rpclist } from '../constants/rpcConfig'
import { useParams } from 'react-router-dom'
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

  const { data, error, isLoading } = useSWR(account ? '/smw/SignHistory' : null, () => fetcher(account), {
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
