import { useState, useEffect } from 'react'
import Web3 from 'web3'
import { SupportedChainId } from '../../constants/chains'

import InterfaceRepository from './interfaceRepository'
import { InterfaceRepo } from './interfaceRepository'
// import { rpcUrlGetterByNetwork } from './utils'
import { RPC_URLS } from '../../constants/networks'
import useChainName from '../../hooks/useChainName'
import { useWeb3React } from '@web3-react/core'

export interface Services {
  web3: Web3 | undefined
  interfaceRepo: InterfaceRepo | undefined
}

export default function useServices(): Services {
  const [web3, setWeb3] = useState<Web3 | undefined>()
  const [interfaceRepo, setInterfaceRepo] = useState<InterfaceRepository | undefined>()
  const network = useChainName()
  const { chainId } = useWeb3React()
  useEffect(() => {
    if (chainId == undefined && network == '') {
      return
    }
    const rpcUrl = RPC_URLS[chainId as SupportedChainId][0]

    const web3Instance = new Web3(rpcUrl)
    const interfaceRepo = new InterfaceRepository(network, web3Instance)

    setWeb3(web3Instance)
    setInterfaceRepo(interfaceRepo)
  }, [network, chainId])

  return {
    web3,
    interfaceRepo
  }
}
