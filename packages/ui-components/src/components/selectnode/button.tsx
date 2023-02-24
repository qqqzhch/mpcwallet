import { FC, useCallback } from 'react'
import { useAppStore } from '../../state/index'
import { useSignEnode } from '../../hooks/useSigns'
import { useWeb3React } from '@web3-react/core'
import { When } from 'react-if'
import EventBus from '../../EventEmitter'
import { useToasts } from 'react-toast-notifications'
import { useNavigate } from "react-router-dom";

const SelectButton: FC = () => {
  const loginAccount = useAppStore(state => state.loginAccount)
  const setLoginAccount = useAppStore(state => state.setLoginAccount)
  const { account } = useWeb3React()
  const { addToast } = useToasts();
  const navigate = useNavigate();
  

  const { execute } = useSignEnode(loginAccount.enode)

  const btnClick = useCallback(() => {
    const run = async () => {
      if (loginAccount.enode != '') {
        try {
          const signEnode = await execute()
          setLoginAccount(loginAccount.rpc, loginAccount.enode, signEnode)  
          navigate("/creatwallet")

        } catch (error:unknown) {
          const  err=error as Error
          addToast(err.message, { appearance: 'error' });
          
          
        }
        
      }
    }
    run()
  }, [execute, loginAccount, setLoginAccount,navigate,addToast])

  const connectWallet=useCallback(()=>{
    EventBus.emit("connectwallet")
  },[])

  return (
      <>
      <When condition={account!==undefined}>
    <button onClick={btnClick} className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
    Login
    </button>
    </When>
    <When condition={account==undefined}>
    <button onClick={connectWallet} className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
        Connect Wallet
    </button>

    </When>
      </>
    
    
  )
}

export default SelectButton
