import useSWR from 'swr'

import { getsmpc } from '@monorepo/api/src/web3'

import { useWeb3React } from '@web3-react/core'

import { useEffect, useState } from 'react'
import { rpclist } from '../constants/rpcConfig'
import { serverStatusIsSuccess } from '../utils/index'
import { useParams } from 'react-router-dom'
import { chainTypeName } from '../constants/chainTypeName'

async function fetcher(account: string | null | undefined, chainId: number | undefined, chain_type: string | undefined): Promise<number | undefined> {
  if (account == null || account == undefined || chainId == undefined || chain_type == undefined) {
    return
  }

  const res = await getsmpc(rpclist[0]).getLatestMpcAddressStatus(account, chainId, chainTypeName[chainId])
  if (serverStatusIsSuccess(res)) {
    return res.Data
  } else {
    throw new Error('get getLatestMpcAddressStatus info error ')
  }
}

export default function useLatestMpcAddressStatus() {
  const { address, chainType } = useParams<{ address: string; chainType: string }>()
  const { chainId } = useWeb3React()

  const [status, setStatus] = useState<boolean>(false)

  const { data, error, isLoading } = useSWR(
    address ? ['/smw/getLatestMpcAddressStatus', address, chainId, chainType] : null,
    () => fetcher(address, chainId, chainType),
    {
      refreshInterval: 1000 * 15
    }
  )

  useEffect(() => {
    if (data == undefined) {
      return
    }
    if ([0, 1, 4].includes(data) == false) {
      setStatus(true)
    } else {
      setStatus(false)
    }
  }, [data, setStatus])

  return {
    data: status,
    error,
    isLoading
  }
}
