// import React from 'react';
import { Tab } from '@headlessui/react'
function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(' ')
}
const Transactions = () => {
  return (
    <div className="p-4 ">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Transactions</h2>
        {/* <p className="font-serif text-sm text-gray-600">xxx.</p> */}
      </div>
      <Tab.Group>
        <Tab.List>
          <Tab
            key={'Queue'}
            className={({ selected }) =>
              classNames('inline-flex p-4 border-b-2 border-transparent rounded-t-lg  outline-none group', selected ? 'text-blue-600  border-blue-600' : '')
            }
          >
            Queue
          </Tab>
          <Tab
            key={'History'}
            className={({ selected }) =>
              classNames('inline-flex p-4 border-b-2 border-transparent rounded-t-lg outline-none group', selected ? 'text-blue-600  border-blue-600' : '')
            }
          >
            History
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel key={'Queue'}>
            <div className="flex flex-col overflow-x-auto text-xs p-2">
              <div className="flex text-left  bg-gray-50">
                <div className="w-32 px-2 py-3 sm:p-3">Assert</div>
                <div className="flex-1 px-2 py-3 sm:p-3">Balance</div>

                <div className=" w-48 px-2 py-3 text-right sm:p-3 sm:block"></div>
              </div>
              <div className="flex border-b border-opacity-20 border-gray-300  group">
                <div className="flex w-32 px-2 py-3 sm:p-3 items-center">
                  <p>ETH</p>
                </div>
                <div className="flex-1 flex px-2 py-3 truncate sm:p-3 sm:w-auto items-center">1 111eth</div>

                <div className="flex w-48 px-2 py-3 text-right sm:p-3 sm:block text-gray-600 items-center "></div>
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel key={'History'}>
            <div className="flex flex-col overflow-x-auto text-xs p-2">
              <div className="flex text-left  bg-gray-50">
                <div className="w-32 px-2 py-3 sm:p-3">Assert</div>
                <div className="flex-1 px-2 py-3 sm:p-3">Balance</div>

                <div className=" w-48 px-2 py-3 text-right sm:p-3 sm:block"></div>
              </div>
              <div className="flex border-b border-opacity-20 border-gray-300  group">
                <div className="flex w-32 px-2 py-3 sm:p-3 items-center">
                  <p>ETH</p>
                </div>
                <div className="flex-1 flex px-2 py-3 truncate sm:p-3 sm:w-auto items-center">222eth</div>

                <div className="flex w-48 px-2 py-3 text-right sm:p-3 sm:block text-gray-600 items-center "></div>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default Transactions
