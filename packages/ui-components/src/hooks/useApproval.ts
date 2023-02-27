import useSWR from 'swr'
import { useAppStore } from '../state/index'
import { web3 } from '@monorepo/api'
import { getsmpc } from '@monorepo/api/src/web3'

import { useWeb3React } from '@web3-react/core'
import { walletApprove } from '../state/approve'

async function fetcher(
  rpc: string,
  account: string | null | undefined
): Promise<
  | {
      AddrInfo: Array<walletApprove>
      SignInfo: Array<walletApprove>
    }
  | undefined
> {
  if (account == null || account == undefined) {
    return
  }
  web3.setProvider(rpc)
  const AddrInfo = await getsmpc().getCurNodeReqAddrInfo(account)
  const SignInfo = await getsmpc().getCurNodeSignInfo(account)
  if (AddrInfo.Status != 'Success' || SignInfo.Status != 'Success') {
    throw new Error('get approve info error ')
  }
  return {
    AddrInfo: AddrInfo.Data,
    SignInfo: SignInfo.Data
  }
}

export default function useApprove() {
  const loginAccount = useAppStore(state => state.loginAccount)
  const { account } = useWeb3React()
  const { data, error, isLoading } = useSWR(account != null && account != undefined ? '/smpc/Approve' : null, () => fetcher(loginAccount.rpc, account), {
    refreshInterval: 1000 * 15
  })
  return {
    data,
    error,
    isLoading
  }
}
