/* eslint @typescript-eslint/no-explicit-any: "off" */

import { useWeb3React } from '@web3-react/core'
import { useMemo, useCallback } from 'react'
// import {providers } from "ethers";
import { web3 } from '@monorepo/api'
import { getsmpc } from '@monorepo/api/src/web3'

// import { walletApprove } from '../state/approve'
import { Unsigedtx } from '../utils/buildMpcTx'
import { walletaccount } from '../state/walletaccount'


interface chainTypes {
  [key: string]: number
}

const chainTypeName: chainTypes = {
  evm: 0
}


export function serverStatusIsSuccess(res:{Status:string}){
  if(res.Status.toLowerCase()=="success"){
    return true;
  }else{
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

// let nonceLocal = 0;
// mpc account Nonce
async function getNonce(account: any, rpc: any,evmChainID:number,chainType:string) {
  const isEvm= chainTypeName[chainType]==0?true:false;
  const nonceResult = await getsmpc(rpc).getNonce(account,evmChainID,isEvm,chainTypeName[chainType])
  /**
   * 第一个是mpc地址，第二个是如果是evm的话，就是chainID，否则话话填写0，第三个是是否是evm链，第四个是chain_type 0表示是evm类型。
  */

  // nonceLocal++;
  // return nonceLocal;
  return  ((nonceResult.Data)+1).toString()
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
        const result = await getsmpc(rpc).getGroupID(thresholdmode, nodeArr)

        let cbData = result
        if (result && typeof result === 'string') {
          cbData = JSON.parse(cbData)
        }
        let data = {}
        if (cbData.Status !== 'Error') {
          data = { msg: 'Success', info: cbData.Data }
        } else {
          data = { msg: 'Error', error: cbData.Tip }
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

        const signer = library.getSigner()
        let rsv = await signer.signMessage(JSON.stringify(data, null, 8))
        // 如果v是1b换成00 如果v是1c换成01
        rsv = rsv.slice(0, 130) + (rsv.slice(130) === '1b' ? '00' : '01')

        let cbData = await getsmpc().reqKeyGen(rsv, JSON.stringify(data, null, 8))

        let resultData: any = {}
        if (cbData && typeof cbData === 'string') {
          cbData = JSON.parse(cbData)
        }
        if (cbData.Status.toLowerCase() !== 'error') {
          resultData = { msg: 'Success', info: cbData.Data }
        } else {
          resultData = { msg: 'Error', error: cbData.Tip }
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
  execute?: (r: Unsigedtx, chainType: string,chainId:number) => Promise<any> | undefined
} {
  const { account, library } = useWeb3React()

  return useMemo(() => {
    if (!account || !library || !rpc) return {}
    return {
      execute: async (r: Unsigedtx, chainType: string,chainId:number) => {
        console.log('- -')
        web3.setProvider(rpc)
        const Nonce = await getNonce(account, rpc,chainId,chainType)
        const data = {
          ...r,
          nonce: parseFloat(Nonce),
          gas:parseFloat(r.gas.toString()),
          gasPrice:parseFloat(r.gasPrice.toString())
        }
        console.log(data,JSON.stringify(data, null, 8))
        
        const msgContext=JSON.stringify(data, null, 8);

        const cbData = await getsmpc().getUnsigedTransactionHash(msgContext, chainTypeName[chainType])

        let resultData: any = {}
        if (cbData.Status == 'success') {
          resultData = { msg: 'Success', info: cbData.Data,msgContext }
        } else {
          resultData = { msg: 'Error', error: cbData.Tip }
        }
        return resultData
      }
    }
  }, [account, library, rpc])
}

type msgHashType={hash:string,msg:string};
export function useTransactionSigner(rpc: string | undefined): {
  execute?: (wallet: walletaccount, chainType: string, MsgHash: msgHashType,chainId:number) => Promise<any> | undefined
} {
  const { account, library } = useWeb3React()

  return useMemo(() => {
    if (!account || !library || !rpc) return {}
    return {
      execute: async (wallet: walletaccount, chainType: string, MsgHash: msgHashType,chainId:number) => {
        web3.setProvider(rpc)
        // const Nonce = await getNonce(account, rpc,chainId,chainType)
        const Nonce = await library.getTransactionCount(account)
        const data = {
          TxType: 'SIGN',
          Account: account,
          Nonce:Nonce.toString(),
          PubKey: wallet.Public_key,
          InputCode: '',
          MsgHash:[MsgHash.hash],
          MsgContext:[MsgHash.msg],
          Keytype: wallet.Key_type,
          GroupID: wallet.Gid,
          ThresHold: wallet.Threshold,
          Mode: wallet.Mode,
          AcceptTimeOut: "604800",
          TimeStamp: Date.now().toString(),
          FixedApprover: null,
          Comment: '',
          ChainType: chainTypeName[chainType]
        }

        const signer = library.getSigner()
        let rsv = await signer.signMessage(JSON.stringify(data, null, 8))
        // 如果v是1b换成00 如果v是1c换成01
        rsv = rsv.slice(0, 130) + (rsv.slice(130) === '1b' ? '00' : '01')
        const cbData = await getsmpc().sign(rsv, JSON.stringify(data, null, 8))

        let resultData: any = {}

        if (cbData.Status == 'success') {
          resultData = { msg: 'Success', info: cbData.Data }
        } else {
          resultData = { msg: 'Error', error: cbData.Tip }
        }
        return resultData
      }
    }
  }, [account, library, rpc])
}

export function useTxApproveAccept(rpc: string | undefined): {
  execute?: (keyid: string, chainType: string, MsgHash: string[], MsgContext: string[], Accept: string,chainId:number) => Promise<any> | undefined
} {
  const { account, library } = useWeb3React()

  return useMemo(() => {
    if (!account || !library || !rpc) return {}
    return {
      execute: async (keyid: string, chainType: string, MsgHash: string[], MsgContext: string[], Accept: string,chainId:number) => {
        web3.setProvider(rpc)
        // const Nonce = await getNonce(account, rpc,chainId,chainType)
        const Nonce = await library.getTransactionCount(account)
        const data = {
          TxType: 'ACCEPTSIGN',
          Account: account,
          Nonce:Nonce.toString(),
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
        const cbData = await getsmpc().acceptSign(rsv, JSON.stringify(data, null, 8))

        return cbData
      }
    }
  }, [account, library, rpc])
}
