import {ethers } from 'ethers'

export type TxInput = {
    from:string,
    to:string,
    gas:number,
    gasPrice:number,
    originValue:string,
    name:string
}
export type Unsigedtx =TxInput&{
    chainId:string
    value:string,
    data:string
    nonce?:number
}

export function buidTransactionJson(chainType:string,chainId:string,data:TxInput):Unsigedtx{
    return {
        ...data,
        chainId:ethers.utils.hexValue(chainId),
        value:ethers.utils.hexValue(data.originValue),
        data:""
    }


}