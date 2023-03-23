import { useAppStore } from '@monorepo/ui-components'
import { Else, If, Then, When } from 'react-if'
import UserPanel from '@monorepo/ui-components/src/components/siderBar/userPanel'
import SiderMenu from '@monorepo/ui-components/src/components/siderBar/siderMenu'
import ChainName from '@monorepo/ui-components/src/components/chainList/chainName'
import WalletList from '@monorepo/ui-components/src/components/walletList/walletMenu'
const SideBar = () => {
  const showsideBar = useAppStore(state => state.sideBar)

  const togglesideBar = useAppStore(state => state.togglesideBar)
  const walletMenu = useAppStore(state => state.walletMenu)
  const togglesidewalletMenu = useAppStore(state => state.togglesidewalletMenu)

  function onClick() {
    togglesideBar()
    togglesidewalletMenu()
  }

  return (
    <div>
      <If condition={walletMenu}>
        <Then>
          <WalletList></WalletList>
        </Then>
        <Else>
          <aside
            id="logo-sidebar"
            className={`fixed  rounded-xl top-14 left-0 z-40 w-64 h-screen transition-transform ${showsideBar ? '' : '-translate-x-full sm:translate-x-0'}  `}
            aria-label="Sidebar"
          >
            <ChainName></ChainName>
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50   dark:bg-gray-800">
              <UserPanel></UserPanel>
              <SiderMenu></SiderMenu>
            </div>
          </aside>
        </Else>
      </If>

      {/* <div className={`fixed  rounded-xl top-14 left-0 z-40 w-64 h-screen transition-transform ${showsideBar ? '' : '-translate-x-full sm:translate-x-0'}  `}>
      
      </div> */}

      <When condition={showsideBar}>
        <div onClick={onClick} className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-30 sm:hidden"></div>
      </When>
    </div>
  )
}

export default SideBar
