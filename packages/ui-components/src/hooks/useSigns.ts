/* eslint @typescript-eslint/no-explicit-any: "off" */

import { useWeb3React } from '@web3-react/core'
import { useMemo, useCallback } from 'react'
// import {providers } from "ethers";
import { web3 } from '@monorepo/api'
import { getsmpc } from '@monorepo/api/src/web3'

import { walletApprove } from '../state/approve'

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
async function getNonce(account: any, rpc: any) {
  web3.setProvider(rpc)
  const nonceResult = await getsmpc().getReqAddrNonce(account)
  // nonceLocal++;
  // return nonceLocal;
  return nonceResult.Data.result
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
        web3.setProvider(rpc)

        const result = await getsmpc().getGroupID(thresholdmode, nodeArr)
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
        const nonce = await getNonce(account, rpc)
        const data = {
          TxType: 'REQSMPCADDR',
          Account: account,
          Nonce: nonce,
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
        if (cbData.Status !== 'Error') {
          resultData = { msg: 'Success', info: cbData.Data }
        } else {
          resultData = { msg: cbData.Error || 'Error', error: cbData.Tip }
        }
        return resultData
      }
    }
  }, [account, library, gID, ThresHold, Sigs, keytype, rpc, Uuid])
}

export function useApproveReqSmpcAddress(rpc: string | undefined): {
  execute?: (r: walletApprove, type: string) => Promise<any> | undefined
} {
  const { account, library } = useWeb3React()

  return useMemo(() => {
    if (!account || !library || !rpc) return {}
    return {
      execute: async (r: walletApprove, type: string) => {
        const { Key } = r

        web3.setProvider(rpc)
        const Nonce = await getNonce(account, rpc)
        const data = {
          TxType: 'ACCEPTREQADDR',
          Account: account,
          Nonce,
          Key,
          Accept: type, // DISAGREE
          TimeStamp: Date.now().toString()
        }

        const signer = library.getSigner()
        let rsv = await signer.signMessage(JSON.stringify(data, null, 8))
        // 如果v是1b换成00 如果v是1c换成01
        rsv = rsv.slice(0, 130) + (rsv.slice(130) === '1b' ? '00' : '01')
        let cbData = await getsmpc().acceptKeyGen(rsv, JSON.stringify(data, null, 8))

        let resultData: any = {}
        if (cbData && typeof cbData === 'string') {
          cbData = JSON.parse(cbData)
        }
        if (cbData.Status !== 'Error') {
          resultData = { msg: 'Success', info: cbData.Data.result }
        } else {
          resultData = { msg: 'Error', error: cbData.Tip }
        }
        return resultData
      }
    }
  }, [account, library, rpc])
}
