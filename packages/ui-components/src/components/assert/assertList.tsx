import { FC, useCallback, useState } from 'react'
import useAsserts from '../../hooks/useAsserts'
//https://etherscan.io/address/0xb1f8e55c7f64d203c1400b9d8555d050f94adf39#code
import useAssertListBalance from '../../hooks/useAssertListBalance'
import { useParams } from 'react-router-dom'
import useNativeBalance from '../../hooks/useNativeBalance'
import { formatUnitsErc20 } from '../../utils/index'
import SendToken from '../siderBar/sendToken'

import { assertType } from '../../utils/buildMpcTx'

const AssertList: FC = () => {
  const { data: assertList } = useAsserts()
  const { address } = useParams<{ address: string; chainType: string }>()
  const { balance } = useAssertListBalance(address, assertList)
  const { balance: NativeBalance } = useNativeBalance(address)
  const [isTokenOpen, setIsTokenOpen] = useState(false)
  const [selectedAssert, setSelectedAssert] = useState<assertType>()

  const getBalance = useCallback(
    (address: string | undefined) => {
      if (address == undefined || address == '') {
        return NativeBalance
      }
      if (balance && address != undefined) {
        if (balance[address]) {
          return balance[address]
        }
      }
    },
    [balance, NativeBalance]
  )

  return (
    <>
      {assertList.map((item, index) => {
        return (
          <div key={index} className="flex border-b border-opacity-20 border-gray-300  group">
            <div className="flex w-32 px-2 py-3 sm:p-3 items-center">
              <p>{item.name}</p>
            </div>
            <div className="flex-1 flex px-2 py-3 truncate sm:p-3 sm:w-auto items-center">
              {formatUnitsErc20(getBalance(item.contractaddress), item.name, item.decimals)}
            </div>

            <div className="flex w-48 px-2 py-3 text-right sm:p-3 sm:block text-gray-600 items-center ">
              <button
                onClick={() => {
                  setIsTokenOpen(true)
                  setSelectedAssert(item)
                }}
                type="button"
                className="invisible group-hover:visible text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                send
              </button>
            </div>
          </div>
        )
      })}
      <SendToken
        open={isTokenOpen}
        callBack={() => {
          setIsTokenOpen(false)
        }}
        selectAssert={selectedAssert}
      ></SendToken>
    </>
  )
}

export default AssertList
