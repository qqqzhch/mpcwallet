import { createStore,useStore } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from "zustand/middleware/immer";
import React, { createContext, FC, useContext } from "react";
import { L1ChainInfo,L2ChainInfo } from '../constants/chainInfo';
import { get } from 'immer/dist/internal';



interface AppState {
  counter: number
  increase: (by: number) => void
  fromChain:L1ChainInfo|L2ChainInfo|null
  toChain:L1ChainInfo|L2ChainInfo|null
  setFromOrTOChain:(data:L1ChainInfo|L2ChainInfo,dataType:boolean )=>void
  getFromChain:()=>L1ChainInfo|L2ChainInfo|null
  getToChain:()=>L1ChainInfo|L2ChainInfo|null
}

const intialState = {
  counter: 5,
  fromChain:null,
  toChain:null
};


const createMyStore = (state: typeof intialState = intialState) => {
  return createStore<AppState, [['zustand/devtools', never], ["zustand/immer", never], ["zustand/persist", AppState]]>(
    devtools(immer(persist((set,get) => ({
      ...state,
      increase: () =>
        set((state) => {
          state.counter++;
        }),
      setFromOrTOChain:(data:L1ChainInfo|L2ChainInfo,dataType:boolean)=>{
        if(dataType){
         set((state)=>{
          state.fromChain=data
         })
        }else{
          set((state)=>{
            state.toChain=data
           })
        }
      },
      getFromChain(){
        const data = get().fromChain
        return data
      },
      getToChain() {
        const data = get().toChain        
        return data
      },
    }), { name: 'app-storage' })))
  );
};

const MyStoreContext = createContext<ReturnType<typeof createMyStore> | null>(
  null
);





export const AppStoreProvider:FC<{children:React.ReactNode}> = ({children}) => {

  const store = createMyStore({counter:0});
  
  return (<MyStoreContext.Provider value={store}>{children}</MyStoreContext.Provider>)
};

export function useAppStore(): AppState;
export function useAppStore<T>(
  selector: (store: AppState) => T,
  equalityFn?: (left: T, right: T) => boolean
): T;
export function useAppStore<T>(
  selector?: (store: AppState) => T,
  equalityFn?: (left: T, right: T) => boolean
) {
  const store = useContext(MyStoreContext);

  if (!store) {
    throw new Error("MyStoreContext is not provided");
  }

  return useStore(store, selector as any, equalityFn);
}

