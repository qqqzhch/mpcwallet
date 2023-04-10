import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'ethers'
import { useEffect, useState } from 'react'

export default function useGasPrice(): BigNumber | undefined {
  const { library } = useWeb3React()
  const [gasPrice, setGasPrice] = useState<BigNumber>()

  useEffect(() => {
    const run = async () => {
      if (library) {
        const nonceResult: BigNumber = await library.getGasPrice()
        setGasPrice(nonceResult)
      }
    }
    run()
  }, [library])

  return gasPrice
}
