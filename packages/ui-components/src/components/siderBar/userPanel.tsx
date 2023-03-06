import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { cutOut } from '../../utils'
// import { When } from 'react-if'
import Avvvatars from 'avvvatars-react'

import { SquaresPlusIcon, ClipboardDocumentIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid'

//squares-plus
const UserPanel: FC = () => {
  const { address } = useParams<{ address: string; chainType: string }>()

  return (
    <>
      <div className="flex items-center pl-2.5 mb-5 flex-row">
        <div className=" w-12 ">
          <Avvvatars value={address ? address : ''} style="shape" size={40} />
        </div>
        <div className=" flex-1  flex flex-col ">
          <div className=" break-all">{address ? cutOut(address, 8, 8) : ''}</div>
          <div>111.1eth</div>
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
          <ClipboardDocumentIcon className=" h-4 w-4 "></ClipboardDocumentIcon>
        </button>
        <button
          type="button"
          className="text-blue-700  bg-gray-200
      hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 
      font-medium rounded-lg text-sm   p-1.5 text-center inline-flex items-center mr-2"
        >
          <ArrowTopRightOnSquareIcon className=" h-4 w-4 "></ArrowTopRightOnSquareIcon>
        </button>
      </div>
      <div className="pl-2.5 mb-5">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full"
        >
          New transaction
        </button>
      </div>
    </>
  )
}

export default UserPanel
