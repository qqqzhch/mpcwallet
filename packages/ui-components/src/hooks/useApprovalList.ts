import useSWR from 'swr'
import { useAppStore } from '../state/index'
import { web3 } from '@monorepo/api'
import { getsmpc } from '@monorepo/api/src/web3'

import { TxApprove } from '../state/approve'
import { useEffect } from 'react'
import { rpclist } from '../constants/rpcConfig'
import { useParams } from 'react-router-dom'

async function fetcher(mpcAccount: string | null | undefined): Promise<Array<TxApprove> | undefined> {
  if (mpcAccount == null || mpcAccount == undefined) {
    return
  }
  web3.setProvider(rpclist[0])

  const result = await getsmpc().getApprovalList(mpcAccount)

  if (result.Status != 'Success') {
    throw new Error('get tx approve info error ')
  }
  return result.Data
}

export default function useApprovalList() {
  const setWalletApproveList = useAppStore(state => state.setWalletApproveList)
  const { address } = useParams<{ address: string; chainType: string }>()

  const { data, error, isLoading } = useSWR(address != null && address != undefined ? '/smpc/txApprovelist' : null, () => fetcher(address), {
    refreshInterval: 1000 * 15
  })
  useEffect(() => {
    if (data) {
      setWalletApproveList(data)
    } else {
      setWalletApproveList([])
    }
  }, [setWalletApproveList, data])

  return {
    data,
    error,
    isLoading
  }
}
