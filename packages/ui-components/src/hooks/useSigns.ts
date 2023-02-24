/* eslint @typescript-eslint/no-explicit-any: "off" */

import { useWeb3React } from '@web3-react/core'
import { useMemo, useCallback } from 'react'
// import {providers } from "ethers";
import { web3 } from '@monorepo/api'

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

export function useSignEnode(enode: string): {
  execute: () => Promise<any>
} {
  const { library } = useWeb3React()
  // const { signMessage } = useSign();
  return useMemo(() => {
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
