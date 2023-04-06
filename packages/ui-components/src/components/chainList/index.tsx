import React, { FC, useEffect, useState, useCallback } from 'react'
import { Popover } from '@headlessui/react'
import { appSupportedChainId } from '../../constants/chains'
import { getChainInfo, L1ChainInfo, L2ChainInfo } from '../../constants/chainInfo'
import { useWeb3React } from '@web3-react/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import switchEthereumChain from '../../metamask/switchEthereumChain'
import { RPC_URLS } from '../../constants/networks'
import { SupportedChainId } from '../../constants/chains'
import EventBus from '../../EventEmitter/index'
import { When } from 'react-if'

type Props = {
  children?: React.ReactNode
}

interface Chininfo {
  item: L1ChainInfo | L2ChainInfo
  chainId: number
}
const ChainList: FC<Props> = ({ children }) => {
  const [chains, setChains] = useState<Chininfo[]>()
  const [chianName, setchianName] = useState<string>('')
  const [unsupported, setUnsupported] = useState<boolean>(false)
  const { chainId, library } = useWeb3React()

  useEffect(() => {
    const data = appSupportedChainId.map(item => {
      return { item: getChainInfo(item), chainId: item }
    })
    setChains(data)
  }, [])

  useEffect(() => {
    // setUnsupported(false)
    if (chainId != null) {
      const ChainInfo = getChainInfo(chainId)
      if (ChainInfo?.label) {
        setchianName(ChainInfo?.label)
      }
    } else {
      const ChainInfo = getChainInfo(1)
      if (ChainInfo?.label) {
        setchianName(ChainInfo?.label)
      }
    }
  }, [chainId])
  const SwitchingNetwork = useCallback(
    async (network: L1ChainInfo | L2ChainInfo, chainId: SupportedChainId) => {
      const ChainInfo = getChainInfo(chainId)
      await switchEthereumChain(chainId, network.label, RPC_URLS[chainId], library, unsupported, ChainInfo.nativeCurrency, ChainInfo.explorer)
    },
    [library, unsupported]
  )
  useEffect(() => {
    EventBus.on('UnsupportedChainId', Unsupported => {
      setUnsupported(Unsupported)
    })
    return () => {
      EventBus.off('UnsupportedChainId')
    }
  }, [])

  return (
    <Popover className="relative">
      <Popover.Button className="flex flex-row items-center justify-center  focus:outline-none  ">
        <When condition={unsupported === true}>
          <div className="px-3 py-1 mx-2   rounded  bg-red-600 font-thin">Error</div>
          <div>
            <FontAwesomeIcon icon={icon({ name: 'chevron-down', style: 'solid' })} />
          </div>
        </When>
        <When condition={unsupported !== true && chainId != undefined}>
          <div className="px-4 py-1 mx-2   rounded  bg-yellow-300 font-thin text-sm">{chianName}</div>
          <div className="lg:flex">
            <FontAwesomeIcon icon={icon({ name: 'chevron-down', style: 'solid' })} />
          </div>
        </When>
        <When condition={unsupported !== true && chainId === undefined}>
          <div className="px-3 py-1 mx-2   rounded  bg-yellow-300 font-thin text-sm  max-w-[110px] sm:max-w-lg  truncate">Network</div>
          <div>
            <FontAwesomeIcon icon={icon({ name: 'chevron-down', style: 'solid' })} />
          </div>
        </When>
      </Popover.Button>

      <Popover.Panel className="absolute left-1/4  w-48 z-10 mt-4   max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl  ">
        <div className="overflow-hidden  rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="relative   bg-white p-2 flex flex-col space-y-4">
            {chains?.map(({ item, chainId }) => {
              return (
                <a
                  key={item.label}
                  onClick={() => {
                    SwitchingNetwork(item, chainId)
                  }}
                  className="flex items-center rounded-lg   transition duration-150 ease-in-out hover:bg-blue-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                    <img width={20} src={item.logoUrl}></img>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  )
}

export default ChainList
