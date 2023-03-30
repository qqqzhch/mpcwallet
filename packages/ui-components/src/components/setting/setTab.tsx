import { FC } from 'react'
import { useNavigate, useParams, Outlet } from 'react-router-dom'
import { classNames } from '../../utils/index'
import { Tab } from '@headlessui/react'

type nameAndPath = {
  name: string
  path: string
}

const pair: nameAndPath[] = [
  { name: 'Setup', path: '' },
  { name: 'Environment variables', path: 'environment' }
]

const SetTab: FC = () => {
  const navigate = useNavigate()
  const { address, chainType } = useParams<{ address: string; chainType: string }>()

  const tabChange = (index: number) => {
    const pathanme = pair[index].path.toLowerCase()
    const pathto = `/dashboard/${chainType}/${address}/settings/${pathanme}`
    navigate(pathto)
  }
  return (
    <div className=" mt-10">
      <Tab.Group onChange={tabChange}>
        <Tab.List>
          {pair.map(item => {
            return (
              <Tab
                key={item.name.toLowerCase()}
                className={({ selected }) =>
                  classNames(
                    'inline-flex p-4 border-b-2 border-transparent rounded-t-lg  outline-none group',
                    selected ? 'text-blue-600   border-blue-600  bg-blue-50 ' : ''
                  )
                }
              >
                {item.name}
              </Tab>
            )
          })}
        </Tab.List>
        <Tab.Panels className="mt-10">
          <Outlet></Outlet>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default SetTab
