import { providers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Network } from '@ethersproject/networks'

function checkNetworks(networks: Array<Network | null>): Network | null {
  let result = null

  for (let i = 0; i < networks.length; i++) {
    const network = networks[i]

    // Null! We do not know our network; bail.
    if (network == null) {
      continue
    }

    if (result) {
      // Make sure the network matches the previous networks
      if (
        !(
          result.name === network.name &&
          result.chainId === network.chainId &&
          (result.ensAddress === network.ensAddress || (result.ensAddress == null && network.ensAddress == null))
        )
      ) {
        console.info('')
      }
    } else {
      result = network
    }
  }

  return result
}

export default class Fallbackprovider extends providers.FallbackProvider {
  constructor(providers: Array<Provider>, quorum?: number) {
    super(providers, quorum)
  }
  async detectNetwork(): Promise<Network> {
    const network = await Promise.all(
      this.providerConfigs.map(async c => {
        let result = null
        try {
          result = await c.provider.getNetwork()
        } catch (error) {
          console.info(error)
        }

        return result
      })
    )
    const net = checkNetworks(network)
    if (net == null) {
      throw new Error('providers Not available')
    }

    return net
  }
}
