import { FC, useCallback, useEffect, useState } from 'react'
import { MinusIcon } from '@heroicons/react/20/solid'
import { When } from 'react-if'
import { useAppStore } from '../../state/index'
import { adminInfo } from '../../state/index'
import { useUserStore } from '@monorepo/ui-components'
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
  const localAddressName = useUserStore(state => state.getAddressName(value.address))
  const [ownerName, setOwnerName] = useState<string | undefined>()
  const [ownerAddress, setOwnerAddress] = useState<string | undefined>()

  useEffect(() => {
    if (ownerName == undefined && ownerAddress == undefined) {
      return
    }

    if (index == 0) {
      editcreateGroupAdmin(index, value.address, ownerName)
    } else {
      editcreateGroupAdmin(index, ownerAddress == undefined ? value.address : ownerAddress, ownerName)
    }
  }, [editcreateGroupAdmin, ownerAddress, ownerName, index, value])

  useEffect(() => {
    if (value.name !== undefined) {
      setOwnerName(value.name)
    } else {
      setOwnerName(localAddressName)
    }
    if (value.address) {
      setOwnerAddress(value.address)
    }
  }, [localAddressName, value])

  const onMinusClick = useCallback(
    (index: number) => {
      removecreateGroupAdminByindex(index)
    },
    [removecreateGroupAdminByindex]
  )
  return (
    <div className="relative mb-4">
      <div className=" flex flex-row items-center justify-start">
        <div className="flex-1 flex flex-col sm:flex-row  space-y-2 sm:space-x-2 sm:space-y-0">
          <input
            type="text"
            id={'walletname' + index.toString()}
            name={'walletname' + index.toString()}
            placeholder={`Owner Name ${index + 1}`}
            onChange={e => {
              setOwnerName(e.target.value.trim())
            }}
            value={ownerName}
            className=" w-full sm:w-1/3  rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          ></input>
          <When condition={index == 0}>
            <input
              type="text"
              readOnly
              disabled
              id={'walletname' + index.toString()}
              name={'walletname' + index.toString()}
              value={ownerAddress}
              className="flex-1 bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            ></input>
          </When>
          <When condition={index != 0}>
            <input
              type="text"
              id={'walletname' + index.toString()}
              name={'walletname' + index.toString()}
              value={ownerAddress}
              placeholder={`Owner Address ${index + 1}`}
              onChange={e => {
                setOwnerAddress(e.target.value.trim())
              }}
              className=" flex-1  rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            ></input>
          </When>
        </div>

        <MinusIcon
          onClick={() => {
            onMinusClick(index)
          }}
          className="w-8 h-8"
        ></MinusIcon>
      </div>
    </div>
  )
}
export default InputeMinus
