import { createStore, useStore } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import React, { createContext, FC, useContext } from 'react'


type addressNameType = {address:string,name:string};

export interface UserState {
  counter: number,
  addressNameList:Array<addressNameType>,
  increase: (by: number) => void,
  setAddressName:(address:string,name:string)=>void,
  getAddressName:(address:string|undefined)=>string
}

const intialState = {
  counter: 0,
  addressNameList:[]
}

const createMyStore = (state: typeof intialState = intialState) => {
  return createStore<UserState, [['zustand/devtools', never], ['zustand/immer', never], ['zustand/persist', UserState]]>(
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
            setAddressName:(address:string,name:string)=>{
              if(address!==undefined&&address!=""){
                set(state=>{

                 const result = state.addressNameList.find((item)=>item.address.toLowerCase()==address.toLowerCase())
                 if(result==undefined){
                  state.addressNameList.push({
                    address,
                    name
                  })
                 }else{
                  result.name=name
                 }

                })
              }
            
            },
            getAddressName:(address:string|undefined)=>{
              if(address==undefined){
                return ""
              }
              const result =  get().addressNameList.find((item)=>item.address.toLowerCase()==address.toLowerCase())
              if(result==undefined){
                return ""
              }else{
                return result.name

              }
              
            }

          }),
          { name: 'user-storage-v1' }
        )
      )
    )
  )
}

const UserStoreContext = createContext<ReturnType<typeof createMyStore> | null>(null)

export const UserStoreProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = createMyStore(intialState)

  return <UserStoreContext.Provider value={store}>{children}</UserStoreContext.Provider>
}

export function useUserStore(): UserState
export function useUserStore<T>(selector: (store: UserState) => T, equalityFn?: (left: T, right: T) => boolean): T
export function useUserStore<T>(selector?: (store: UserState) => T, equalityFn?: (left: T, right: T) => boolean) {
  const store = useContext(UserStoreContext)

  if (!store) {
    throw new Error('UserStoreContext is not provided')
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useStore(store, selector as any, equalityFn)
}
