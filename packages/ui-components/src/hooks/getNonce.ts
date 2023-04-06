/* eslint @typescript-eslint/no-explicit-any: "off" */
// mpc account Nonce
import { chainTypeName } from '../constants/chainTypeName'
import { getsmpc } from '@monorepo/api/src/web3'
import { useParams } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { rpclist } from '../constants/rpcConfig'
import { useEffect, useState } from 'react'

export default function useGetNonce(): number | undefined {
  const { address: mpcaddress, chainType } = useParams<{ address: string; chainType: string }>()
  const { chainId } = useWeb3React()
  const [nonce, setNonce] = useState<number>(0)

  useEffect(() => {
    const run = async () => {
      if (chainType !== undefined && chainId !== undefined && mpcaddress !== undefined) {
        const isEvm = chainTypeName[chainType] == 0 ? true : false
        const nonceResult = await getsmpc(rpclist[0]).getNonce(mpcaddress, chainId, isEvm, chainTypeName[chainType])
        const data = nonceResult.Data as number
        setNonce(data)
      }
    }
    run()
  }, [chainType, chainId, mpcaddress])

  return nonce
}
