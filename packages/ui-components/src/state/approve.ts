export interface TxApprove {
  User_account: string
  Group_id: string
  Key_id: string
  Key_type: string
  Mode: number
  Msg_context: Array<string>
  Msg_hash: Array<string>
  Nonce: string
  Public_key: boolean
  Mpc_address:string
  Threshold:string
  Status:number,
  hiden?:boolean,
  TimeStamp:string
  Txid?:string
  Reply_status?:string
  Reply_timestamp?:string
}

export const txApproveListintial = []
