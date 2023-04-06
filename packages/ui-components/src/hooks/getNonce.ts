/* eslint @typescript-eslint/no-explicit-any: "off" */
// mpc account Nonce
import { useEffect, useState } from 'react'
import { useWeb3SignerOnly } from './useWeb3SignerOnly'

export default function useGetNonce(): number | undefined {
  // const { address: mpcaddress, chainType } = useParams<{ address: string; chainType: string }>()
  // const { chainId } = useWeb3React()
  const [nonce, setNonce] = useState<number>(0)
  const web3Signer = useWeb3SignerOnly()

  useEffect(() => {
    const run = async () => {
      if (web3Signer) {
        const nonceResult = await web3Signer.getTransactionCount()
        setNonce(nonceResult)
      }
    }
    run()
  }, [web3Signer])

  return nonce
}
