import useSWR from 'swr'

import { getsmpc } from '@monorepo/api/src/web3'

import { rpclist } from '../constants/rpcConfig'

async function fetcher(KeyId: string | null | undefined): Promise<string | undefined> {
  if (KeyId == null || KeyId == undefined) {
    return
  }

  const res = await getsmpc(rpclist[0]).getTxStatusByKeyId(KeyId)

  if (res.Status === 'Error') {
    throw new Error('get Accounts info error ')
  }

  return res.Data.toString()
}
//0:pending , 1 SUCCESS , 2 FAIL, 3 Timeout, 4 Tx-Pending, 5 Tx-Confirmed, 6 Tx-Failed

const statusCode: { [Key: string]: string } = {
  '0': 'pending',//Request required
  '1': 'SUCCESS',
  '2': 'FAIL',
  '3': 'Timeout',
  '4': 'Tx-Pending',// Request required
  '5': 'Tx-Confirmed',
  '6': 'Tx-Failed',
  '7': 'Tx-NotValid'
}

export default function useTxStatusByKeyId(KeyId: string | undefined, refreshInterval: number) {
  const { data, error, isLoading } = useSWR(KeyId ? ['/smw/getTxStatusByKeyId', KeyId] : null, () => fetcher(KeyId), {
    refreshInterval: refreshInterval || 1000 * 15
  })

  return {
    data: {
      code: data,
      text: data != undefined ? statusCode[data] : '~'
    },
    error,
    isLoading
  }
}
