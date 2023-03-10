import { FC, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { cutOut } from '../../utils'
// import { When } from 'react-if'
import Avvvatars from 'avvvatars-react'
import NewTransaction from './newTransaction'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { SquaresPlusIcon, ClipboardDocumentIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid'
import { useToasts } from 'react-toast-notifications'
import MpcAvvvatar from '../mpcAvvvatar'
import CopyAddress from '../mpcinfo/copyAddress'

import { useWeb3React } from '@web3-react/core'

import { formatUnits } from '../../utils'
import ScanUrl from '../mpcinfo/scanUrl'

const UserPanel: FC = () => {
  const { address } = useParams<{ address: string; chainType: string }>()
  const { addToast } = useToasts()
  const {chainId}= useWeb3React();
  
  

  const onCopy = useCallback(() => {
    addToast('Copy successful', { appearance: 'success' })
  }, [addToast])

  return (
    <>
      <div className="flex items-center pl-2.5 mb-5 flex-row" title={address}>
        <div className=" w-12 ">
          {/* <Avvvatars value={address ? address : ''} style="shape" size={40} /> */}
          <MpcAvvvatar address={address} chainid={chainId}></MpcAvvvatar>
        </div>
        <div className=" flex-1  flex flex-col ">
          <div className=" break-all">{address ? cutOut(address, 8, 8) : ''}</div>
          <div>{formatUnits(chainId,"1000000000000000000")}</div>
        </div>
      </div>
      <div className="pl-2.5 mb-5">
        <button
          type="button"
          className="text-blue-700  bg-gray-200
      hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 
      font-medium rounded-lg text-sm   p-1.5 text-center inline-flex items-center mr-2"
        >
          <SquaresPlusIcon className=" h-4 w-4 "></SquaresPlusIcon>
        </button>
        <button
          type="button"
          className="text-blue-700  bg-gray-200
      hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 
      font-medium rounded-lg text-sm   p-1.5 text-center inline-flex items-center mr-2"
        >
          <CopyAddress></CopyAddress>
        </button>

        <button
          type="button"
          className="text-blue-700  bg-gray-200
      hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 
      font-medium rounded-lg text-sm   p-1.5 text-center inline-flex items-center mr-2"
        >
          <ScanUrl></ScanUrl>
        </button>
      </div>
      <div className="pl-2.5 mb-5">
        <NewTransaction></NewTransaction>
      </div>
    </>
  )
}

export default UserPanel
