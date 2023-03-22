import useSWR from 'swr'
import { useAppStore } from '../state/index'
import { web3 } from '@monorepo/api'
import { getsmpc } from '@monorepo/api/src/web3'

import { TxApprove } from '../state/approve'
import { useEffect } from 'react'
import { rpclist } from '../constants/rpcConfig'
import { useWeb3React } from '@web3-react/core'
import { useParams } from 'react-router-dom'

async function fetcher(Account: string | null | undefined): Promise<Array<TxApprove> | undefined> {
  if (Account == null || Account == undefined) {
    return
  }
  
  const result = await getsmpc(rpclist[0]).getApprovalList(Account)

  if (result.Status === 'error') {
    throw new Error('get tx approve info error ')
  }
  return result.Data
}

export default function useApprovalList() {
  const setWalletApproveList = useAppStore(state => state.setWalletApproveList)
  const { account } = useWeb3React()

  const { data, error, isLoading } = useSWR(account != null && account != undefined ? '/smpc/txApprovelist' : null, () => fetcher(account), {
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
