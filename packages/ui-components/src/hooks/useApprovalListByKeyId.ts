import useSWR from 'swr'
import { useAppStore } from '../state/index'
import { getsmpc } from '@monorepo/api/src/web3'

import { useWeb3React } from '@web3-react/core'
import { TxtxSignHistory } from '../state/txSignHistory'
import { useEffect, useState } from 'react'
import { rpclist } from '../constants/rpcConfig'
import { serverStatusIsSuccess } from '../utils/index'

async function fetcher(account: string | null | undefined): Promise<Array<TxtxSignHistory> | undefined> {
  if (account == null || account == undefined) {
    return
  }

  const res = await getsmpc(rpclist[0]).getApprovalListByKeyId(account)
  if (serverStatusIsSuccess(res)) {
    return res.Data
  } else {
    throw new Error('get Accounts info error ')
  }
}

export default function useApprovalListByKeyId(KeyId:string|undefined) {
  
  
  

  const { data, error, isLoading } = useSWR(KeyId ? ['/smw/ApprovalListByKeyId', KeyId] : null, () => fetcher(KeyId), {
    refreshInterval: 1000 * 15
  })

  
  return {
    data: data,
    error,
    isLoading
  }
}