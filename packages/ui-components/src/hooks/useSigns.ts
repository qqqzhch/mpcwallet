/* eslint @typescript-eslint/no-explicit-any: "off" */

import { useWeb3React } from '@web3-react/core'
import { useMemo, useCallback } from 'react'
// import {providers } from "ethers";
import { web3 } from '@monorepo/api'
import { getsmpc } from '@monorepo/api/src/web3'

// import { walletApprove } from '../state/approve'
import { Unsigedtx } from '../utils/buildMpcTx'
import { walletaccount } from '../state/walletaccount'
import { useParams } from 'react-router-dom'
import { chainTypeName } from '../constants/chainTypeName'
import addAssertType from '../state/addAssert'
import { useAppStore } from '..'

// interface chainTypes {
//   [key: string]: number
// }

// const chainTypeName: chainTypes = {
//   evm: 0
// }

type metamaskError = {
  reason: string
  message: string
}

export function serverStatusIsSuccess(res: { Status: string }) {
  if (res !== undefined && res.Status.toLowerCase() == 'success') {
    return true
  } else {
    return false
  }
}

// export function getServerError(data:){

// }

export function eNodeCut(enode: any) {
  const obj = {
    key: '',
    ip: '',
    enode: ''
  }
  if (!enode || enode.indexOf('enode://') === -1 || enode.indexOf('@') === -1) return obj
  const enodeObj: any = enode.match(/enode:\/\/(\S*)@/)
  const ip = enode.match(/@(\S*)/)[1]
  // console.log(enodeObj)
  // console.log(ip)
  return {
    key: enodeObj[1],
    ip: ip,
    enode: enodeObj.input
  }
}

// mpc account Nonce
async function getNonce(
  account: any,
  rpc: any,
  evmChainID: number,
  chainType: string,
  setCachecacheNonce: (address: string, nonce: number) => void,
  getCacheNonce: (address: string | undefined) => number | undefined
) {
  const nonceLocal = getCacheNonce(account)
  const isEvm = chainTypeName[chainType] == 0 ? true : false
  const nonceResult = await getsmpc(rpc).getNonce(account, evmChainID, isEvm, chainTypeName[chainType])
  let nonce = nonceResult.Data + 1
  if (nonceLocal == undefined || nonceResult.Data >= nonceLocal) {
    nonce = nonceResult.Data + 1
    setCachecacheNonce(account, nonce)
  } else {
    nonce = nonceLocal
  }

  return nonce.toString()
}

export function useSign(): any {
  const { account, library, chainId } = useWeb3React()

  const signMessage = useCallback(
    (hash: any) => {
      return new Promise(resolve => {
        const params = [account, hash]
        const method = 'eth_sign'
        // console.log(params);
        if (library) {
          library
            .send(method, params)
            .then((res: any) => {
              // console.log(res);
              // return result;
              const rsv = res.indexOf('0x') === 0 ? res.replace('0x', '') : res
              const v0 = parseInt('0x' + rsv.substr(128))
              const v = Number(chainId) * 2 + 35 + Number(v0) - 27
              const result = {
                rsv: res,
                r: rsv.substr(0, 64),
                s: rsv.substr(64, 64),
                v0: Number(v0) - 27 === 0 ? '00' : '01',
                v: web3.utils.toHex(v).replace('0x', ''),
                v1: rsv.substr(128)
              }
              resolve(result)
            })
            .catch((error: any) => {
              console.error('Could not sign', error)
              resolve('')
            })
        } else {
          resolve('')
        }
      })
    },
    [library, chainId, account]
  )
  return {
    signMessage
  }
}

