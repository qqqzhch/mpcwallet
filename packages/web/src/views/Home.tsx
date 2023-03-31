import { Link } from 'react-router-dom'
import WalletList from '@monorepo/ui-components/src/components/walletList'
import { ProtectedButton } from '@monorepo/ui-components'
const Home = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex flex-col w-full  lg:w-1/2 xl:w-1/3 ">
        <WalletList></WalletList>
      </div>
      <div className="flex-1  bg-gradient-to-r from-cyan-500 to-blue-500">
        <div className="flex flex-col text-left w-full mb-20  mt-20 lg:mt-60">
          <div className=" mx-6 lg:mx-28 leading-relaxed text-base text-gray-900">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 ">Welcome to the Vault</h1>
            The most secured collective crypto asset management platform powered by SMPC
          </div>
        </div>
        <div className="flex flex-wrap   lg:mx-28 mb-60 ">
          <div className="p-4 w-full xl:w-1/2 2xl:w-1/3 ">
            <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
              <h1 className="tracking-widest text-2xl title-font font-medium text-gray-900 mb-1">Create your Vault</h1>

              <p className="leading-relaxed mb-3">A new Vault managed by multiple wallets</p>

              <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                <ProtectedButton>
                  <Link to={'/creatwallet'}>
                    <button className="bg-sky-500 hover:bg-sky-700 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white">Create new Vault</button>
                  </Link>
                </ProtectedButton>
              </div>
            </div>
          </div>
          <div className="p-4 w-full xl:w-1/2 2xl:w-1/3">
            <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
              <h2 className="tracking-widest text-2xl title-font font-medium text-gray-900 mb-1">Access your Vault</h2>

              <p className="leading-relaxed mb-3">Connect your wallet to access already created Vault</p>

              <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                <ProtectedButton>
                  <button className="bg-sky-500 hover:bg-sky-700 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white">Access your Vault</button>
                </ProtectedButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
