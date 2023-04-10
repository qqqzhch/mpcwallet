import { SupportedChainId } from './chains'

export const INFURA_KEY = import.meta.env.VITE_REACT_APP_INFURA_KEY

if (typeof INFURA_KEY === 'undefined') {
  throw new Error(`REACT_APP_INFURA_KEY must be a defined environment variable`)
}

export const SCAN_KEY = import.meta.env.VITE_REACT_APP_SCAN_KEY

if (typeof SCAN_KEY === 'undefined') {
  throw new Error(`VITE_REACT_APP_SCAN_KEY must be a defined environment variable`)
}

export const BSC_SCAN_KEY = import.meta.env.VITE_REACT_BSC_APP_SCAN_KEY

if (typeof BSC_SCAN_KEY === 'undefined') {
  throw new Error(`VITE_REACT_BSC_APP_SCAN_KEY must be a defined environment variable`)
}

export const FTM_SCAN_KEY = import.meta.env.VITE_REACT_FTM_APP_SCAN_KEY

if (typeof FTM_SCAN_KEY === 'undefined') {
  throw new Error(`VITE_REACT_FTM_APP_SCAN_KEY must be a defined environment variable`)
}

export const POLYGON_SCAN_KEY = import.meta.env.VITE_REACT_POLYGON_APP_SCAN_KEY

if (typeof POLYGON_SCAN_KEY === 'undefined') {
  throw new Error(`VITE_REACT_POLYGON_APP_SCAN_KEY must be a defined environment variable`)
}

export const AVALANCHE_SCAN_KEY = import.meta.env.VITE_REACT_AVALANCHE_APP_SCAN_KEY

if (typeof AVALANCHE_SCAN_KEY === 'undefined') {
  throw new Error(`VITE_REACT_AVALANCHE_APP_SCAN_KEY must be a defined environment variable`)
}

/**
 * Fallback JSON-RPC endpoints.
 * These are used if the integrator does not provide an endpoint, or if the endpoint does not work.
 *
 * MetaMask allows switching to any URL, but displays a warning if it is not on the "Safe" list:
 * https://github.com/MetaMask/metamask-mobile/blob/bdb7f37c90e4fc923881a07fca38d4e77c73a579/app/core/RPCMethods/wallet_addEthereumChain.js#L228-L235
 * https://chainid.network/chains.json
 *
 * These "Safe" URLs are listed first, followed by other fallback URLs, which are taken from chainlist.org.
 */
export const FALLBACK_URLS: { [key in SupportedChainId]: string[] } = {
  [SupportedChainId.MAINNET]: [
    // "Safe" URLs
    'https://api.mycryptoapi.com/eth',
    'https://cloudflare-eth.com',
    // "Fallback" URLs
    'https://rpc.ankr.com/eth',
    'https://eth-mainnet.public.blastapi.io',
    `https://mainnet.infura.io/v3/${INFURA_KEY}`
  ],
  [SupportedChainId.ROPSTEN]: [
    // "Fallback" URLs
    'https://rpc.ankr.com/eth_ropsten'
  ],
  [SupportedChainId.RINKEBY]: [
    // "Fallback" URLs
    'https://rinkeby-light.eth.linkpool.io/'
  ],
  [SupportedChainId.GOERLI]: [
    // "Safe" URLs
    'https://rpc.goerli.mudit.blog/',
    // "Fallback" URLs
    'https://rpc.ankr.com/eth_goerli',
    'https://eth-goerli.api.onfinality.io/public',
    'https://eth-goerli.public.blastapi.io',
    'https://eth-goerli.g.alchemy.com/v2/demo',
    `https://goerli.infura.io/v3/${INFURA_KEY}`
  ],
  [SupportedChainId.KOVAN]: [
    // "Safe" URLs
    'https://kovan.poa.network',
    // "Fallback" URLs
    'https://eth-kovan.public.blastapi.io'
  ],
  [SupportedChainId.POLYGON]: [
    // "Safe" URLs
    'https://polygon-rpc.com/',
    'https://rpc-mainnet.matic.network',
    'https://matic-mainnet.chainstacklabs.com',
    'https://rpc-mainnet.maticvigil.com',
    'https://rpc-mainnet.matic.quiknode.pro'
  ],
  [SupportedChainId.POLYGON_MUMBAI]: [
    'https://matic-testnet-archive-rpc.bwarelabs.com/',
    // "Safe" URLs
    'https://matic-mumbai.chainstacklabs.com',
    'https://rpc-mumbai.maticvigil.com'
  ],
  [SupportedChainId.ARBITRUM_ONE]: [
    // "Safe" URLs
    'https://arb1.arbitrum.io/rpc',
    // "Fallback" URLs
    'https://arbitrum.public-rpc.com'
  ],
  [SupportedChainId.ARBITRUM_RINKEBY]: [
    // "Safe" URLs
    'https://rinkeby.arbitrum.io/rpc'
  ],
  [SupportedChainId.OPTIMISM]: [
    // "Safe" URLs
    'https://mainnet.optimism.io/',
    // "Fallback" URLs
    'https://rpc.ankr.com/optimism'
  ],
  [SupportedChainId.OPTIMISM_GOERLI]: [
    // "Safe" URLs
    'https://goerli.optimism.io'
  ],
  [SupportedChainId.CELO]: [
    // "Safe" URLs
    `https://forno.celo.org`
  ],
  [SupportedChainId.CELO_ALFAJORES]: [
    // "Safe" URLs
    `https://alfajores-forno.celo-testnet.org`
  ],
  [SupportedChainId.BNB]: [
    // "Safe" URLs
    'https://bsc-dataseed.binance.org'
  ],
  [SupportedChainId.BNB_TEST]: [
    // "Safe" URLs
    `https://data-seed-prebsc-1-s1.binance.org:8545`,
    `https://data-seed-prebsc-2-s1.binance.org:8545`,
    `https://data-seed-prebsc-2-s3.binance.org:8545`
  ],
  [SupportedChainId.AVALANCHE_FUJITEST]: [
    `https://ava-testnet.public.blastapi.io/ext/bc/C/rpc`,
    `https://api.avax-test.network/ext/bc/C/rpc`,
    `https://avalanche-fuji.infura.io/v3/${INFURA_KEY}`
  ],
  [SupportedChainId.FANTOM_TEST]: [
    `https://rpc.testnet.fantom.network`,
    `https://fantom-testnet.public.blastapi.io`,
    `https://endpoints.omniatech.io/v1/fantom/testnet/public`
  ]
}

