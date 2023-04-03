import { FC, ReactNode } from 'react'
import { Else, If, Then } from 'react-if'
import { useUserStore } from '../..'

type Props = {
  address: string | undefined
  children?: ReactNode
}

const AddressName: FC<Props> = ({ address, children }) => {
  const name = useUserStore(state => state.getAddressName(address))

  return (
    <>
      <If condition={name != ''}>
        <Then>{name}</Then>
        <Else>{children}</Else>
      </If>
    </>
  )
}

export default AddressName
