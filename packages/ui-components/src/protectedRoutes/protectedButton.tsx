import { useAppStore } from '../state/index'
import { useWeb3React } from '@web3-react/core'
import EventBus from '../EventEmitter/index'
import { useCallback } from 'react'
export const ProtectedButton = ({ children, className }: { children: JSX.Element; className?: string }) => {
  const { account } = useWeb3React()
  const loginAccount = useAppStore(state => state.getLoginAccount(account))

  const connectWallet = useCallback(() => {
    EventBus.emit('connectwallet')
  }, [])
  const runLogin = useCallback(() => {
    EventBus.emit('runLogin')
  }, [])
  if (account == undefined || account == null) {
    return (
      <button
        onClick={connectWallet}
        className={className ? className : 'bg-sky-500 hover:bg-sky-700 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white'}
      >
        Connect wallet
      </button>
    )
  }
  if (loginAccount == undefined || loginAccount.signEnode == '') {
    return (
      <button
        onClick={() => {
          runLogin()
        }}
        className={className ? className : 'bg-sky-500 hover:bg-sky-700 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white'}
      >
        Login required
      </button>
    )
  }

  return children
}