export function useSignEnode(enode: string | undefined): {
  execute?: () => Promise<any> | undefined
} {
  const { library } = useWeb3React()
  // const { signMessage } = useSign();
  return useMemo(() => {
    if (!enode || !library) return {}
    return {
      execute: async () => {
        const eNodeKey = eNodeCut(enode).key
        // const provider = new ethers.providers.Web3Provider(library.provider);
        // const signer = provider.getSigner();
        // console.log(eNodeKey)

        // const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(eNodeKey));

        // const hash = ethers.utils.keccak256('0x' + (eNodeKey))
        // const hash = ethers.utils.hashMessage(eNodeKey)
        // const hash = eNodeKey;
        // const result = await signer.signMessage(eNodeKey);
        // const result = await signer.signMessage(hash);

        const signer = library.getSigner()
        let rsv = await signer.signMessage(eNodeKey)
        rsv = rsv.slice(0, 130) + (rsv.slice(130) === '1b' ? '00' : '01')
        return rsv

        // const result = await signMessage(hash);
        // if (!result) {
        //   message.info("no sign");
        //   return;
        // }

        // const rsvFormat = "0x" + result.r + result.s + result.v0;
        // return rsvFormat;
      }
    }
  }, [enode, library])
}

export function useCreateGroup(
  rpc: string | undefined,
  thresholdmode: string,
  nodeArr: Array<string>
): {
  execute?: () => Promise<any> | undefined
} {
  return useMemo(() => {
    if (!thresholdmode || nodeArr.length <= 0 || !rpc) return {}
    return {
      execute: async () => {
        let errmsg = ''
        let result
        try {
          result = await getsmpc(rpc).getGroupID(thresholdmode, nodeArr)
        } catch (error: unknown) {
          errmsg = (error as Error).message
        }
        let data = {}
        if (serverStatusIsSuccess(result)) {
          data = { msg: 'success', info: result.Data }
        } else {
          data = { msg: 'error', error: errmsg || result.Tip }
        }
        return data
      }
    }
  }, [thresholdmode, nodeArr, rpc])
}

export function useReqSmpcAddress(
  rpc: string | undefined,
  gID: string,
  ThresHold: string,
  Sigs: string,
  keytype: string,
  Uuid: string
): {
  execute?: () => Promise<any>
} {
  const { account, library } = useWeb3React()
  // const { signMessage } = useSign();
  return useMemo(() => {
    if (!library || !account || !gID || !ThresHold || !Sigs || !keytype || !Uuid || !rpc) return {}
    return {
      execute: async () => {
        web3.setProvider(rpc)
        const nonce = await library.getTransactionCount(account)
        const data = {
          TxType: 'REQSMPCADDR',
          Account: account,
          Nonce: String(nonce),
          keytype,
          GroupId: gID,
          ThresHold: ThresHold,
          Mode: '2',
          AcceptTimeOut: '604800', // AcceptTimeOut: "60", // 测试超时用
          TimeStamp: Date.now().toString(),
          Sigs,
          Comment: '',
          Uuid
        }
        console.info('Sigs', Sigs)
        let errmsg
        const signer = library.getSigner()
        let cbData
        try {
          let rsv = await signer.signMessage(JSON.stringify(data, null, 8))
          // 如果v是1b换成00 如果v是1c换成01
          rsv = rsv.slice(0, 130) + (rsv.slice(130) === '1b' ? '00' : '01')

          cbData = await getsmpc().reqKeyGen(rsv, JSON.stringify(data, null, 8))
        } catch (error: unknown) {
          const errinfo = error as metamaskError
          errmsg = errinfo.reason || errinfo.message
        }

        let resultData: any = {}
        if (serverStatusIsSuccess(cbData)) {
          resultData = { msg: 'success', info: cbData.Data }
        } else {
          resultData = { msg: 'error', error: errmsg || cbData.Tip }
        }
        return resultData
      }
    }
  }, [account, library, gID, ThresHold, Sigs, keytype, rpc, Uuid])
}

// export function useApproveReqSmpcAddress(rpc: string | undefined): {
//   execute?: (r: walletApprove, type: string) => Promise<any> | undefined
// } {
//   const { account, library } = useWeb3React()

//   return useMemo(() => {
//     if (!account || !library || !rpc) return {}
//     return {
//       execute: async (r: walletApprove, type: string) => {
//         const { Key } = r

//         web3.setProvider(rpc)
//         const Nonce = await getNonce(account, rpc)
//         const data = {
//           TxType: 'ACCEPTREQADDR',
//           Account: account,
//           Nonce,
//           Key,
//           Accept: type, // DISAGREE
//           TimeStamp: Date.now().toString()
//         }

