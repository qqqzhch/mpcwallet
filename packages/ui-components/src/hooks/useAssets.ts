import useSWR from 'swr'

import { web3 } from '@monorepo/api'
import { getsmpc } from '@monorepo/api/src/web3'

import { useWeb3React } from '@web3-react/core'

import { useEffect, useState } from 'react'
import { rpclist } from '../constants/rpcConfig'
import { serverStatusIsSuccess } from '../utils/index'
import { chainTypeName } from '../constants/chainTypeName'
import { useParams } from 'react-router-dom'
import { assertType } from '../utils/buildMpcTx'

type Asset = {
  Symbol: string
  Contract: string
  Name: string
  Decimal: number
}

async function fetcher(mpcAccount: string | null | undefined, chainId: number | undefined, typeName: string | undefined): Promise<Asset[] | undefined> {
  if (mpcAccount == null || mpcAccount == undefined || chainId == undefined || typeName == undefined) {
    return []
  }
  web3.setProvider(rpclist[0])

  const res = await getsmpc().getAssetList(mpcAccount, chainId, chainTypeName[typeName])
  if (serverStatusIsSuccess(res)) {
    return res.Data
  } else {
    throw new Error('get AssetList info error ')
  }
}

export default function useAssets() {
  const { chainId } = useWeb3React()
  const { chainType } = useParams<{ address: string; chainType: string }>()
  const [asserts, setAsserts] = useState<Array<assertType>>([])
  const { account } = useWeb3React()

  const { data, error, isLoading } = useSWR(chainId ? ['/smw/useAsserts', account, chainId, chainType] : null, () => fetcher(account, chainId, chainType), {
    refreshInterval: 1000 * 60
  })

  useEffect(() => {
    const run = async () => {
      const list: Array<assertType> = []
      list.push({
        name: 'eth',
        img: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880',
        decimals: 18
      })
      if (data !== undefined && data !== null) {
        data.forEach(item => {
          list.push({
            name: item.Symbol,
            img: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880',
            contractaddress: item.Contract,
            decimals: item.Decimal,
            balance: ''
          })
        })
      }
      setAsserts(list)
    }
    run()
  }, [data])

  return {
    data: asserts,
    error,
    isLoading
  }
}
