/* eslint @typescript-eslint/no-explicit-any: "off" */
// mpc account Nonce
import { useEffect, useState } from 'react'
import { useWeb3LibOnly } from './useWeb3LibOnly'

import { useParams } from 'react-router-dom'

export default function useGetNonce(): number | undefined {
  // const { address: mpcaddress, chainType } = useParams<{ address: string; chainType: string }>()
  // const { chainId } = useWeb3React()
  const [nonce, setNonce] = useState<number>(0)
  const web3LibOnly = useWeb3LibOnly()
  const { address } = useParams<{ address: string; chainType: string }>()

  useEffect(() => {
    const run = async () => {
      if (web3LibOnly && address) {
        const nonceResult = await web3LibOnly.getTransactionCount(address)

        setNonce(nonceResult)
      }
    }
    run()
  }, [web3LibOnly, address])

  return nonce
}
