import { rpclist } from '../constants/rpcConfig'
import { getsmpc } from '@monorepo/api/src/web3'
import useSWR from 'swr'
import { useWeb3React } from '@web3-react/core'
import { serverStatusIsSuccess } from '../utils/index'

async function fetcher(): Promise<number | undefined> {
  const res = await getsmpc(rpclist[0]).getNodesNumber()
  if (serverStatusIsSuccess(res)) {
    return res.Data
  } else {
    throw new Error('get Accounts info error ')
  }
}

export default function useGetNodesNumber(): number | undefined {
  // const { address: mpcaddress, chainType } = useParams<{ address: string; chainType: string }>()
  const { chainId } = useWeb3React()

  const { data } = useSWR(chainId ? ['/smw/NodesNumber', chainId] : null, () => fetcher())

  return data
}
