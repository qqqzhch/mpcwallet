import { FC } from 'react'
import { useParams } from 'react-router-dom'
import MpcAvvvatar from '../mpcAvvvatar'
import { useWeb3React } from '@web3-react/core'
import CopyAddress from '../mpcinfo/copyAddress'
import ScanUrl from '../mpcinfo/scanUrl'

const Overview: FC = () => {
  const { address } = useParams<{ address: string; chainType: string }>()
  const { chainId } = useWeb3React()

  return (
    <div className="flex  min-h-80 rounded bg-gray-50 flex-col  gap-6 p-8" title={address}>
      <h1 className=" border-b border-blue-300 pb-4">Overview</h1>
      <div className="">
        <MpcAvvvatar address={address} chainid={chainId}></MpcAvvvatar>
      </div>
      <div className=" break-all">
        {address}
        <button
          type="button"
          className="text-blue-700
      hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 
      font-medium rounded-lg text-sm   p-1.5 text-center inline-flex items-center mr-2 ml-2"
        >
          <CopyAddress></CopyAddress>
        </button>
        <button
          type="button"
          className="text-blue-700  
      hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 
      font-medium rounded-lg text-sm   p-1.5 text-center inline-flex items-center mr-2 ml-2"
        >
          <ScanUrl></ScanUrl>
        </button>
      </div>
      <div className=" flex flex-row">
        <div className=" flex  flex-col w-1/4 sm:w-1/3  gap-2">
          <div className=" text-blue-500">tokens</div>
          <div className=" text-2xl font-semibold ">1</div>
        </div>
        <div className=" flex  flex-col w-1/4 sm:w-1/3 gap-2">
          <div className=" text-blue-500">nfts</div>
          <div className=" text-2xl font-semibold ">1</div>
        </div>
        <div className=" flex  flex-col w-1/2 sm:w-1/3  pt-8">
          <button
            type="button"
            className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            View assets
          </button>
        </div>
      </div>
    </div>
  )
}

export default Overview
