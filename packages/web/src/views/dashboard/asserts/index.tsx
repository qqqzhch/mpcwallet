// import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { useState } from 'react'
import SendToken from '@monorepo/ui-components/src/components/siderBar/sendToken'
import SendNft from '@monorepo/ui-components/src/components/siderBar/sendNft'

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(' ')
}
const Asserts = () => {
  const [isTokenOpen, setIsTokenOpen] = useState(false)
  const [isNFTOpen, setIsNFTOpen] = useState(false)
  return (
    <div className="p-4 ">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Asserts</h2>
        {/* <p className="font-serif text-sm text-gray-600">xxx.</p> */}
      </div>
      <Tab.Group>
        <Tab.List>
          <Tab
            key={'Tokens'}
            className={({ selected }) =>
              classNames('inline-flex p-4 border-b-2 border-transparent rounded-t-lg  outline-none group', selected ? 'text-blue-600  border-blue-600' : '')
            }
          >
            Tokens
          </Tab>
          {/* <Tab
            key={'Nfts'}
            className={({ selected }) =>
              classNames('inline-flex p-4 border-b-2 border-transparent rounded-t-lg outline-none group', selected ? 'text-blue-600  border-blue-600' : '')
            }
          >
            Nfts
          </Tab> */}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel key={'Tokens'}>
            <div className="flex flex-col overflow-x-auto text-xs p-2">
              <div className="flex text-left bg-gray-50">
                <div className="w-32 px-2 py-3 sm:p-3">Assert</div>
                <div className="flex-1 px-2 py-3 sm:p-3">Balance</div>

                <div className=" w-48 px-2 py-3 text-right sm:p-3 sm:block"></div>
              </div>
              <div className="flex border-b border-opacity-20 border-gray-300  group">
                <div className="flex w-32 px-2 py-3 sm:p-3 items-center">
                  <p>ETH</p>
                </div>
                <div className="flex-1 flex px-2 py-3 truncate sm:p-3 sm:w-auto items-center">1 111eth</div>

                <div className="flex w-48 px-2 py-3 text-right sm:p-3 sm:block text-gray-600 items-center ">
                  <button
                    onClick={() => {
                      setIsTokenOpen(true)
                    }}
                    type="button"
                    className="invisible group-hover:visible text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    send
                  </button>
                </div>
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel key={'Nfts'}>
            <div className="flex flex-col overflow-x-auto text-xs p-2">
              <div className="flex text-left bg-gray-50">
                <div className="w-32 px-2 py-3 sm:p-3">Assert Name </div>
                <div className="flex-1 px-2 py-3 sm:p-3">Resources</div>
                <div className="flex-1 px-2 py-3 sm:p-3">Token ID</div>

                <div className=" w-28 px-2 py-3 text-right sm:p-3 sm:block"></div>
              </div>
              <div className="flex border-b border-opacity-20 border-gray-300  group">
                <div className="flex w-32 px-2 py-3 sm:p-3 items-center">
                  <p>artblock</p>
                </div>
                <div className="flex-1 flex px-2 py-3 truncate sm:p-3 sm:w-auto items-center">
                  <img
                    width={100}
                    src="https://i.seadn.io/gae/GQYM6Cy8UjIdrd9K_ZOlN1nAmdl7T7s-BxTSrOetVwOBZlh0OS9ZH_3cq-RbPj9ogq3-srOkrb-kuebNDQmYLeuh-cb_Nt-f1MxAfg?auto=format&w=256"
                  ></img>
                </div>
                <div className="flex-1 flex px-2 py-3 truncate sm:p-3 sm:w-auto items-center">1</div>

                <div className="flex w-28 px-2 py-3 text-right sm:p-3 sm:block text-gray-600 items-center ">
                  <button
                    onClick={() => {
                      setIsNFTOpen(true)
                    }}
                    type="button"
                    className="invisible group-hover:visible text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    send
                  </button>
                </div>
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      <SendToken
        open={isTokenOpen}
        callBack={() => {
          setIsTokenOpen(false)
        }}
      ></SendToken>
      <SendNft
        open={isNFTOpen}
        callBack={() => {
          setIsNFTOpen(false)
        }}
      ></SendNft>
    </div>
  )
}

export default Asserts
