import { FC, useCallback } from 'react'
import { walletApprove } from '../../state/approve'
import { useApproveReqSmpcAddress } from '../../hooks/useSigns'
import { useWeb3React } from '@web3-react/core'
import { useAppStore } from '../../state/index'
import { useToasts } from 'react-toast-notifications'
import { When } from 'react-if'

type Props = {
  item: walletApprove
}

export const WalletApproveBtn: FC<Props> = ({ item }) => {
  const loginAccount = useAppStore(state => state.getLoginAccount)
  const { account } = useWeb3React()
  const { execute } = useApproveReqSmpcAddress(loginAccount(account)?.rpc)
  const setpollingPubKey = useAppStore(state => state.setpollingPubKey)
  const hidenWalletApprove = useAppStore(state => state.hidenWalletApprove)
  const { addToast } = useToasts()

  const approve = useCallback(
    (action: string) => {
      const run = async () => {
        if (execute !== undefined) {
          try {
            const res = await execute(item, action)
            //need to fetch data or edit data

            if (res?.info === 'Success') {
              hidenWalletApprove(item)
              addToast('Operation succeeded', { appearance: 'success' })
              const newPollingPubKeyItem = {
                fn: 'getReqAddrStatus',
                params: [item.Key],
                data: {
                  GroupID: item.GroupID,
                  ThresHold: item.ThresHold,
                  Key: item.Key
                }
              }
              setpollingPubKey(newPollingPubKeyItem)
            } else {
              addToast('operation failed', { appearance: 'error' })
            }
          } catch (error) {
            const err = error as Error
            addToast(err.message, { appearance: 'error' })
          }
        }
      }
      run()
    },
    [execute, item, setpollingPubKey, addToast, hidenWalletApprove]
  )

  return (
    <>
      <When condition={item.Account !== account}>
        <button
          onClick={() => {
            approve('AGREE')
          }}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Agree
        </button>
        <button
          type="button"
          onClick={() => {
            approve('DISAGREE')
          }}
          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Disagree
        </button>
      </When>
      <When condition={item.Account === account}>Create your own</When>
    </>
  )
}
