import { FC } from 'react'
import useAccounts from '../../hooks/useAccounts'
import { walletaccount } from '../../state/walletaccount'
import { ethers } from 'ethers'

const WalletList: FC = props => {
  const { data: walletAccounts } = useAccounts()

  return (
    <>
      <h1 className="m-8 text-2xl font-semibold border-b border-gray-300 py-4">My Multichain Wallet</h1>
      {walletAccounts.map((item: walletaccount) => {
        return (
          <div key={item.publicKey} className="flex flex-wrap -m-2">
            <div className="m-4  w-full ">
              <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg hover:bg-blue-200">
                <img
                  alt="team"
                  className="w-8 h-8 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/80x80"
                ></img>
                <div className="flex-grow">
                  <h2 className="text-gray-900 title-font font-medium">
                    {ethers.utils.computeAddress('0x' + item.publicKey)} <span className="text-gray-500">{item.mode}</span>
                  </h2>
                  <p className="text-gray-500  w-80 md:w-full text-ellipsis overflow-hidden">{item.gID}</p>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default WalletList
