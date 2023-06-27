import { SupportedChainId } from "./chains"


export const Relayer_IDS_TO_ADDR = {
    [SupportedChainId.GOERLI]: '0x3b632adcF6C44715DF5bDA353F8332cd33C749E8',
    [SupportedChainId.AVALANCHE_FUJITEST]: '0xDe58B4282BF2308F51e7c4cbAF0B62b06C2d74a0',

    [SupportedChainId.MAINNET]: '',
    [SupportedChainId.ROPSTEN]: '',
    [SupportedChainId.RINKEBY]: '',
    [SupportedChainId.KOVAN]: '',
    [SupportedChainId.POLYGON]: '',
    [SupportedChainId.POLYGON_MUMBAI]: '',
    [SupportedChainId.CELO]: '',
    [SupportedChainId.CELO_ALFAJORES]: '',
    [SupportedChainId.ARBITRUM_ONE]: '',
    [SupportedChainId.ARBITRUM_Goerli]: '0xC1a66ff524ca631e8a887Da7Ee44e615Ef6313Dc',
    [SupportedChainId.OPTIMISM]: '',
    [SupportedChainId.OPTIMISM_GOERLI]: '',
  }

  export const Circle_Chainid = {
    [SupportedChainId.GOERLI]:0,
    [SupportedChainId.AVALANCHE_FUJITEST]:1,

    [SupportedChainId.MAINNET]: '',
    [SupportedChainId.ROPSTEN]: '',
    [SupportedChainId.RINKEBY]: '',
    [SupportedChainId.KOVAN]: '',
    [SupportedChainId.POLYGON]: '',
    [SupportedChainId.POLYGON_MUMBAI]: '',
    [SupportedChainId.CELO]: '',
    [SupportedChainId.CELO_ALFAJORES]: '',
    [SupportedChainId.ARBITRUM_ONE]: '',
    [SupportedChainId.ARBITRUM_Goerli]: 3,
    [SupportedChainId.OPTIMISM]: '',
    [SupportedChainId.OPTIMISM_GOERLI]: '',
  }

  export const BaseUrl="http://3.89.186.206:12000/cctp/"