// import React from 'react';
import { FC } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import { useAppStore } from '../../state/index'

const plans = [
  {
    name: 'EC256K1',
    brif: ''
  },
  {
    name: 'ED25519',
    brif: ''
  }
]

const MpcType: FC = () => {
  const createGroup = useAppStore(state => state.createGroup)
  const setcreateGroupKeytype = useAppStore(state => state.setcreateGroupKeytype)

  return (
    <div className="w-full px-4 h-8 my-8 ">
      <div className="mx-auto w-full max-w-md ">
        <RadioGroup
          value={createGroup.keytype}
          onChange={e => {
            setcreateGroupKeytype(e)
          }}
        >
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2 flex flex-row gap-4 justify-around">
            {plans.map(plan => (
              <RadioGroup.Option
                key={plan.name}
                value={plan.name}
                className={({ active, checked }) =>
                  `${active ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300 bg-blue-500' : ''}
                  ${checked ? 'bg-blue-500 bg-opacity-75 text-white' : 'bg-white'}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label as="p" className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'}`}>
                            {plan.name}
                          </RadioGroup.Label>
                        </div>
                      </div>

                      <div className="shrink-0 text-white h-6 w-6">{checked && <CheckIcon className="h-6 w-6" />}</div>
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

export default MpcType
