import { FC } from 'react'
import { nodeItem } from './type'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { When } from 'react-if'
const Item: FC<{ node: nodeItem }> = ({ node }) => {
  return (
    <div className="container mx-auto">
      <div className="lg:w-4/5 mx-auto flex flex-wrap">
        <div className="w-full mt-6 lg:mt-0">
          <h1 className="text-gray-900  title-font font-medium mb-1 flex flex-row">
            <When condition={node.status === 1}>
              <CheckCircleIcon className="h-5 w-5 text-green-400"></CheckCircleIcon>
            </When>
            <When condition={node.status === 0}>
              <ExclamationCircleIcon className="h-5 w-5 text-red-400"></ExclamationCircleIcon>
            </When>
            <span>{node.name}</span>
          </h1>
          <h2 className="text-sm title-font text-gray-500 tracking-widest">{node.address.substring(0, 20)}...</h2>
          <div className="flex mb-4">
            <span className="flex items-left">
              <span className="text-gray-600 ml-1"></span>
            </span>
            <span className="flex items-left">
              <span className="text-gray-600 ml-1">{node.createNum} user</span>
            </span>
            <span className="flex items-left">
              <span className="text-gray-600 ml-1">{node.signNum} tx</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item
