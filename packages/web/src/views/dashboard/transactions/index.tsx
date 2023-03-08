// import React from 'react';
import { Tab } from '@headlessui/react'
import { ArrowDownIcon, ArrowUpRightIcon } from '@heroicons/react/20/solid'

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
                <div className="w-32 px-2 py-3 sm:p-3">Status</div>
                <div className="flex-1 px-2 py-3 sm:p-3">Type</div>

                <div className=" w-48 px-2 py-3 text-right sm:p-3 sm:block">info</div>
              </div>
              <div className="flex border-b border-opacity-20 border-gray-300  group">
                <div className="flex w-32 px-2 py-3 sm:p-3 items-center">
                  <p>success</p>
                </div>
                <div className="flex-1 flex px-2 py-3 truncate sm:p-3 sm:w-auto items-center">send</div>

                <div className="flex w-48 px-2 py-3 text-right sm:p-3 sm:block text-gray-600 items-center ">send 1 eth to 0x888x..88</div>
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel key={'History'}>
            <div className="flex flex-col overflow-x-auto  p-2  text-base">
              {[0, 1].map(item => {
                return (
                  <div key={item} className=" flex flex-col sm:flex-row border border-gray-200 rounded-md p-4 mt-2 bg-gray-50 hover:bg-blue-100 cursor-pointer">
                    <div className=" w-1/4 ">
                      <ArrowUpRightIcon className="h-5 w-5 inline-block"></ArrowUpRightIcon>
                      sent
                    </div>
                    <div className=" w-1/4 ">- 0.01eth</div>
                    <div className=" w-1/4 ">12.11pm</div>
                    <div className=" w-1/4 ">
                      success
                      <ArrowDownIcon className="h-5 w-5 inline-block"></ArrowDownIcon>
                    </div>
                  </div>
                )
              })}
              {[0, 1].map(item => {
                return (
                  <div key={item} className=" flex flex-col  ">
                    <div className="flex flex-col sm:flex-row bg-blue-100 cursor-pointer flex-wrap border border-gray-200 rounded-md p-4 mt-2">
                      <div className=" w-1/4 ">sent</div>
                      <div className=" w-1/4 ">0.01eth</div>
                      <div className=" w-1/4 ">12.11pm</div>
                      <div className=" w-1/4 ">success</div>
                    </div>
                    <div className="w-full  flex flex-col sm:flex-row p-4   bg-gray-50 ">
                      <div className=" w-full sm:w-2/3 flex flex-col ">
                        <div className="flex flex-row border-b  border-gray-200 border-solid p-4">
                          <div className="flex-1">Sent 0.0001 eth to 0x12CF5..aab</div>
                          <div>icon</div>
                        </div>
                        <div className="flex flex-col gap-2 p-4">
                          <div className="flex flex-row">
                            <div className="w-1/3">Transaction hash:</div>
                            <div className="w-2/3">0xe510...ca5b</div>
                          </div>
                          <div className="flex flex-row">
                            <div className="w-1/3">mpc TxHash:</div>
                            <div className="w-2/3">0xe510...ca5b</div>
                          </div>
                          <div className="flex flex-row">
                            <div className="w-1/3">Created:</div>
                            <div className="w-2/3">2023/3/8 08:58:06</div>
                          </div>
                          <div className="flex flex-row">
                            <div className="w-1/3">Executed:</div>
                            <div className="w-2/3">2023/3/8 08:58:06</div>
                          </div>
                          <div className="flex flex-row">
                            <div className="w-1/3 font-semibold underline  decoration-1">Advanced details</div>
                          </div>
                          <div className="flex flex-row">
                            <div className="w-1/3">Executed:</div>
                            <div className="w-2/3">2023/3/8 08:58:06</div>
                          </div>
                          <div className="flex flex-row">
                            <div className="w-1/3">Executed:</div>
                            <div className="w-2/3">2023/3/8 08:58:06</div>
                          </div>
                        </div>
                      </div>
                      <div className=" w-full sm:w-1/3 flex flex-col p-8 gap-4">
                        <div className="lg:w-2/5 md:w-1/2 ">
                          <div className="flex relative pb-2">
                            <div className="h-full w-8 absolute inset-0 flex items-center justify-center">
                              <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                            </div>
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                              +
                            </div>
                            <div className="flex-grow pl-4">
                              <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">Created</h2>
                            </div>
                          </div>
                        </div>
                        <div className="lg:w-2/5 md:w-1/2 ">
                          <div className="flex relative pb-2">
                            <div className="h-full w-8 absolute inset-0 flex items-center justify-center">
                              <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                            </div>
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                              ✓
                            </div>
                            <div className="flex-grow pl-4">
                              <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">Confirmations</h2>
                              <p className="leading-relaxed">1/3 </p>
                            </div>
                          </div>
                        </div>
                        <div className="lg:w-2/5 md:w-1/2 ">
                          <div className="flex relative pb-2">
                            <div className="h-full w-8 absolute inset-0 flex items-center justify-center">
                              <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                            </div>
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500 inline-flex items-center justify-center text-white relative z-10">
                              ✓
                            </div>
                            <div className="flex-grow pl-4">
                              <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">Executed </h2>
                              <p className="leading-relaxed">ok </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default Transactions
