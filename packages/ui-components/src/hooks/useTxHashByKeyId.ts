import useSWR from 'swr'
import { getsmpc } from '@monorepo/api/src/web3'

import { rpclist } from '../constants/rpcConfig'

async function fetcher(KeyId: string | null | undefined): Promise<string | undefined> {
  if (KeyId == null || KeyId == undefined) {
    return
  }

  const res = await getsmpc(rpclist[0]).getTxHashByKeyId(KeyId)

  if (res.Status.toLowerCase() === 'error') {
    throw new Error('get Accounts info error ')
  }

  return res.Data
}

export default function useTxHashByKeyId(KeyId: string | undefined) {
  const { data, error, isLoading } = useSWR(KeyId ? ['/smw/getTxHashByKeyId', KeyId] : null, () => fetcher(KeyId), {
    refreshInterval: 1000 * 15
  })

  return {
    data: data,
    error,
    isLoading
  }
}
