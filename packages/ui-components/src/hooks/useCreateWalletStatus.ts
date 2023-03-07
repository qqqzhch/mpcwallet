import useSWR from 'swr'
import { useAppStore } from '../state/index'
import { web3 } from '@monorepo/api'
import { getsmpc } from '@monorepo/api/src/web3'
import { useWeb3React } from '@web3-react/core'

interface walletItemStatus {
  Status: number
  User_account: string
  Key_id: string
  Public_key: string
  Mpc_address: string
  Initializer: string
  Reply_status: string
  Reply_timestamp: string
  Reply_enode: string
  Gid: string
  Threshold: string
}

async function fetcher(
  rpc: string | undefined,
  keyid: string | null | undefined
): Promise<
  | {
      status: number
      mpcAddress: string
      list: Array<walletItemStatus>
    }
  | undefined
> {
  if (keyid == null || keyid == undefined || rpc == undefined) {
    return
  }
  web3.setProvider(rpc)
  const res = await getsmpc().getReqAddrStatus(keyid)

  if (res.Status === 'Error') {
    throw new Error('get wallet status info error ')
  }
  if (res.Data == undefined || res.Data == null) {
    throw new Error('get wallet status info error ')
  }
  const result = res.Data as Array<walletItemStatus>
  if (result.length == 0) {
    throw new Error('get wallet status info error ')
  }

  return {
    status: result[0].Status,
    mpcAddress: result[0].Mpc_address,
    list: result
  }
}

export function useCreateWalletStatus() {
  const { account } = useWeb3React()
  const loginAccount = useAppStore(state => state.getLoginAccount(account))
  const keyid = useAppStore(state => state.createGroup.keyid)

  // const [list,setList]= useState<Array<walletaccount>>([])

  const { data, error, isLoading } = useSWR(keyid && loginAccount?.rpc ? '/smw/walletstatus' : null, () => fetcher(loginAccount?.rpc, keyid), {
    refreshInterval: 1000 * 15
  })

  return {
    data,
    error,
    isLoading
  }
}
