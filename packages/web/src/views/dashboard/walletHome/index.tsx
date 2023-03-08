// import React from 'react';
import Overview from '@monorepo/ui-components/src/components/walletHomePanels/overview'
import TransactionQueue from '@monorepo/ui-components/src/components/walletHomePanels/transactionQueue'

const WalletHome = () => {
  return (
    <div className="p-4 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Overview></Overview>

        <TransactionQueue></TransactionQueue>
      </div>
      <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
        <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
      </div>
    </div>
  )
}

export default WalletHome
