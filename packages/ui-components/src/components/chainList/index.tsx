import React, { FC, useEffect, useState, useCallback, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

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
import { Tab } from '@headlessui/react'
import { classNames } from '../../utils'

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
  const [chianImg, setchianImg] = useState<string>('')

  const [isOpen, setIsOpen] = useState(false)
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

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
        setchianImg(ChainInfo.logoUrl)
      }
    } else {
      const ChainInfo = getChainInfo(1)
      if (ChainInfo?.label) {
        setchianName(ChainInfo?.label)
        setchianImg(ChainInfo.logoUrl)
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
    <div className="relative">
      <div onClick={openModal} className="flex flex-row items-center justify-center  focus:outline-none cursor-pointer ">
        <When condition={unsupported === true}>
          <div className="px-3 py-1 mx-2   rounded  bg-red-600 font-thin">Error</div>
          <div>
            <FontAwesomeIcon icon={icon({ name: 'chevron-down', style: 'solid' })} />
          </div>
        </When>
        <When condition={unsupported !== true && chainId != undefined}>
          <div className="px-4 py-1 mx-2   rounded  bg-yellow-300 font-thin text-sm   max-w-[80px] sm:max-w-md  text-ellipsis overflow-hidden ">
            <span className="hidden sm:block">{chianName}</span>
            <img className="sm:hidden" width={20} src={chianImg}></img>
          </div>
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
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative  z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Select Network
                  </Dialog.Title>
                  <div className="mt-2">
                    <Tab.Group>
                      <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                        <Tab
                          key={'test'}
                          className={({ selected }) =>
                            classNames(
                              'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                              selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                            )
                          }
                        >
                          Test
                        </Tab>
                        <Tab
                          key={'main'}
                          className={({ selected }) =>
                            classNames(
                              'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                              selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                            )
                          }
                        >
                          Main
                        </Tab>
                      </Tab.List>
                      <Tab.Panels className="mt-2">
                        <Tab.Panel
                          key={'test'}
                          className={classNames('rounded-xl bg-white p-3', 'ring-white ring-opacity-60 ring-offset-2  focus:outline-none focus:ring-2')}
                        >
                          <div className=" bg-white p-2 flex flex-col space-y-4">
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
                        </Tab.Panel>
                        <Tab.Panel
                          key={'main'}
                          className={classNames(
                            'rounded-xl bg-white p-3',
                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                          )}
                        ></Tab.Panel>
                      </Tab.Panels>
                    </Tab.Group>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default ChainList
