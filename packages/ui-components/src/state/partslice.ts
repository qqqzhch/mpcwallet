import { TxApprove } from './approve'
// import { walletaccount } from './walletaccount'
import { StateCreator } from 'zustand'
//https://github.com/pmndrs/zustand/blob/main/docs/guides/typescript.md
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
  }
  approve: {
    txApproveList: Array<TxApprove>
  }
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
  // setWalletApproveList: (list: Array<TxApprove>) => void
  // hidenWalletApprove: (item: TxApprove) => void
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
    walletname: ''
  },
  pollingPubKey: [],
  approve: {
    txApproveList: []
  }
}
export const createPartSlice: StateCreator<AppState, [], [], AppState> = set => ({
  ...intialState,
  increase: () => set(state => ({ counter: state.counter + 1 })),
  setLoginAccount: (rpc: string, enode: string, address: string, signEnode?: string) => {
    set(state => ({
      loginAccount: {
        rpc: rpc,
        enode: enode,
        signEnode: signEnode || '',
        address: address
      }
    }))
  },
  clearLoginAccount: () => {
    set(state => ({
      loginAccount: {
        rpc: '',
        enode: '',
        signEnode: '',
        address: ''
      }
    }))
  },
  setcreateGroupKeytype: (typeName: string) => {
    set(state => ({
      createGroup: {
        ...state.createGroup,
        keytype: typeName
      }
    }))
  },
  setcreateGroupThreshold: (threshold: number) => {
    set(state => ({
      createGroup: {
        ...state.createGroup,
        threshold: threshold
      }
    }))
  },
  addcreateGroupAdmin: () => {
    set(state => ({
      createGroup: {
        ...state.createGroup,
        admins: [
          {
            address: '',
            key: Date.now()
          }
        ].concat(state.createGroup.admins)
      }
    }))
  },
  editcreateGroupAdmin: (index: number, address: string) => {
    set(state => {
      state.createGroup.admins[index].address = address
      return {
        createGroup: state.createGroup
      }
    })
  },
  removecreateGroupAdminByindex: (index: number) => {
    set(state => {
      state.createGroup.admins.splice(index, 1)
      return {
        createGroup: state.createGroup
      }
    })
  },
  setcreateGroupWalletName: (name: string) => {
    set(state => {
      state.createGroup.walletname = name
      return {
        createGroup: state.createGroup
      }
    })
  },
  setpollingPubKey: (pollingPubKey: PollingPubKey) => {
    set(state => {
      const list = state.pollingPubKey.filter(item => item.data.Key !== pollingPubKey.data.Key)
      state.pollingPubKey = list.concat(pollingPubKey)
      return {
        pollingPubKey: state.pollingPubKey
      }
    })
  }
  // setWalletApproveList:()=>{

  // },
  // hidenWalletApprove:()=>{

  // }
})
