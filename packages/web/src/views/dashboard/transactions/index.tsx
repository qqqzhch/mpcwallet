// import React from 'react';
import { Tab } from '@headlessui/react'
import TxApproveQueue from '@monorepo/ui-components/src/components/transaction/txApproveQueue'
import SignHistory from '@monorepo/ui-components/src/components/transaction/signHistory'

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
            <TxApproveQueue></TxApproveQueue>
          </Tab.Panel>
          <Tab.Panel key={'History'}>
            <div className="flex flex-col overflow-x-auto  p-2  text-base">
              <SignHistory></SignHistory>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default Transactions
