import { SupportedChainId } from "./chains"


export const Relayer_IDS_TO_ADDR = {
    [SupportedChainId.GOERLI]: '0xc253F9D86Cb529b91FEe2d952f65cd33Bd98617e',
    [SupportedChainId.AVALANCHE_FUJITEST]: '0xc253F9D86Cb529b91FEe2d952f65cd33Bd98617e',

    [SupportedChainId.MAINNET]: '',
    [SupportedChainId.ROPSTEN]: '',
    [SupportedChainId.RINKEBY]: '',
    [SupportedChainId.KOVAN]: '',
    [SupportedChainId.POLYGON]: '',
    [SupportedChainId.POLYGON_MUMBAI]: '',
    [SupportedChainId.CELO]: '',
    [SupportedChainId.CELO_ALFAJORES]: '',
    [SupportedChainId.ARBITRUM_ONE]: '',
    [SupportedChainId.ARBITRUM_RINKEBY]: '',
    [SupportedChainId.OPTIMISM]: '',
    [SupportedChainId.OPTIMISM_GOERLI]: '',
  }