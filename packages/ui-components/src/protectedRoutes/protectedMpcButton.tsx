import useLatestMpcAddressStatus from '../hooks/useLatestMpcAddressStatus'

export const ProtectedMpcButton = ({ children, className }: { children: JSX.Element; className?: string }) => {
  const { data: status } = useLatestMpcAddressStatus()

  if (status == false) {
    return (
      <button
        className={
          className
            ? className
            : 'text-white  bg-black  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full'
        }
      >
        Tx In process
      </button>
    )
  }

  return children
}
