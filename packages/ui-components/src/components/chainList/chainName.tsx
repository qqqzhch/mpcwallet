import useChainName from '../../hooks/useChainName'
const ChainName = () => {
  const name = useChainName()
  return <div className=" bg-yellow-300 font-thin text-sm text-center py-0.5   ">{name}</div>
}

export default ChainName