//         const signer = library.getSigner()
//         let rsv = await signer.signMessage(JSON.stringify(data, null, 8))
//         // 如果v是1b换成00 如果v是1c换成01
//         rsv = rsv.slice(0, 130) + (rsv.slice(130) === '1b' ? '00' : '01')
//         let cbData = await getsmpc().acceptKeyGen(rsv, JSON.stringify(data, null, 8))

//         let resultData: any = {}
//         if (cbData && typeof cbData === 'string') {
//           cbData = JSON.parse(cbData)
//         }
//         if (cbData.Status !== 'Error') {
//           resultData = { msg: 'Success', info: cbData.Data.result }
//         } else {
//           resultData = { msg: 'Error', error: cbData.Tip }
//         }
//         return resultData
//       }
//     }
//   }, [account, library, rpc])
// }

export function useGetTxMsgHash(rpc: string | undefined): {
  execute?: (r: Unsigedtx, chainType: string, chainId: number) => Promise<any> | undefined
} {
  const { account, library } = useWeb3React()
  const { address: mpcAddress } = useParams<{ address: string }>()
  const setCachecacheNonce = useAppStore(state => state.setCacheNonce)
  const getCacheNonce = useAppStore(state => state.getCacheNonce)

  return useMemo(() => {
    if (!account || !library || !rpc || !mpcAddress) return {}
    return {
      execute: async (r: Unsigedtx, chainType: string, chainId: number) => {
        web3.setProvider(rpc)
        let cbData, msgContext, errmsg
        try {
          const Nonce = await getNonce(mpcAddress, rpc, chainId, chainType, setCachecacheNonce, getCacheNonce)
          const data = {
            ...r,
            nonce: parseFloat(Nonce),
            gas: parseFloat(r.gas.toString()),
            gasPrice: parseFloat(r.gasPrice.toString())
          }

          msgContext = JSON.stringify(data, null, 8)

          cbData = await getsmpc().getUnsigedTransactionHash(msgContext, chainTypeName[chainType])
        } catch (error: unknown) {
          const errinfo = error as metamaskError
          errmsg = errinfo.reason || errinfo.message
        }

        let resultData: any = {}
        if (serverStatusIsSuccess(cbData)) {
          resultData = { msg: 'success', info: cbData.Data, msgContext }
        } else {
          resultData = { msg: 'error', error: errmsg || cbData.Tip }
        }
        return resultData
      }
    }
  }, [account, library, rpc, mpcAddress, setCachecacheNonce, getCacheNonce])
}

type msgHashType = { hash: string; msg: string }

export function useTransactionSigner(rpc: string | undefined): {
  execute?: (wallet: walletaccount, chainType: string, MsgHash: msgHashType, chainId: number) => Promise<any> | undefined
} {
  const { account, library } = useWeb3React()
  const increaseCacheNonce = useAppStore(state => state.increaseCacheNonce)

  return useMemo(() => {
    if (!account || !library || !rpc) return {}
    return {
      execute: async (wallet: walletaccount, chainType: string, MsgHash: msgHashType, chainId: number) => {
        web3.setProvider(rpc)
        let cbData, errmsg
        try {
          const Nonce = await library.getTransactionCount(account)
          const data = {
            TxType: 'SIGN',
            Account: account,
            Nonce: Nonce.toString(),
            PubKey: wallet.Public_key,
            InputCode: '',
            MsgHash: [MsgHash.hash],
            MsgContext: [MsgHash.msg],
            Keytype: wallet.Key_type,
            GroupID: wallet.Gid,
            ThresHold: wallet.Threshold,
            Mode: wallet.Mode,
            AcceptTimeOut: '604800',
            TimeStamp: Date.now().toString(),
            FixedApprover: null,
            Comment: '',
            ChainType: chainTypeName[chainType]
          }

          const signer = library.getSigner()
          let rsv = await signer.signMessage(JSON.stringify(data, null, 8))
          // 如果v是1b换成00 如果v是1c换成01
          rsv = rsv.slice(0, 130) + (rsv.slice(130) === '1b' ? '00' : '01')
          cbData = await getsmpc().sign(rsv, JSON.stringify(data, null, 8))
        } catch (error: unknown) {
          const errinfo = error as metamaskError
          errmsg = errinfo.reason || errinfo.message
        }

        let resultData: any = {}

        if (serverStatusIsSuccess(cbData)) {
          increaseCacheNonce(wallet.Mpc_address)
          resultData = { msg: 'success', info: cbData.Data }
        } else {
          resultData = { msg: 'error', error: errmsg || cbData.Tip }
        }
        return resultData
      }
    }
  }, [account, library, rpc, increaseCacheNonce])
}

