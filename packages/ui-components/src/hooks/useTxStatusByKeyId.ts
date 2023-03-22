import useSWR from 'swr'
import { useAppStore } from '../state/index'
import { web3 } from '@monorepo/api'
import { getsmpc } from '@monorepo/api/src/web3'

import { useWeb3React } from '@web3-react/core'
import { walletaccount } from '../state/walletaccount'
import { useEffect, useState } from 'react'
import { rpclist } from '../constants/rpcConfig'

async function fetcher(KeyId: string | null | undefined): Promise<string|undefined> {
  if (KeyId == null || KeyId == undefined) {
    return
  }
  
  const res = await getsmpc(rpclist[0]).getTxStatusByKeyId(KeyId)

  if (res.Status === 'Error') {
    throw new Error('get Accounts info error ')
  }

  return res.Data
}
//0:pending , 1 SUCCESS , 2 FAIL, 3 Timeout, 4 Tx-Pending, 5 Tx-Confirmed, 6 Tx-Failed

const statusCode:{[Key:string]:string}={
    "0":"pending" , 
    "1":"SUCCESS" , 
    "2":"FAIL", 
    "3":"Timeout", 
    "4":"Tx-Pending", 
    "5":"Tx-Confirmed", 
    "6":"Tx-Failed",
    "7":"Tx-NotValid"
}

export default function useTxStatusByKeyId(KeyId:string|undefined,refreshInterval:number) {
  

  const { data, error, isLoading } = useSWR(KeyId ? '/smw/getTxStatusByKeyId' : null, () => fetcher(KeyId), {
    refreshInterval: refreshInterval||1000 * 15
  })

  return {
    data: {
        code:data,
        text:data!=undefined?statusCode[data]:"~"
    },
    error,
    isLoading
  }
}