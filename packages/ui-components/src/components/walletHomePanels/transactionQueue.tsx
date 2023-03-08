import { FC } from 'react'
import { CheckCircleIcon } from '@heroicons/react/20/solid'

const TransactionQueue: FC = () => {
  return (
    <div className="flex  min-h-80 rounded bg-gray-50 flex-col  gap-6 p-8">
      <h1 className=" border-b border-blue-300 pb-4 flex  flex-row">
        <span className=" flex-1 ">Transaction queue (0)</span>
        <span className="  text-blue-500 cursor-pointer ">more</span>
      </h1>

      <div className="flex flex-col sm:flex-row sm:flex-wrap w-full ">
        <div className="p-2  w-full sm:w-1/2">
          <div className="bg-gray-100 rounded flex p-4 h-full items-center">
            <CheckCircleIcon className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"></CheckCircleIcon>

            <span className="title-font font-medium">send 11 eth to 0x22222</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionQueue
