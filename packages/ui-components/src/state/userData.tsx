import { createStore, useStore } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import React, { createContext, FC, useContext } from 'react'

export interface UserState {
  counter: number
}

const intialState = {
  counter: 0
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
