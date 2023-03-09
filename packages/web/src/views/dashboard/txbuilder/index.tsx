import { FC } from 'react'
import TransactionBuild from '@monorepo/ui-components/src/components/transactionbuild'

const Txbuild: FC = () => {
  return (
    <div className="p-4 ">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Transaction Build</h2>
      </div>
      <div>
          <TransactionBuild></TransactionBuild>
      </div>
    </div>
  )
}

export default Txbuild
