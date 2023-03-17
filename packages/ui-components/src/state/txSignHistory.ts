import { TxApprove } from "./approve";

interface Txinfo {
    Txid:string
    Reply_status:string
    Reply_timestamp:string
}

export type TxtxSignHistory=TxApprove&Txinfo


