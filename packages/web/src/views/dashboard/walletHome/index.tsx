// import React from 'react';
import Overview from '@monorepo/ui-components/src/components/walletHomePanels/overview'
import TransactionQueue from '@monorepo/ui-components/src/components/walletHomePanels/transactionQueue'
import ContractPanel from '@monorepo/ui-components/src/components/walletHomePanels/ContractPanel'

const WalletHome = () => {
  return (
    <div className="p-4 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Overview></Overview>

        <TransactionQueue></TransactionQueue>
      </div>
      <div className="flex flex-col gap-2 items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
        <ContractPanel></ContractPanel>
        
      </div>
    </div>
  )
}

export default WalletHome
