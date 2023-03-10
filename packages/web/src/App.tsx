import { Header, Footer, Web3Provider } from '@monorepo/ui-components'
import { Outlet } from 'react-router-dom'
import FetchDataGlobal from '@monorepo/ui-components/src/components/fetchGlobal'

function App() {
  return (
    <div className="App ">
      <Web3Provider>
        <FetchDataGlobal></FetchDataGlobal>
        <Header></Header>
        <section className="container mx-auto min-h-screen  pt-16">
          <Outlet />
        </section>
        <Footer></Footer>
      </Web3Provider>
    </div>
  )
}

export default App
