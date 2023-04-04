import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
// import { BigNumber,Contract,ethers,utils } from 'ethers'
import { assertType } from '../utils/buildMpcTx'
import { getAddressBalances } from '../eth-balance-checker'

import BalanceMap from 'eth-balance-checker'
import checkBalanceAddress from '../constants/checkBalanceAddress'
import { SupportedChainId } from '../constants/chains'

export default function useAssetListBalance(mpcAddress: string | undefined, list: assertType[]) {
  const { library, chainId } = useWeb3React()

  const [balance, setBalance] = useState<BalanceMap.BalanceMap>({})

  useEffect(() => {
    const run = async () => {
      if (mpcAddress && list && list.length > 0 && chainId !== undefined && library !== undefined) {
        const tokens: string[] = list
          .map(item => {
            return item.contractaddress || '0x0'
          })
          .filter(item => {
            return item !== '0x0'
          })
        const id = chainId as SupportedChainId
        const checkAddress = checkBalanceAddress[id]
        getAddressBalances(library, mpcAddress, tokens, {
          contractAddress: checkAddress
        }).then(balances => {
          setBalance(balances)
        })
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
  }, [mpcAddress, library, list, chainId])

  return {
    balance
  }
}
