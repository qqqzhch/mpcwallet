// import { ThemeProvider } from '@emotion/react'
// import createTheme from '@monorepo/design-tokens'
import { providers } from 'ethers'
import './index.css'
import 'react-loading-skeleton/dist/skeleton.css'
// const CustomThemeProvider = ({ theme = createTheme, children }: any) => <ThemeProvider theme={theme}>{children}</ThemeProvider>

export * from './components/button/Button'
export * from './components/footer'
export * from './components/header'
export * from './web3react/index'
export * from './components/selectnode'
export * from './components/mpctype'
export * from './components/threshold'
export * from './state/index'
export * from './state/teststate'

export * from './components/forms/index'
export * from './components/forms/CreateWalletBtn'
export * from './protectedRoutes/index'
export * from './components/approveBtn/walletApprove'
export * from './components/walletList/index'
export * from './components/siderBar/userPanel'
export * from './components/siderBar/siderMenu'
export * from './protectedRoutes/protectedButton'

export { providers }
