export default async function (
  chainId: number,
  chainName: string,
  rpcUrls: Array<string>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  library: any,
  Unsupported: boolean,
  nativeCurrency: {
    name: string // e.g. 'Goerli ETH',
    symbol: string // e.g. 'gorETH',
    decimals: number // e.g. 18,
  },
  blockExplorerUrl: string
) {
  let libraryprovider
  if (library !== undefined) {
    libraryprovider = library.provider
  } else {
    libraryprovider = window.ethereum
  }

  const hexchainId = '0x' + chainId.toString(16)

  try {
    if (libraryprovider.request) {
      await libraryprovider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: hexchainId }]
      })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        if (libraryprovider.request) {
          await libraryprovider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: hexchainId,
                chainName: chainName,
                rpcUrls: rpcUrls /* ... */,
                nativeCurrency,
                blockExplorerUrls: [blockExplorerUrl]
              }
            ]
          })
        }
      } catch (addError) {
        // handle "add" error
      }
    }
    // handle other "switch" errors
  }
  if (Unsupported == true) {
    window.location.reload()
  }
}