export function useTxApproveAccept(rpc: string | undefined): {
  execute?: (keyid: string, chainType: string, MsgHash: string[], MsgContext: string[], Accept: string, chainId: number) => Promise<any> | undefined
} {
  const { account, library } = useWeb3React()

  return useMemo(() => {
    if (!account || !library || !rpc) return {}
    return {
      execute: async (keyid: string, chainType: string, MsgHash: string[], MsgContext: string[], Accept: string, chainId: number) => {
        web3.setProvider(rpc)
        let cbData, errmsg
        try {
          const Nonce = await library.getTransactionCount(account)
          const data = {
            TxType: 'ACCEPTSIGN',
            Account: account,
            Nonce: Nonce.toString(),
            Key: keyid,
            Accept,
            MsgHash,
            MsgContext,
            TimeStamp: Date.now().toString(),
            ChainType: chainTypeName[chainType]
          }

          const signer = library.getSigner()
          let rsv = await signer.signMessage(JSON.stringify(data, null, 8))
          // 如果v是1b换成00 如果v是1c换成01
          rsv = rsv.slice(0, 130) + (rsv.slice(130) === '1b' ? '00' : '01')
          cbData = await getsmpc().acceptSign(rsv, JSON.stringify(data, null, 8))
        } catch (error: unknown) {
          const errinfo = error as metamaskError
          errmsg = errinfo.reason || errinfo.message
        }
        let resultData
        if (serverStatusIsSuccess(cbData)) {
          resultData = { msg: 'success', info: cbData.Data }
        } else {
          resultData = { msg: 'error', error: errmsg || cbData.Tip }
        }

        return resultData
      }
    }
  }, [account, library, rpc])
}

export function useAddAssetSigner(rpc: string | undefined): {
  execute?: (wallet: walletaccount, chainType: string, Msg: addAssertType, chainId: number) => Promise<any> | undefined
} {
  const { account, library } = useWeb3React()

  return useMemo(() => {
    if (!account || !library || !rpc) return {}
    return {
      execute: async (wallet: walletaccount, chainType: string, Msg: addAssertType, chainId: number) => {
        web3.setProvider(rpc)
        let cbData, errmsg
        try {
          const Nonce = await library.getTransactionCount(account)
          const data = {
            ...Msg,
            TxType: 'ADDASSET',
            Account: account,
            Nonce: Nonce.toString(),

            TimeStamp: Date.now().toString(),
            ChainId: chainId,
            ChainType: chainTypeName[chainType]
          }

          const signer = library.getSigner()
          let rsv = await signer.signMessage(JSON.stringify(data, null, 8))
          // 如果v是1b换成00 如果v是1c换成01
          rsv = rsv.slice(0, 130) + (rsv.slice(130) === '1b' ? '00' : '01')
          cbData = await getsmpc().addAsset(rsv, JSON.stringify(data, null, 8))
        } catch (error: unknown) {
          const errinfo = error as metamaskError
          errmsg = errinfo.reason || errinfo.message
        }

        let resultData: any = {}

        if (serverStatusIsSuccess(cbData)) {
          resultData = { msg: 'success', info: cbData.Data }
        } else {
          resultData = { msg: 'error', error: errmsg || cbData.Tip }
        }
        return resultData
      }
    }
  }, [account, library, rpc])
}
