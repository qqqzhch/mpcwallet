import { useState, useEffect } from 'react'
import Web3 from 'web3'
import { SupportedChainNames } from '../../constants/chains'

import InterfaceRepository from './interfaceRepository'
import { InterfaceRepo } from './interfaceRepository'
import { rpcUrlGetterByNetwork } from './utils'
import { SCAN_KEY } from '../../constants/networks'

export interface Services {
  web3: Web3 | undefined
  interfaceRepo: InterfaceRepo | undefined
}

export default function useServices(network: SupportedChainNames): Services {
  const [web3, setWeb3] = useState<Web3 | undefined>()
  const [interfaceRepo, setInterfaceRepo] = useState<InterfaceRepository | undefined>()

  useEffect(() => {
    if (!network) {
      return
    }

    const rpcUrlGetter = rpcUrlGetterByNetwork[network]
    if (!rpcUrlGetter) {
      throw Error(`RPC URL not defined for network ${network}`)
    }
    const rpcUrl = rpcUrlGetter(SCAN_KEY)

    const web3Instance = new Web3(rpcUrl)
    const interfaceRepo = new InterfaceRepository(network, web3Instance)

    setWeb3(web3Instance)
    setInterfaceRepo(interfaceRepo)
  }, [network])

  return {
    web3,
    interfaceRepo
  }
}
