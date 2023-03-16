import { createStore, useStore } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import React, { createContext, FC, useContext } from 'react'
import { walletaccount } from './walletaccount'
import { TxApprove, txApproveListintial } from './approve'

export interface adminInfo {
  address: string
  name?: string
  key: number
}
export interface PollingPubKey {
  fn: string
  params: Array<string>
  data: {
    GroupID: string
    ThresHold: string
    Key?: string
  }
}

export interface loginAccount {
  rpc: string
  enode: string
  signEnode: string
  address: string
}

export interface AppState {
  counter: number
  loginAccounts: Array<loginAccount>
  createGroup: {
    admins: Array<adminInfo>
    keytype: string
    threshold: number
    walletname: string
    keyid: string
  }
  approve: {
    txApproveList: Array<TxApprove>
  }
  walletAccounts: Array<walletaccount>
  pollingPubKey: Array<PollingPubKey>
  sideBar: boolean
  increase: (by: number) => void
  setLoginAccount: (rpc: string, enode: string, adress: string, signEnode?: string) => void
  clearLoginAccount: (adress: string | null | undefined) => void
  getLoginAccount: (address: string | null | undefined) => loginAccount | undefined
  setcreateGroupKeytype: (keytype: string) => void
  setcreateGroupThreshold: (threshold: number) => void
  addcreateGroupAdmin: () => void
  removecreateGroupAdminByindex: (index: number) => void
  setcreateGroupWalletName: (name: string) => void
  editcreateGroupAdmin: (index: number, name: string) => void
  setpollingPubKey: (pollingPubKey: PollingPubKey) => void
  setWalletApproveList: (list: Array<TxApprove>) => void
  hidenWalletApprove: (item: TxApprove) => void
  addWalletAccounts: (list: Array<walletaccount>) => void
  setcreateGroupWalletKeyID: (keyid: string) => void
  togglesideBar: () => void
  resetCreateGroupAdmin: () => void
  getWalletAccounts: (address: string | null | undefined) => Array<walletaccount>
  getWalletAccount: (address: string | null | undefined, mpcAddress: string | undefined) => walletaccount | undefined
  getTxApproveListByStatus: (status:number) => Array<TxApprove>
  getTxApproveByKeyID:(keyid:string|undefined)=>TxApprove|undefined
}

export const intialState = {
  counter: 0,
  loginAccounts: [],
  createGroup: {
    admins: [
      {
        address: '',
        key: 0
      },
      {
        address: '',
        key: 1
      }
    ],
    keytype: 'EC256k1',
    threshold: 2,
    walletname: '',
    keyid: ''
  },
  pollingPubKey: [],
  approve: {
    txApproveList: []
  },
  walletAccounts: [],
  sideBar: false
}

