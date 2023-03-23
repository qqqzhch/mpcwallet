import useSWR from 'swr'
import { useAppStore } from '../state/index'
import { web3 } from '@monorepo/api'
import { getsmpc } from '@monorepo/api/src/web3'

import { useWeb3React } from '@web3-react/core'
import { walletaccount } from '../state/walletaccount'
import { useEffect, useState } from 'react'
import { rpclist } from '../constants/rpcConfig'

async function fetcher(KeyId: string | null | undefined): Promise<string|undefined> {
  if (KeyId == null || KeyId == undefined) {
    return
  }
  
  const res = await getsmpc(rpclist[0]).getTxHashByKeyId(KeyId)

  if (res.Status.toLowerCase() === 'error') {
    throw new Error('get Accounts info error ')
  }

  return res.Data
}


export default function useTxHashByKeyId(KeyId:string|undefined) {
  

  const { data, error, isLoading } = useSWR(KeyId ? ['/smw/getTxHashByKeyId',KeyId] : null, () => fetcher(KeyId), {
    refreshInterval: 1000 * 15
  })

  return {
    data: data,
    error,
    isLoading
  }
}