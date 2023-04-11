import { FC, useCallback, useMemo } from 'react'

import { When, If, Then, Else } from 'react-if'
import Avvvatars from 'avvvatars-react'
import AddressName from '../walletList/addressName'
import ScanTxUrl from '../mpcinfo/scanTxUrl'
import dayjs from '../../utils/dayjs'
import { BigNumber } from 'ethers'
import { getChainInfo } from '../../constants/chainInfo'
import { Unsigedtx } from '../../utils/buildMpcTx'
import { TxtxSignHistory } from '../../state/txSignHistory'
import { TxApprove } from '../../state/approve'
import useTxHashByKeyId from '../../hooks/useTxHashByKeyId'
import { gasFee, formatUnits } from '../../utils/index'

//Unsigedtx[]
type Props = {
  txList: Unsigedtx[]
  item: TxtxSignHistory | TxApprove
  erc20to?: string
}
// type tokenTxType = {
//   [key: number]: {
//     to: string
//     tokenAmount: string
//   }
// }

const TxApproveItemLeft: FC<Props> = ({ txList, item, erc20to }) => {
  const { data: txhashInfo } = useTxHashByKeyId(item?.Key_id)
  // const [txtokenTxInfo] = useState<tokenTxType>({})
  //const [txtokenTxInfo, settxtokenTxInfo] = useState<tokenTxType>({})
  // const [txAmount] = useState<string>('')
  // const [txAmount, setTxAmount] = useState<string>('')
  const chainIdNum = useMemo(() => {
    return BigNumber.from(txList[0].chainId).toNumber()
  }, [txList])

  const getChain = useCallback((chainId: string) => {
    const num = BigNumber.from(chainId).toNumber()
    const info = getChainInfo(num)
    return info
  }, [])

  return (
    <div className=" w-full sm:w-2/3 flex flex-col ">
      {txList.map((tx, index) => {
        return (
          <div key={index}>
            <div className="flex  flex-col sm:flex-row border-b  border-gray-200 border-solid p-4">
              <div className="flex-1">
                <If condition={tx.data == '0x'}>
                  <Then>
                    Sent {tx.originValue} {tx.name} to
                    <div className=" flex flex-row items-center p-1 ">
                      <span className="mr-2 ">
                        <Avvvatars value={tx.to} style="shape" size={30} />
                      </span>
                      <div>
                        <div className=" pl-2 break-all ">
                          <AddressName address={tx.to}></AddressName>
                        </div>
                        <span className=" pl-2 break-all ">{tx.to}</span>
                      </div>
                    </div>
                  </Then>
                  <Else>
                    Interacting with contracts
                    <div className=" flex items-center p-1 ">
                      <span className=" p-2 break-all ">{tx.to}</span>
                    </div>
                    <When condition={erc20to !== undefined}>
                      <div>
                        <When condition={erc20to !== undefined}>
                          <div className="flex items-center flex-wrap">
                            <span className="">To:</span>
                            <span className=" p-1">
                              <Avvvatars value={erc20to == undefined ? '' : erc20to} style="shape" size={40} />
                            </span>
                            <div className=" flex flex-col">
                              <span className=" break-words    break-all ">
                                <AddressName address={erc20to && erc20to}></AddressName>
                              </span>
                              <span className=" break-words    break-all  ">{erc20to}</span>
                            </div>
                          </div>
                        </When>
                        {/* <When condition={(txtokenTxInfo && txtokenTxInfo[index] && txtokenTxInfo[index].tokenAmount != '') || txAmount !== ''}>
                          <div className=" flex items-center flex-wrap">
                            <span className=" w-20">Amount:</span>
                            <span className=" break-words    break-all ">
                              {txtokenTxInfo[index] && txtokenTxInfo[index].tokenAmount} {txAmount}
                            </span>
                          </div>
                        </When> */}
                      </div>
                    </When>
                  </Else>
                </If>
              </div>
              <div className="flex flex-col sm:flex-row  items-center  justify-center bg-yellow-300 px-4 my-4">
                <span className="mr-1">
                  <img width={16} src={getChain(txList[0].chainId)?.logoUrl}></img>
                </span>

                <span>{getChain(txList[0].chainId)?.label}</span>
              </div>
            </div>
            <div className="flex  flex-col border-b  border-gray-200 border-solid p-4 gap-1">
              <div className="">Gas Limit:{tx.gas}</div>
              <div>Gas Prise:{tx.gasPrice}</div>
              <div>Gas Fee:{formatUnits(chainIdNum, gasFee(tx.gas, tx.gasPrice))}</div>
              <div className="">Nonce:{tx.nonce}</div>
            </div>
          </div>
        )
      })}
      <div className="flex flex-col px-4 py-1">
        <When condition={item.Timestamp !== undefined && item.Timestamp !== ''}>
          <div className="flex flex-row">
            <div className="w-1/3">Created:</div>
            <div className="w-2/3">{dayjs(Number(item.Timestamp)).fromNow()} </div>
          </div>
        </When>
        <When condition={item.Reply_timestamp !== undefined && item.Reply_timestamp !== ''}>
          <div className="flex flex-row">
            <div className="w-1/3">Reply time:</div>
            <div className="w-2/3">
              {dayjs(Number(item.Reply_timestamp)).fromNow()}({dayjs(Number(item.Reply_timestamp)).format('YYYY-MM-DDTHH:mm')}){' '}
            </div>
          </div>
        </When>
      </div>
      <When condition={item.Reply_status !== undefined && item.Reply_status !== ''}>
        <div className="flex flex-col px-4 py-1">
          <div className="flex flex-row">
            <div className="w-1/3">Reply status:</div>
            <div className="w-2/3">{item.Reply_status} </div>
          </div>
        </div>
      </When>
      <When condition={txhashInfo !== undefined && txhashInfo !== ''}>
        <div className="flex flex-col px-4 py-1">
          <div className="flex flex-row">
            <div className="w-1/3">Transaction Hash:</div>
            <div className="w-2/3">
              {/* {txhashInfo} */}
              <ScanTxUrl txhash={txhashInfo} chainId={BigNumber.from(txList[0].chainId).toNumber()}></ScanTxUrl>
            </div>
          </div>
        </div>
      </When>
      <div className="flex flex-col px-4 py-1">
        <div className="flex flex-row">
          <div className="w-1/3">Key Id:</div>
          <div className="w-2/3 break-words">
            {/* {txhashInfo} */}
            {item.Key_id}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TxApproveItemLeft
