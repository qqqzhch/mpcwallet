import { FC } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import coinssolid from '../../assets/icon/coins-solid.svg'
import { ArrowsRightLeftIcon, HomeIcon } from '@heroicons/react/20/solid'

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(' ')
}

const SiderMenu: FC = () => {
  const { address, chainType } = useParams<{ address: string; chainType: string }>()
  const { pathname } = useLocation()

  return (
    <ul className="space-y-2 pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
      <li>
        <Link
          to={`/dashboard/${chainType}/${address}`}
          className={classNames(
            'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  ',
            pathname === `/dashboard/${chainType}/${address}` ? 'bg-gray-200' : ''
          )}
        >
          <HomeIcon className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></HomeIcon>

          <span className="ml-3">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link
          to={`/dashboard/${chainType}/${address}/assets`}
          className={classNames(
            'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  ',
            pathname === `/dashboard/${chainType}/${address}/asserts` ? 'bg-gray-200' : ''
          )}
        >
          <img
            className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            src={coinssolid}
          ></img>
          <span className="flex-1 ml-3 whitespace-nowrap">Assets</span>
        </Link>
      </li>
      <li>
        <Link
          to={`/dashboard/${chainType}/${address}/transactions`}
          className={classNames(
            'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  ',
            pathname === `/dashboard/${chainType}/${address}/transactions` ? 'bg-gray-200' : ''
          )}
        >
          <ArrowsRightLeftIcon className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"></ArrowsRightLeftIcon>
          <span className="flex-1 ml-3 whitespace-nowrap">Transactions</span>
        </Link>
      </li>
    </ul>
  )
}

export default SiderMenu
