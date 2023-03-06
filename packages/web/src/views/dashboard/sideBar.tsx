import { useAppStore } from '@monorepo/ui-components'
import { When } from 'react-if'
const SideBar = () => {
  const showsideBar = useAppStore(state => state.sideBar)

  const togglesideBar = useAppStore(state => state.togglesideBar)

  function onClick() {
    togglesideBar()
  }

  return (
    <div>
      <aside
        id="logo-sidebar"
        className={`fixed  top-14 left-0 z-40 w-64 h-screen transition-transform ${showsideBar ? '' : '-translate-x-full sm:translate-x-0'}  `}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center pl-2.5 mb-5 flex-row">
            <div className=" w-12 ">
              <img width={32} src="https://flowbite.com/docs/images/logo.svg" className=" h-6 mr-3 sm:h-7" alt="Flowbite Logo" />
            </div>
            <div className=" flex-1  flex flex-col ">
              <div className=" break-all">0x0077...a5958</div>
              <div>111.1eth</div>
            </div>
          </div>
          <div className="pl-2.5 mb-5">
            <button
              type="button"
              className="text-blue-700  bg-gray-300
      hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 
      font-medium rounded-lg text-sm   p-0.5 text-center inline-flex items-center mr-2"
            >
              *
            </button>
            <button
              type="button"
              className="text-blue-700  bg-gray-300
      hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 
      font-medium rounded-lg text-sm   p-0.5 text-center inline-flex items-center mr-2"
            >
              *
            </button>
            <button
              type="button"
              className="text-blue-700  bg-gray-300
      hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 
      font-medium rounded-lg text-sm   p-0.5 text-center inline-flex items-center mr-2"
            >
              *
            </button>
          </div>
          <div className="pl-2.5 mb-5">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full"
            >
              New transaction
            </button>
          </div>

          <ul className="space-y-2 pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
                <span className="ml-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Asserts</span>
                <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  3
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Transactions</span>
                <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  3
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <When condition={showsideBar}>
        <div onClick={onClick} className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30 sm:hidden"></div>
      </When>
    </div>
  )
}

export default SideBar