/**
 * Known JSON-RPC endpoints.
 * These are the URLs used by the interface when there is not another available source of chain data.
 */
export const RPC_URLS: { [key in SupportedChainId]: string[] } = {
  [SupportedChainId.MAINNET]: ['https://eth-rpc.gateway.pokt.network', ...FALLBACK_URLS[SupportedChainId.MAINNET]],
  [SupportedChainId.RINKEBY]: [`https://rinkeby.infura.io/v3/${INFURA_KEY}`, ...FALLBACK_URLS[SupportedChainId.RINKEBY]],
  [SupportedChainId.ROPSTEN]: [`https://ropsten.infura.io/v3/${INFURA_KEY}`, ...FALLBACK_URLS[SupportedChainId.ROPSTEN]],
  [SupportedChainId.GOERLI]: ['https://rpc.ankr.com/eth_goerli', ...FALLBACK_URLS[SupportedChainId.GOERLI]],
  [SupportedChainId.KOVAN]: [`https://kovan.infura.io/v3/${INFURA_KEY}`, ...FALLBACK_URLS[SupportedChainId.KOVAN]],
  [SupportedChainId.OPTIMISM]: [`https://optimism-mainnet.infura.io/v3/${INFURA_KEY}`, ...FALLBACK_URLS[SupportedChainId.OPTIMISM]],
  [SupportedChainId.OPTIMISM_GOERLI]: [`https://optimism-goerli.infura.io/v3/${INFURA_KEY}`, ...FALLBACK_URLS[SupportedChainId.OPTIMISM_GOERLI]],
  [SupportedChainId.ARBITRUM_ONE]: [`https://arbitrum-mainnet.infura.io/v3/${INFURA_KEY}`, ...FALLBACK_URLS[SupportedChainId.ARBITRUM_ONE]],
  [SupportedChainId.ARBITRUM_RINKEBY]: [`https://arbitrum-rinkeby.infura.io/v3/${INFURA_KEY}`, ...FALLBACK_URLS[SupportedChainId.ARBITRUM_RINKEBY]],
  [SupportedChainId.POLYGON]: [`https://polygon-mainnet.infura.io/v3/${INFURA_KEY}`, ...FALLBACK_URLS[SupportedChainId.POLYGON]],
  [SupportedChainId.POLYGON_MUMBAI]: ['https://rpc.ankr.com/polygon_mumbai', ...FALLBACK_URLS[SupportedChainId.POLYGON_MUMBAI]],
  [SupportedChainId.CELO]: FALLBACK_URLS[SupportedChainId.CELO],
  [SupportedChainId.CELO_ALFAJORES]: FALLBACK_URLS[SupportedChainId.CELO_ALFAJORES],
  [SupportedChainId.BNB]: ['https://bsc-dataseed.binance.org'],
  [SupportedChainId.BNB_TEST]: ['https://data-seed-prebsc-1-s3.binance.org:8545', ...FALLBACK_URLS[SupportedChainId.BNB_TEST]],
  [SupportedChainId.FANTOM_TEST]: ['https://rpc.ankr.com/fantom_testnet', ...FALLBACK_URLS[SupportedChainId.FANTOM_TEST]],
  [SupportedChainId.AVALANCHE_FUJITEST]: [`https://rpc.ankr.com/avalanche_fuji`, ...FALLBACK_URLS[SupportedChainId.AVALANCHE_FUJITEST]]
}
