
import { useAppStore } from '../state/index'
import { useWeb3React } from '@web3-react/core'
export default function useAccount(mpcAddress:string|undefined) {
    const { account } = useWeb3React()
    const mpcinfo = useAppStore(state => state.getWalletAccount(account,mpcAddress))
  return mpcinfo

}