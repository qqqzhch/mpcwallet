import { MockProvider,ProviderSetup } from '@rsksmart/mock-web3-provider'
export class MyMockProvider extends MockProvider {
    constructor(setup: ProviderSetup) {
        super(setup)
    }
    request({ method, params }: any): Promise<any> {
        console.log('request')
    switch (method) {
        case 'eth_getTransactionCount':
          return Promise.resolve(0)
        default:
          
          // eslint-disable-next-line prefer-promise-reject-errors
          return super.request({method, params})
      }

    }
}