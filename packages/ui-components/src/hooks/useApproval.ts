import useSWR from 'swr'
import { useAppStore } from '../state/index'
import { web3 } from '@monorepo/api'
import { getsmpc } from '@monorepo/api/src/web3'

import { useWeb3React } from '@web3-react/core'
import { walletApprove } from '../state/approve'
import { useEffect } from 'react'
import { rpclist } from '../constants/rpcConfig'

async function fetcher(account: string | null | undefined): Promise<
  | {
      AddrInfo: Array<walletApprove>
      SignInfo: Array<walletApprove>
    }
  | undefined
> {
  if (account == null || account == undefined) {
    return
  }
  web3.setProvider(rpclist[0])
  // const AddrInfo = await getsmpc().getCurNodeReqAddrInfo(account)
  const SignInfo = await getsmpc().getCurNodeSignInfo(account)

  if (SignInfo.Status != 'Success') {
    throw new Error('get approve info error ')
  }
  return {
    AddrInfo: [],
    SignInfo: SignInfo.Data
  }
}

export default function useApprove() {
  const { account } = useWeb3React()

  const setWalletApproveList = useAppStore(state => state.setWalletApproveList)

  const { data, error, isLoading } = useSWR(account != null && account != undefined ? '/smpc/Approve' : null, () => fetcher(account), {
    refreshInterval: 1000 * 15
  })
  useEffect(() => {
    if (data?.AddrInfo) {
      setWalletApproveList(data?.AddrInfo)
    } else {
      setWalletApproveList([])
    }
  }, [setWalletApproveList, data?.AddrInfo])

  return {
    data,
    error,
    isLoading
  }
}
