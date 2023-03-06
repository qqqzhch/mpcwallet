import { FC } from 'react'

import SideBar from './sideBar'

type Props = {
  children?: React.ReactNode
}

const Dashboard: FC<Props> = props => {
  return (
    <div className="">
      <div>
        <SideBar></SideBar>
      </div>

      <div className="p-4 sm:ml-64">
        <div className="p-4 ">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
          </div>
          <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
        </div>
      </div>
    </div>
  )
}
;<div></div>
export default Dashboard
