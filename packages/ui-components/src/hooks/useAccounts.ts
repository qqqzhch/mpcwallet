import useSWR from 'swr'
import { useAppStore } from '../state/index'
import { web3 } from '@monorepo/api'
import { getsmpc } from '@monorepo/api/src/web3'

import { useWeb3React } from '@web3-react/core'
import { walletaccount } from '../state/walletaccount'
import { useEffect, useState } from 'react'

async function fetcher(
  rpc: string,
  account: string | null | undefined
): Promise<
  | Array<{
      GroupID: string
      Accounts: Array<walletaccount>
    }>
  | undefined
> {
  if (account == null || account == undefined) {
    return
  }
  web3.setProvider(rpc)
  const res = await getsmpc().getAccounts(account, '0')

  if (res.Status === 'Error') {
    throw new Error('get Accounts info error ')
  }
  const {
    Data: {
      result: { Group: GroupData }
    }
  } = res
  return GroupData
}

export default function useAccounts() {
  const loginAccount = useAppStore(state => state.loginAccount)
  const { account } = useWeb3React()
  const setwalletAccounts = useAppStore(state => state.setwalletAccounts)
  const [list, setList] = useState<Array<walletaccount>>([])

  const { data, error, isLoading } = useSWR(account && loginAccount.rpc ? '/smpc/Accounts' : null, () => fetcher(loginAccount.rpc, account), {
    refreshInterval: 1000 * 15
  })

  useEffect(() => {
    if (data == undefined) {
      return
    }
    const arrPubKey: Array<string> = [],
      arrWalletaccount: Array<walletaccount> = []
    for (const obj1 of data) {
      for (const obj2 of obj1.Accounts) {
        if (!arrPubKey.includes(obj2.publicKey)) {
          // console.log(obj2)
          const obj3 = {
            publicKey: obj2.publicKey,
            gID: obj1.GroupID,
            mode: obj2.mode,
            name: obj2.publicKey.substr(2),
            timestamp: obj2.publicKey
          }
          arrWalletaccount.push(obj3)
          arrPubKey.push(obj2.publicKey)
        }
      }
    }

    setwalletAccounts(arrWalletaccount)
    setList(arrWalletaccount)
  }, [data, setwalletAccounts])

  return {
    data: list,
    error,
    isLoading
  }
}
/**
 * const getAccountList = useCallback(() => {
    if (rpc && account) {
      web3.setProvider(rpc);
      web3.smpc.getAccounts(account, "0").then(async (res: any) => {
        console.log(res);
        let arr = [],
          arr1: any = [],
          arr2 = [];
        if (res.Status !== "Error") {
          arr =
            res.Data.result && res.Data.result.Group
              ? res.Data.result.Group
              : [];
        }
        for (let obj1 of arr) {
          for (let obj2 of obj1.Accounts) {
            if (!arr1.includes(obj2.PubKey)) {
              // console.log(obj2)
              let obj3 = {
                publicKey: obj2.PubKey,
                gID: obj1.GroupID,
                mode: obj2.ThresHold,
                name: obj2.PubKey.substr(2),
                timestamp: obj2.TimeStamp,
              };
              arr2.push(obj3);
              arr1.push(obj2.PubKey);
            }
          }
        }
        // return arr2
        setAccountList(arr2);
      });
    }
  }, [account, rpc]);
 * **/
