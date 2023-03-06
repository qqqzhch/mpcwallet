import { useAppStore } from '@monorepo/ui-components'
import { When } from 'react-if'
import UserPanel from '@monorepo/ui-components/src/components/siderBar/userPanel'
import SiderMenu from '@monorepo/ui-components/src/components/siderBar/siderMenu'

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
        className={`fixed rounded-xl top-14 left-0 z-40 w-64 h-screen transition-transform ${showsideBar ? '' : '-translate-x-full sm:translate-x-0'}  `}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50   dark:bg-gray-800">
          <UserPanel></UserPanel>
          <SiderMenu></SiderMenu>
        </div>
      </aside>
      <When condition={showsideBar}>
        <div onClick={onClick} className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30 sm:hidden"></div>
      </When>
    </div>
  )
}

export default SideBar
