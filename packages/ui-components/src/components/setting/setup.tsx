import Avvvatars from 'avvvatars-react'
import { FC } from 'react'
import CopyAddress from '../mpcinfo/copyAddress'
import ScanUrl from '../mpcinfo/scanUrl'
import { PencilSquareIcon } from '@heroicons/react/20/solid'

const Setup: FC = () => {
  return (
    <div className="p-4 ">
      <div className="flex flex-col gap-2   mb-4  ">
        <div className="flex flex-col xl:flex-row bg-gray-50 dark:bg-gray-800 rounded">
          <div className=" w-full xl:w-1/3 p-8 ">
            <h1 className=" text-2xl  font-medium">Manage Vault owners</h1>
          </div>
          <div className=" w-full xl:w-2/3 flex flex-col p-8">
            <div>View current owners. Owner names are only stored locally and will never be shared with us or any third parties.</div>
            <div className="flex flex-col  mt-4">
              {[1, 2, 3].map((item, index) => {
                return (
                  <div key={index} className="p-4 ">
                    <div className="flex rounded-lg h-full bg-gray-100 p-4 flex-col">
                      <div className="flex  flex-row items-center mb-3">
                        <div className="w-14 h-14 mr-3 inline-flex items-center justify-center rounded-full  flex-shrink-0">
                          <Avvvatars value={'0x12CF5132064Ee45AcD4843E8C9D7Ae5e3852Aaab'} style="shape" size={50} />
                        </div>
                        <div className="flex-1 flex flex-row justify-between ">
                          <h2 className="text-gray-900 text-lg title-font font-medium ">owner 1</h2>
                          <span className="w-10">
                            <button
                              type="button"
                              className="text-blue-700  bg-gray-200
      hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 
      font-medium rounded-lg text-sm   p-1.5 text-center inline-flex items-center mr-2"
                            >
                              <PencilSquareIcon className=" h-4 w-4 "></PencilSquareIcon>
                            </button>
                          </span>
                        </div>
                      </div>
                      <div className="flex-grow flex flex-col xl:flex-row space-x-4 ">
                        <span className="leading-relaxed text-base break-words">0x12CF5132064Ee45AcD4843E8C9D7Ae5e3852Aaab</span>
                        <span>
                          <button
                            type="button"
                            className="text-blue-700  bg-gray-200
      hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 
      font-medium rounded-lg text-sm   p-1.5 text-center inline-flex items-center mr-2"
                          >
                            <CopyAddress addr={'0x12CF5132064Ee45AcD4843E8C9D7Ae5e3852Aaab'}></CopyAddress>
                          </button>
                        </span>
                        <span>
                          <button
                            type="button"
                            className="text-blue-700  bg-gray-200
      hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 
      font-medium rounded-lg text-sm   p-1.5 text-center inline-flex items-center mr-2"
                          >
                            <ScanUrl addr={'0x12CF5132064Ee45AcD4843E8C9D7Ae5e3852Aaab'}></ScanUrl>
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
          <div className="w-1/3 p-8 ">
            <h1 className=" text-2xl font-medium">Required confirmations</h1>
          </div>
          <div className="w-2/3 flex flex-col p-8">
            <div>Any transaction requires the confirmation of: x out of x owners.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Setup
