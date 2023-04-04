import TxApproveDetails from '@monorepo/ui-components/src/components/transaction/txApproveDetails'

const TxInfo = () => {
  return (
    <div className="p-4 ">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Transactions queue details</h2>
        <TxApproveDetails></TxApproveDetails>
      </div>
    </div>
  )
}

export default TxInfo
