import { Header, Footer, Web3Provider } from '@monorepo/ui-components'
import { Outlet } from "react-router-dom";
import 'flowbite';

function App() {

  return (
    <div className="App">
      <Web3Provider>
        <Header></Header>
        <section className="container mx-auto">
        <Outlet />
        </section>
        <Footer></Footer>
      </Web3Provider>
    </div>
  )
}

export default App
