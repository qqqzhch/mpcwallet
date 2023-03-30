import useSWR from 'swr'

import { getsmpc } from '@monorepo/api/src/web3'

import { useParams } from 'react-router-dom'
import { walletaccount } from '../state/walletaccount'

import { rpclist } from '../constants/rpcConfig'
import { serverStatusIsSuccess } from '../utils/index'

async function fetcher(account: string | null | undefined): Promise<Array<walletaccount> | undefined> {
  if (account == null || account == undefined) {
    return
  }

  const res = await getsmpc(rpclist[0]).getMpcAddressDetail(account)
  if (serverStatusIsSuccess(res)) {
    return res.Data
  } else {
    throw new Error('get Accounts info error ')
  }
}

export default function useMpcAddressDetail() {
  const { address } = useParams<{ address: string; chainType: string }>()
  const { data, error, isLoading } = useSWR(address ? ['/smw/smw_getMpcAddressDetail', address] : null, () => fetcher(address), {
    refreshInterval: 1000 * 15
  })

  return {
    data: data,
    error,
    isLoading
  }
}
