import { FC } from 'react'

import logo from '../../assets/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import Connectwallet from '../connectwallet'
import ChainList from '../chainList/index'
import NoticeInfo from '../noticeinfo'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../..'
export const Header: FC = () => {
  const togglesideBar = useAppStore(state => state.togglesideBar)

  const Navigate = useNavigate()

  function onClick() {
    togglesideBar()
  }

  return (
    <header className="text-gray-600 body-font fixed z-50 bg-white flex w-full shadow-sm ">
      <div className="container mx-auto flex flex-wrap py-2 flex-row  items-center ">
        <a
          onClick={() => {
            Navigate('/')
          }}
          className="hidden sm:flex title-font font-medium items-center text-gray-900 pl-4  cursor-pointer"
        >
          <img src={logo} className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full " />

          <span className="ml-3 text-xl hidden lg:block">Vault</span>
        </a>
        <div
          onClick={() => {
            onClick()
          }}
          className="flex  sm:hidden  p-3"
        >
          <FontAwesomeIcon icon={icon({ name: 'bars', style: 'solid' })} />
        </div>

        <nav className="  flex-1  flex flex-row items-center text-base justify-end ">
          {/* <div className="pr-4 pl-4    hover:text-gray-900 border-r border-gray-400 last:border-r-0 hidden lg:block">
            <button type="button" className="px-6 py-2 font-semibold border rounded border-gray-800 text-gray-800">
              Switch to bnb BNB Smart Chain
            </button>
          </div> */}
          <div className="pr-4 pl-4   hover:text-gray-900 border-r border-gray-400 last:border-r-0 ">
            <NoticeInfo></NoticeInfo>
          </div>
          <div className="pr-2 pl-2 flex flex-row   hover:text-gray-900 border-r border-gray-400 last:border-r-0  items-center justify-center">
            <Connectwallet></Connectwallet>
          </div>
          <div className="flex pr-2 pl-2 items-center justify-center   hover:text-gray-900 border-r border-gray-400 last:border-r-0">
            <ChainList></ChainList>
          </div>
        </nav>
      </div>
    </header>
  )
}
