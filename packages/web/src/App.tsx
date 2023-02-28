import { Header, Footer, Web3Provider } from '@monorepo/ui-components'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="App ">
      <Web3Provider>
        <Header></Header>
        <section className="container mx-auto min-h-screen">
          <Outlet />
        </section>
        <Footer></Footer>
      </Web3Provider>
    </div>
  )
}

export default App
