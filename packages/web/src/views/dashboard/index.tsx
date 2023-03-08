import { FC } from 'react'

import SideBar from './sideBar'
import { Outlet } from 'react-router-dom'

type Props = {
  children?: React.ReactNode
}

const Dashboard: FC<Props> = props => {
  return (
    <div className="">
      <div>
        <SideBar></SideBar>
      </div>

      <div className="p-0 sm:ml-64 ">
        <Outlet></Outlet>
      </div>
    </div>
  )
}
;<div></div>
export default Dashboard
