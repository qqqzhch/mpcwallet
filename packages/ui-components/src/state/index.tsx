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
  },
  createGroup:{
    admins:Array<string>,
    keytype:string,
    threshold:number,
    walletname:string
  },
  increase: (by: number) => void
  setLoginAccount: (rpc: string, enode: string, signEnode?: string) => void
  clearLoginAccount: () => void
  setcreateGroupKeytype:(keytype:string)=>void
  setcreateGroupThreshold:(threshold:number)=>void
  addcreateGroupAdmin:()=>void
  removecreateGroupAdminByindex:(index:number)=>void
  setcreateGroupWalletName:(name:string)=>void
  editcreateGroupAdmin:(index:number,name:string)=>void
}

const intialState = {
  counter: 0,
  loginAccount: {
    rpc: '',
    enode: '',
    signEnode: ''
  },
  createGroup:{
    admins:["",""],
    keytype:"EC256k1",
    threshold:0,
    walletname:""
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
            },
            setcreateGroupKeytype:(typeName:string)=>{
              set(state=>{
                state.createGroup.keytype=typeName
              })
            },
            setcreateGroupThreshold:(threshold:number)=>{
              set(state=>{
                state.createGroup.threshold=threshold
              })
            },
            addcreateGroupAdmin:()=>{
              set(state=>{
                state.createGroup.admins.push("")
              })
            },
            editcreateGroupAdmin:(index:number,name:string)=>{
              set(state=>{
                state.createGroup.admins[index]=name
              })
            },
            removecreateGroupAdminByindex:(index:number)=>{
              set(state=>{
                state.createGroup.admins.splice(index,1)
              })
            },
            setcreateGroupWalletName:(name:string)=>{
              set(state=>{
                state.createGroup.walletname=name
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
