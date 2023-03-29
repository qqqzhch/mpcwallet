import { Fragment, FC, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useAppStore } from '../../state/index'
import { adminInfo } from '../../state/index'

const Threshold: FC = () => {
  const createGroup = useAppStore(state => state.createGroup)
  const setcreateGroupThreshold = useAppStore(state => state.setcreateGroupThreshold)
  const [list, setList] = useState<adminInfo[]>([])
  useEffect(() => {
    setList(createGroup.admins)
    setcreateGroupThreshold(2)
  }, [createGroup.admins, setcreateGroupThreshold])

  return (
    <div className="w-72">
      <Listbox value={createGroup.threshold} onChange={setcreateGroupThreshold}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">
              {createGroup.threshold} out of {list.length} owners.
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {list.map((person, index) => (
                <Listbox.Option
                  key={index}
                  disabled={index == 0}
                  className={({ active }) =>
                    `relative cursor-default  disabled:text-gray-300 select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'}`
                  }
                  value={index + 1}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                        {index + 1} out of {list.length} owners.
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default Threshold
