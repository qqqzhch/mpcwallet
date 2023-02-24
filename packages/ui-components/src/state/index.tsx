import { createStore, useStore } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import React, { createContext, FC, useContext } from 'react'

interface AppState {
  counter: number
  loginAccount: {
    rpc: string
    enode: string
    signEnode: string
  }
  increase: (by: number) => void
  setLoginAccount: (rpc: string, enode: string, signEnode?: string) => void
  clearLoginAccount: () => void
}

const intialState = {
  counter: 0,
  loginAccount: {
    rpc: '',
    enode: '',
    signEnode: ''
  }
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
            setLoginAccount: (rpc: string, enode: string, signEnode?: string) => {
              set(state => {
                state.loginAccount.rpc = rpc
                state.loginAccount.enode = enode
                state.loginAccount.signEnode = signEnode || ''
              })
            },
            clearLoginAccount: () => {
              set(state => {
                state.loginAccount.rpc = ''
                state.loginAccount.enode = ''
                state.loginAccount.signEnode = ''
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
