import { SupportedChainNames } from '../../constants/chains'

export const rpcUrlGetterByNetwork: {
  [key in SupportedChainNames]: null | ((token?: string) => string)
} = {
  mainnet: token => `https://mainnet.infura.io/v3/${token}`,
  MORDEN: null,
  ROPSTEN: null,
  rinkeby: token => `https://rinkeby.infura.io/v3/${token}`,
  goerli: token => `https://goerli.etherscan.io/v3/${token}`,
  KOVAN: null,
  // XDAI: () => 'https://dai.poa.network',
  // ENERGY_WEB_CHAIN: () => 'https://rpc.energyweb.org',
  // VOLTA: () => 'https://volta-rpc.energyweb.org',
  // UNKNOWN: null,
  "bsc": () => 'https://bsc-dataseed.binance.org',
  "bsc_test": () => 'https://data-seed-prebsc-1-s3.binance.org:8545'
}
