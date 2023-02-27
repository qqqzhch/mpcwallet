import { FC } from 'react'
import { useAppStore } from '@monorepo/ui-components'
import { cutOut } from '@monorepo/ui-components/src/utils/index'

const WalletApprove: FC = () => {
  const walletApproveList = useAppStore(state => state.approve.walletApproveList)

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
                  <button
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Agree
                  </button>
                  <button
                    type="button"
                    className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    Disagree
                  </button>
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
