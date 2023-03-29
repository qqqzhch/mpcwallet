import { FC, useCallback } from 'react'
import { MinusIcon } from '@heroicons/react/20/solid'
import { When } from 'react-if'
import { useAppStore } from '../../state/index'
import { adminInfo } from '../../state/index'
// interface Chininfo {
//   item: L1ChainInfo | L2ChainInfo
//   chainId: number
// }
type Props = {
  index: number
  value: adminInfo
}

const InputeMinus: FC<Props> = ({ index, value }) => {
  const editcreateGroupAdmin = useAppStore(state => state.editcreateGroupAdmin)
  const removecreateGroupAdminByindex = useAppStore(state => state.removecreateGroupAdminByindex)

  const onChange = useCallback(
    (value: string, index: number) => {
      editcreateGroupAdmin(index, value)
    },
    [editcreateGroupAdmin]
  )

  const onMinusClick = useCallback(
    (index: number) => {
      removecreateGroupAdminByindex(index)
    },
    [removecreateGroupAdminByindex]
  )
  return (
    <div className="relative mb-4">
      <label htmlFor="walletname" className="leading-7 text-sm text-gray-600">
        Owner address {index + 1}
      </label>
      <div className=" flex flex-row items-center justify-start">
        <When condition={index == 0}>
          <input
            type="text"
            readOnly
            disabled
            id={'walletname' + index.toString()}
            name={'walletname' + index.toString()}
            value={value.address}
            className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          ></input>
          <MinusIcon className="w-8 h-8 opacity-0"></MinusIcon>
        </When>
        <When condition={index != 0}>
          <input
            type="text"
            id={'walletname' + index.toString()}
            name={'walletname' + index.toString()}
            value={value.address}
            onChange={e => {
              onChange(e.target.value.trim(), index)
            }}
            className=" flex-1  rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          ></input>
          <MinusIcon
            onClick={() => {
              onMinusClick(index)
            }}
            className="w-8 h-8"
          ></MinusIcon>
        </When>
      </div>
    </div>
  )
}
export default InputeMinus
