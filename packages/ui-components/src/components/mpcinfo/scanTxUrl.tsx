// import { useParams } from 'react-router-dom'
import { FC } from 'react'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid'
// import { useWeb3React } from '@web3-react/core'
import { getChainInfo } from '../../constants/chainInfo'
import { Tooltip } from 'react-tooltip'
type Props = {
  txhash: string | undefined
  chainId: number | undefined
}

const ScanTxUrl: FC<Props> = ({ txhash, chainId }) => {
  // const { address } = useParams<{ address: string; chainType: string }>()
  // const { chainId } = useWeb3React()

  const ChainInfo = getChainInfo(chainId)

  return (
    <a
      data-tooltip-id="my-tooltip"
      data-tooltip-content={`View on ${ChainInfo?.label} Blockchain Explorer`}
      data-tooltip-place="top"
      className="  break-words"
      rel="noreferrer"
      target={'_blank'}
      href={`${ChainInfo?.explorer}tx/${txhash}`}
    >
      <Tooltip id="my-tooltip" />
      {txhash}
      <ArrowTopRightOnSquareIcon className="mx-1 h-4 w-4 inline-block  text-blue-600"></ArrowTopRightOnSquareIcon>
    </a>
  )
}

export default ScanTxUrl
