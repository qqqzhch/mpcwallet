import { Fragment, useCallback, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
// import Item from './item'

import { web3 } from '@monorepo/api'
import { getsmpc } from '@monorepo/api/src/web3'
import { useAppStore } from '../../state/index'
// import { useSignEnode } from '../../hooks/useSigns'
// import { peopleType, nodeItem, nodeList } from './type'

// const defaultNode: nodeItem = {
//   address: '',
//   name: 'please select',
//   createFailNum: 0,
//   createNum: 0,
//   groupNum: 0,
//   nodeType: '',
//   signFailNum: 0,
//   signNum: 0,
//   staking: 0,
//   status: 1,
//   version: '',
//   _id: ''
// }
const rpclist = ['http://43.153.80.95:5928', 'http://43.157.49.23:5928', 'http://43.156.1.182:5928']

const SelectNode = () => {
  const [nodeItemList] = useState<Array<string>>(rpclist)
  const [selected, setSelected] = useState<string>(rpclist[0])
  const [query, setQuery] = useState('')
  const [filteredPeople, setFilteredPeople] = useState<Array<string>>([])
  const setLoginAccount = useAppStore(state => state.setLoginAccount)

  // useEffect(() => {
  //   const get = async () => {
  //     const data = await api.get<nodeList>('https://testnetapi.multichain.tools/nodes/list')
  //     if (data.msg === 'Success') {
  //       setNodeList(data.info)
  //       if (data.info.length > 0) {
  //         setSelected(data.info[0])
  //       }
  //     }
  //   }
  //   get()
  // }, [])
  useEffect(() => {
    const filteredlist =
      query === ''
        ? nodeItemList.slice(0, 50)
        : nodeItemList.filter(item => item.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, '')))
    setFilteredPeople(filteredlist)
  }, [query, nodeItemList])

  const nodeSelectCallback = useCallback((item: string) => {
    setSelected(item)
  }, [])

  useEffect(() => {
    web3.setProvider(selected)
    const run = async () => {
      const res = await getsmpc().getEnode()
      setLoginAccount(selected, res.Data.Enode)
    }
    run()
  }, [selected, setLoginAccount])

  return (
    <div className="w-full">
      <Combobox
        value={selected}
        onChange={item => {
          nodeSelectCallback(item)
        }}
      >
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(person: string) => person}
              onChange={event => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </Combobox.Button>
          </div>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" afterLeave={() => setQuery('')}>
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">Nothing found.</div>
              ) : (
                rpclist.map((node: string) => (
                  <Combobox.Option
                    key={node}
                    className={({ active }) => `relative cursor-default select-none py-2 pl-1 pr-1 ${active ? 'bg-blue-600 text-white' : 'text-gray-900'}`}
                    value={node}
                  >
                    {({ selected, active }) => (
                      <div>{node}</div>
                      // <Item node={node}></Item>
                      // <>
                      //   <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{person.name}</span>
                      //   {selected ? (
                      //     <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'}`}>
                      //       <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      //     </span>
                      //   ) : null}
                      // </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}

export default SelectNode
