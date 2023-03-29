/* eslint-disable @typescript-eslint/no-explicit-any */
import memoize from 'lodash/memoize'
import { SupportedChainNames } from '../../constants/chains'
import { api } from '@monorepo/api'
import { SCAN_KEY, BSC_SCAN_KEY } from '../../constants/networks'

interface ContractMethod {
  inputs: any[]
  name: string
  payable: boolean
}

export interface ContractInterface {
  payableFallback: boolean
  methods: ContractMethod[]
  abiString: string
}

const getAbi = memoize(async (apiUrl: string) =>
  api.get<{
    message: string
    status: string
    result: string
  }>(apiUrl)
)

const abiUrlGetterByNetwork: {
  [key in SupportedChainNames]?: ((address: string) => string) | null
} = {
  mainnet: (address: string) => `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${SCAN_KEY}`,
  MORDEN: null,
  rinkeby: (address: string) => `https://api-rinkeby.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${SCAN_KEY}`,
  ROPSTEN: null,
  goerli: (address: string) => `https://api-goerli.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${SCAN_KEY}`,
  KOVAN: null,
  xdai: (address: string) => `https://blockscout.com/poa/xdai/api?module=contract&action=getabi&address=${address}&apikey=${SCAN_KEY}`,
  // ENERGY_WEB_CHAIN: (address: string) =>
  //   `https://explorer.energyweb.org/api?module=contract&action=getabi&address=${address}&apikey=${SCAN_KEY}`,
  // VOLTA: (address: string) =>
  //   `https://volta-explorer.energyweb.org/api?module=contract&action=getabi&address=${address}&apikey=${SCAN_KEY}`,
  // UNKNOWN: null,
  bsc: (address: string) => `https://api.bscscan.com/api?module=contract&action=getabi&address=${address}&apikey=${BSC_SCAN_KEY}`,
  bsc_test: (address: string) => `https://api-testnet.bscscan.com/api?module=contract&action=getabi&address=${address}&apikey=${BSC_SCAN_KEY}`
}

class InterfaceRepository {
  network: SupportedChainNames
  web3: any

  constructor(network: SupportedChainNames, web3: any) {
    this.network = network
    this.web3 = web3
  }

  private async _loadAbiFromBlockExplorer(address: string): Promise<string> {
    const getAbiUrl = abiUrlGetterByNetwork[this.network]
    if (!getAbiUrl) {
      throw Error(`Network: ${this.network} not supported.`)
    }

    const abi = await getAbi(getAbiUrl(address))

    if (abi.status !== '1') throw Error(`Request not successful: ${abi.message}; ${abi.result}.`)
    return abi.result
  }

  private _isMethodPayable = (m: any) => m.payable || m.stateMutability === 'payable'

  async loadAbi(addressOrAbi: string): Promise<ContractInterface> {
    const abiString = this.web3.utils.isAddress(addressOrAbi) ? await this._loadAbiFromBlockExplorer(addressOrAbi) : addressOrAbi

    const abi = JSON.parse(abiString)

    const methods = abi
      .filter((e: any) => {
        if (['pure', 'view'].includes(e.stateMutability)) {
          return false
        }

        if (e?.type.toLowerCase() === 'event') {
          return false
        }

        return !e.constant
      })
      .map((m: any) => {
        return {
          inputs: m.inputs || [],
          name: m.name || (m.type === 'fallback' ? 'fallback' : 'receive'),
          payable: this._isMethodPayable(m)
        }
      })

    const payableFallback = abi.findIndex((e: any) => e.type === 'fallback' && this._isMethodPayable(e)) >= 0

    return { payableFallback, methods, abiString }
  }
}

export type InterfaceRepo = InstanceType<typeof InterfaceRepository>

export default InterfaceRepository
