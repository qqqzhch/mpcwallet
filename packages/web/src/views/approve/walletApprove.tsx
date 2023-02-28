import { FC } from 'react'
import { useAppStore } from '@monorepo/ui-components'
import { cutOut } from '@monorepo/ui-components/src/utils/index'
import { WalletApproveBtn } from '@monorepo/ui-components'

const WalletApprove: FC = () => {
  const walletApproveList = useAppStore(state => state.approve.walletApproveList.filter(item => item.show != false))

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-10 ">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">
              Initiator
            </th>
            <th scope="col" className="px-4 py-3">
              GroupID
            </th>
            <th scope="col" className="px-4 py-3">
              TimeStamp
            </th>
            <th scope="col" className="px-4 py-3">
              Threshold
            </th>
            <th scope="col" className="px-4 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {walletApproveList.map(item => {
            return (
              <tr key={item.TimeStamp}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {cutOut(item.Account, 6, 6)}
                </th>
                <td className="px-6 py-4">{cutOut(item.GroupID, 6, 6)}</td>
                <td className="px-6 py-4">{item.TimeStamp}</td>
                <td className="px-6 py-4">{item.ThresHold}</td>
                <td className="px-6 py-4">
                  <WalletApproveBtn item={item}></WalletApproveBtn>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
export default WalletApprove
