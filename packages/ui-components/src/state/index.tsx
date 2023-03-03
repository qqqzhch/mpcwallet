import { createStore, useStore } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import React, { createContext, FC, useContext } from 'react'
import { walletApprove } from './approve'
import { walletaccount } from './walletaccount'

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

export interface AppState {
  counter: number
  loginAccount: {
    rpc: string
    enode: string
    signEnode: string
    address: string
  }
  createGroup: {
    admins: Array<adminInfo>
    keytype: string
    threshold: number
    walletname: string
    keyid: string
  }
  approve: {
    walletApproveList: Array<walletApprove>
  }
  walletAccounts: Array<walletaccount>
  pollingPubKey: Array<PollingPubKey>
  increase: (by: number) => void
  setLoginAccount: (rpc: string, enode: string, adress: string, signEnode?: string) => void
  clearLoginAccount: () => void
  setcreateGroupKeytype: (keytype: string) => void
  setcreateGroupThreshold: (threshold: number) => void
  addcreateGroupAdmin: () => void
  removecreateGroupAdminByindex: (index: number) => void
  setcreateGroupWalletName: (name: string) => void
  editcreateGroupAdmin: (index: number, name: string) => void
  setpollingPubKey: (pollingPubKey: PollingPubKey) => void
  setWalletApproveList: (list: Array<walletApprove>) => void
  hidenWalletApprove: (item: walletApprove) => void
  setwalletAccounts: (list: Array<walletaccount>) => void
  setcreateGroupWalletKeyID: (keyid: string) => void
}

export const intialState = {
  counter: 0,
  loginAccount: {
    rpc: '',
    enode: '',
    signEnode: '',
    address: ''
  },
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
    walletApproveList: []
  },
  walletAccounts: []
}

const createMyStore = (state: typeof intialState = intialState) => {
  return createStore<AppState, [['zustand/devtools', never], ['zustand/immer', never], ['zustand/persist', AppState]]>(
    devtools(
      immer(
        persist(
          set => ({
            ...state,
            increase: () => {
              set(state => {
                state.counter++
              })
            },
            setLoginAccount: (rpc: string, enode: string, address: string, signEnode?: string) => {
              set(state => {
                state.loginAccount.rpc = rpc
                state.loginAccount.enode = enode
                state.loginAccount.signEnode = signEnode || ''
                state.loginAccount.address = address
              })
            },
            clearLoginAccount: () => {
              set(state => {
                state.loginAccount.rpc = ''
                state.loginAccount.enode = ''
                state.loginAccount.signEnode = ''
                state.loginAccount.address = ''
              })
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
            setWalletApproveList: (list: Array<walletApprove>) => {
              set(state => {
                state.approve.walletApproveList = list
              })
            },
            hidenWalletApprove: (item: walletApprove) => {
              set(state => {
                state.approve.walletApproveList.forEach(it => {
                  if (it.GroupID == item.GroupID && it.Account == item.Account && it.TimeStamp == it.TimeStamp) {
                    it.show = false
                  }
                })
              })
            },
            setwalletAccounts: (list: Array<walletaccount>) => {
              set(state => {
                state.walletAccounts = list
              })
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
