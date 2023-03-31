import Avvvatars from 'avvvatars-react'
import { FC, useCallback } from 'react'
import CopyAddress from '../mpcinfo/copyAddress'
import ScanUrl from '../mpcinfo/scanUrl'
// import { PencilSquareIcon } from '@heroicons/react/20/solid'
import useMpcAddressDetail from '../../hooks/useMpcAddressDetail'
import useAccount from '../../hooks/useAccount'
import { useParams } from 'react-router-dom'

useMpcAddressDetail

const Setup: FC = () => {
  const { data: list } = useMpcAddressDetail()
  const { address } = useParams<{ address: string; chainType: string }>()
  const mpcGroupAccount = useAccount(address)
  const getThreshold = useCallback(() => {
    if (mpcGroupAccount !== undefined) {
      const list = mpcGroupAccount.Threshold.split('/')
      return {
        min: list[0],
        all: list[1]
      }
    }
    return {
      min: '',
      all: ''
    }
  }, [mpcGroupAccount])
  return (
    <div className="flex flex-col gap-2   mb-4  ">
      <div className="flex flex-col xl:flex-row bg-gray-50 dark:bg-gray-800 rounded">
        <div className=" w-full xl:w-1/3 p-8 ">
          <h1 className=" text-2xl  font-medium">Manage Vault owners</h1>
        </div>
        <div className=" w-full xl:w-2/3 flex flex-col p-8">
          <div>View current owners. Owner names are only stored locally and will never be shared with us or any third parties.</div>
          <div className="flex flex-col  mt-4">
            {list &&
              list.map((item, index) => {
                return (
                  <div key={index} className="p-4 ">
                    <div className="flex rounded-lg h-full bg-gray-100 p-4 flex-col">
                      <div className="flex  flex-row items-center mb-3">
                        <div className="w-14 h-14 mr-3 inline-flex items-center justify-center rounded-full  flex-shrink-0">
                          <Avvvatars value={item.User_account} style="shape" size={50} />
                        </div>
                        <div className="flex-1 flex flex-row justify-between ">
                          <h2 className="text-gray-900 text-lg title-font font-medium ">owner {index + 1}</h2>
                          <span className="w-10">
                            {/* <button
                              type="button"
                              className="text-blue-700  bg-gray-200
      hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 
      font-medium rounded-lg text-sm   p-1.5 text-center inline-flex items-center mr-2"
                            >
                              <PencilSquareIcon className=" h-4 w-4 "></PencilSquareIcon>
                            </button> */}
                          </span>
                        </div>
                      </div>
                      <div className="flex-grow flex flex-col xl:flex-row space-x-4  space-y-4 xl:space-y-0 ">
                        <span className="leading-relaxed text-base break-words">{item.User_account}</span>
                        <span>
                          <button
                            type="button"
                            className="text-blue-700  bg-gray-200
      hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 
      font-medium rounded-lg text-sm   p-1.5 text-center inline-flex items-center mr-2"
                          >
                            <CopyAddress addr={item.User_account}></CopyAddress>
                          </button>
                        </span>
                        <span>
                          <button
                            type="button"
                            className="text-blue-700  bg-gray-200
      hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 
      font-medium rounded-lg text-sm   p-1.5 text-center inline-flex items-center mr-2"
                          >
                            <ScanUrl addr={item.User_account}></ScanUrl>
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 rounded">
        <div className="w-full xl:w-1/3 p-8 ">
          <h1 className=" text-2xl font-medium">Required confirmations</h1>
        </div>
        <div className="w-full xl:w-2/3 flex flex-col p-8">
          <div>
            Any transaction requires the confirmation of: {getThreshold().min} out of {getThreshold().all} owners.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Setup