const createMyStore = (state: typeof intialState = intialState) => {
  return createStore<AppState, [['zustand/devtools', never], ['zustand/immer', never], ['zustand/persist', AppState]]>(
    devtools(
      immer(
        persist(
          (set, get) => ({
            ...state,
            increase: () => {
              set(state => {
                state.counter++
              })
            },
            setLoginAccount: (rpc: string, enode: string, address: string, signEnode?: string) => {
              set(state => {
                const Account = state.loginAccounts.find(item => {
                  return item.address == address
                })
                if (Account == null || Account == undefined) {
                  state.loginAccounts.push({
                    rpc: rpc,
                    enode: enode,
                    signEnode: signEnode || '',
                    address: address
                  })
                } else {
                  Account.rpc = rpc
                  Account.enode = enode
                  Account.signEnode = signEnode || ''
                  Account.address = address
                }
              })
            },
            clearLoginAccount: (address: string | null | undefined) => {
              set(state => {
                const Account = state.loginAccounts.find(item => {
                  return item.address == address
                })
                if (Account != undefined) {
                  const index = state.loginAccounts.indexOf(Account)
                  if (index > -1) {
                    state.loginAccounts.splice(index, 1)
                  }
                }
              })
            },
            getLoginAccount: (address: string | null | undefined) => {
              const Account = get().loginAccounts.find(item => {
                return item.address == address
              })
              return Account
            },
            setcreateGroupKeytype: (typeName: string) => {
              set(state => {
                state.createGroup.keytype = typeName
              })
            },
            setcreateGroupThreshold: (threshold: number) => {
              set(state => {
                state.createGroup.threshold = threshold
              })
            },
            addcreateGroupAdmin: () => {
              set(state => {
                state.createGroup.admins.push({
                  address: '',
                  key: Date.now()
                })
                state.createGroup.keyid = ''
              })
            },
            editcreateGroupAdmin: (index: number, address: string) => {
              set(state => {
                state.createGroup.admins[index].address = address
                state.createGroup.keyid = ''
              })
            },
            removecreateGroupAdminByindex: (index: number) => {
              set(state => {
                state.createGroup.admins.splice(index, 1)
                state.createGroup.keyid = ''
              })
            },
            setcreateGroupWalletName: (name: string) => {
              set(state => {
                state.createGroup.walletname = name
                state.createGroup.keyid = ''
              })
            },
            setcreateGroupWalletKeyID: (keyid: string) => {
              set(state => {
                state.createGroup.keyid = keyid
              })
            },
            setpollingPubKey: (pollingPubKey: PollingPubKey) => {
              set(state => {
                const list = state.pollingPubKey.filter(item => item.data.Key !== pollingPubKey.data.Key)
                state.pollingPubKey = list.concat(pollingPubKey)
              })
            },
            setWalletApproveList: (list: Array<TxApprove>) => {
              set(state => {
                state.approve.txApproveList = list
              })
            },
            hidenWalletApprove: (item: TxApprove) => {
              set(state => {
                state.approve.txApproveList.forEach(it => {
                  if (it.Key_id===item.Key_id) {
                    it.hiden = true
                  }
                })
              })
            },
            addWalletAccounts: (list: Array<walletaccount>) => {
              set(state => {
                list.forEach(item => {
                  const havefind = state.walletAccounts.find(it => {
                    return it.Mpc_address == item.Mpc_address && it.User_account == item.User_account
                  })
                  if (havefind == undefined) {
                    state.walletAccounts.push(item)
                  }
                })
              })
            },
            togglesideBar: () => {
              set(state => {
                state.sideBar = !state.sideBar
              })
            },
            resetCreateGroupAdmin: () => {
              set(state => {
                state.createGroup = intialState.createGroup
              })
            },
            getWalletAccounts: (address: string | null | undefined) => {
              const list = get().walletAccounts
              return list.filter(item => {
                return item.User_account === address
              })
            },
            getWalletAccount: (address: string | null | undefined, mpcAddress: string | undefined) => {
              const list = get().walletAccounts
              return list.find(item => {
                return item.User_account === address && item.Mpc_address === mpcAddress
              })
            },
            getTxApproveListByStatus:(status:number)=>{
              const list = get().approve.txApproveList.filter((item)=>{
                return item.Status==status
              })
              return list

            },
            getTxApproveByKeyID:(keyid:string|undefined)=>{
              const list = get().approve.txApproveList.find((item)=>{
                return item.Key_id==keyid
              })
              return list
            }
          }),
          { name: 'app-storage' }
        )
      )
    )
  )
}

const MyStoreContext = createContext<ReturnType<typeof createMyStore> | null>(null)

export const AppStoreProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = createMyStore(intialState)

  return <MyStoreContext.Provider value={store}>{children}</MyStoreContext.Provider>
}

export function useAppStore(): AppState
export function useAppStore<T>(selector: (store: AppState) => T, equalityFn?: (left: T, right: T) => boolean): T
export function useAppStore<T>(selector?: (store: AppState) => T, equalityFn?: (left: T, right: T) => boolean) {
  const store = useContext(MyStoreContext)

  if (!store) {
    throw new Error('MyStoreContext is not provided')
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useStore(store, selector as any, equalityFn)
}
