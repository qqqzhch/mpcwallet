import useChainName from '../../hooks/useChainInfo'
const ChainName = () => {
  const ChainInfo = useChainName()
  return <div className=" bg-yellow-300 font-thin text-sm text-center py-0.5   ">{ChainInfo?.label}</div>
}

export default ChainName
