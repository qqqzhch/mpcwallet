import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { BigNumber, Contract } from 'ethers'

import erc20ABI from './../constants/ABI/ERC20.json'

// type Currency={
//  name: string,
//  symbol: string,
//  decimals: number
// }

export default function useErc20Balance(mpcAddress: string | undefined, contractAddress: string | undefined) {
  const { library } = useWeb3React()
  //   const mpcinfo = useAppStore(state => state.getWalletAccount(account, mpcAddress))

  const [balance, setBalance] = useState<string>()

  useEffect(() => {
    const run = async () => {
      if (mpcAddress && contractAddress && library != undefined) {
        const contract = new Contract(contractAddress, erc20ABI, library)
        const result: BigNumber = await contract.balanceOf(mpcAddress)
        setBalance(result.toString())
        library.on('block', () => {
          run()
        })
      }
    }
    run()

    return () => {
      if (library) {
        library.off('block')
      }
    }
  }, [mpcAddress, library, contractAddress])

  return {
    balance
  }
}
