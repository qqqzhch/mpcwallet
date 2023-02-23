import { FC } from 'react'
import SelectNode from '@monorepo/ui-components/src/components/selectnode'
import { Link } from 'react-router-dom'

const Login: FC = () => {
  return (
    <>
      <div className=" xl:w-3/4 2xl:w-2/3 px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-gray-900">Multichain - SMPC Wallet</h1>
          <p className="leading-relaxed mt-4">First, you need to connect to the wallet</p>
          <p className="leading-relaxed mt-4">You can see more about nodes and account related</p>
          <p className="leading-relaxed mt-4">View more nodes</p>
        </div>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Login account</h2>
          <div className="relative mb-4">
            <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">
              Set the node
            </label>
            <SelectNode></SelectNode>
          </div>

          <Link to={'/creatwallet'}>
            <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
          </Link>
          <p className="text-xs text-gray-500 mt-3">more node info.</p>
        </div>
      </div>
    </>
  )
}

export default Login
