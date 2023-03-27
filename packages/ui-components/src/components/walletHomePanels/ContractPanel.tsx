import { FC } from 'react'
import { useParams, Link } from 'react-router-dom'

const ContractPanel: FC = () => {
  const { address, chainType } = useParams<{ address: string; chainType: string }>()

  return (
    <>
      <div className="p-2 text-center">Compose custom contract interactions and batch them into a single transaction</div>
      <div className="text-2xl underline text-blue-500 cursor-pointer ">
        <Link to={`/dashboard/${chainType}/${address}/txbuild`}>Contract interaction</Link>
      </div>
    </>
  )
}

export default ContractPanel
