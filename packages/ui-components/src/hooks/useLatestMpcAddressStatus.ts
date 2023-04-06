import useSWR from 'swr'
import { useAppStore } from '../state/index'
import { getsmpc } from '@monorepo/api/src/web3'

import { useWeb3React } from '@web3-react/core'
import { walletaccount } from '../state/walletaccount'
import { useEffect, useState } from 'react'
import { rpclist } from '../constants/rpcConfig'
import { serverStatusIsSuccess } from '../utils/index'
import { useParams } from 'react-router-dom'

async function fetcher(account: string | null | undefined): Promise<number|undefined> {
  if (account == null || account == undefined) {
    return
  }

  const res = await getsmpc(rpclist[0]).getLatestMpcAddressStatus(account)
  if (serverStatusIsSuccess(res)) {
    return res.Data
  } else {
    throw new Error('get getLatestMpcAddressStatus info error ')
  }
}

export default function useLatestMpcAddressStatus() {
  const { address } = useParams<{ address: string; chainType: string }>()
  
  const [status, setStatus] = useState<boolean>(false)

  const { data, error, isLoading } = useSWR(address ? ['/smw/getLatestMpcAddressStatus', address] : null, () => fetcher(address), {
    refreshInterval: 1000 * 15
  })
  console.log('- -')
  useEffect(() => {
    if (data == undefined) {
      return
    }
    console.log('data',data)
    if([0,1,4].includes(data)==false){
      setStatus(true)
    }
  }, [data, setStatus])

  return {
    data: status,
    error,
    isLoading
  }
}