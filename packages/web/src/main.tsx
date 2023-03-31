import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Routes from './route'
import { AppStoreProvider } from '@monorepo/ui-components/src/state/index'
import 'react-tooltip/dist/react-tooltip.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppStoreProvider>
      <Routes></Routes>
    </AppStoreProvider>
  </React.StrictMode>
)
