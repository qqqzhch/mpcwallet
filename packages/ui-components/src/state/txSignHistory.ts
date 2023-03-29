import { TxApprove } from './approve'

export interface TxtxSignHistory extends TxApprove {
  Txid: string
  Reply_status: string
  Reply_timestamp: string
  Local_timestamp: string
}

//  = TxApprove & Txinfo
