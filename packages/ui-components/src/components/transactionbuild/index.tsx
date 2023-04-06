import { FC, useCallback, useState } from 'react'
import { ContractInterface } from '../../hooks/useServices/interfaceRepository'
import useServices from '../../hooks/useServices'
import { ProposedTransaction } from '../../hooks/useServices/models'
import { When } from 'react-if'
import { AbiItem } from 'web3-utils'
import { cutOut } from '../../utils'

import { useToasts } from 'react-toast-notifications'
import { useParams } from 'react-router-dom'
// import useAccount from '../../hooks/useAccount'
import ContractModel from './contractModel'
import useChainInfo from '../../hooks/useChainInfo'

const TransactionBuild: FC = () => {
  // const ChainName = useChainName()

  const services = useServices()

  const [addressOrAbi, setAddressOrAbi] = useState('')

  const [toAddress, setToAddress] = useState('')
  const [contract, setContract] = useState<ContractInterface | undefined>(undefined)

  const [selectedMethodIndex, setSelectedMethodIndex] = useState(0)
  const [inputCache, setInputCache] = useState<string[]>([])
  const [addTxError, setAddTxError] = useState<string | undefined>()
  const [transactions, setTransactions] = useState<ProposedTransaction[]>([])
  const [value, setValue] = useState('')
  const { addToast } = useToasts()
  const { address } = useParams<{ address: string; chainType: string }>()
  // const mpcGroupAccount = useAccount(address)
  const ChainInfo = useChainInfo()

  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
    setTransactions([])
  }

  const handleAddressOrABI = async (e: React.ChangeEvent<HTMLInputElement>): Promise<ContractInterface | void> => {
    setContract(undefined)

    const cleanInput = e.currentTarget?.value?.trim()
    setAddressOrAbi(cleanInput)

    if (!cleanInput.length || !services.web3 || !services.interfaceRepo) {
      return
    }

    if (toAddress.length === 0 && services.web3.utils.isAddress(cleanInput)) {
      setToAddress(cleanInput)
    }

    try {
      const contract = await services.interfaceRepo.loadAbi(cleanInput)
      setContract(contract)
    } catch (error) {
      console.error(error)
      addToast((error as Error).message, { appearance: 'error' })
    }
  }

  const handleMethod = useCallback(
    async (methodIndex: number) => {
      if (!contract || contract.methods.length <= methodIndex) return
      setSelectedMethodIndex(methodIndex)
    },
    [contract]
  )

  const handleInput = useCallback(
    async (inputIndex: number, input: string) => {
      inputCache[inputIndex] = input
      setInputCache(inputCache.slice())
    },
    [inputCache]
  )

  const getContractMethod = () => contract?.methods[selectedMethodIndex]

  const isValueInputVisible = () => {
    const method = getContractMethod()
    return method?.payable
  }

  const addTransaction = useCallback(async () => {
    let description = ''
    let data = ''

    const web3 = services.web3

    if (!web3) {
      return
    }

    if (contract && contract.methods.length > selectedMethodIndex) {
      const method = contract.methods[selectedMethodIndex]
      const cleanInputs = []

      description = method.name + ' ('
      for (let i = 0; i < method.inputs.length; i++) {
        const cleanValue = inputCache[i] || ''
        cleanInputs[i] = cleanValue.charAt(0) === '[' ? JSON.parse(cleanValue.replace(/"/g, '"')) : cleanValue
        if (i > 0) {
          description += ', '
        }
        const input = method.inputs[i]
        description += (input.name || input.type) + ': ' + cleanValue
      }
      description += ')'

      try {
        data = web3.eth.abi.encodeFunctionCall(method as AbiItem, cleanInputs)
      } catch (error) {
        setAddTxError((error as Error).message)
        return
      }
    }

    try {
      const cleanTo = web3.utils.toChecksumAddress(toAddress)

      const cleanValue = value.length > 0 ? value : 0
      const haveNative = value.length > 0 ? true : false

      if (data.length === 0) {
        data = '0x'
      }

      if (description.length === 0) {
        description = `Transfer ${cleanValue} ETH to ${cleanTo}`
      }
      if (address != undefined)
        transactions.push({
          description,
          raw: { from: address, to: cleanTo, value: cleanValue, data, haveNative }
        })

      setInputCache([])
      setTransactions(transactions)
      setSelectedMethodIndex(0)
      setValue('')
    } catch (e) {
      console.error(e)
    }
  }, [services, transactions, toAddress, value, contract, selectedMethodIndex, inputCache, address])

  const deleteTransaction = useCallback(
    async (inputIndex: number) => {
      const newTxs = transactions.slice()
      newTxs.splice(inputIndex, 1)
      setTransactions(newTxs)
    },
    [transactions]
  )

  const sendTransactions = useCallback(async () => {
    if (!transactions.length) {
      return
    }

    setIsOpen(true)

    //     try {
    //       sdk.txs.send({ txs: transactions.map((d) => d.raw) });
    //     } catch (e) {
    //       console.error(e);
    //     }
  }, [transactions])

  const handleSubmit = () => {
    sendTransactions()
    // setTransactions([])
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getInputInterface = (input: any) => {
    // This code renders a helper for the input text.
    // When the parameter is of Tuple type, it renders an array with the parameters types
    // required to form the Tuple, if not, it renders the parameter type directly.
    if (input.type.startsWith('tuple')) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return `tuple(${input.components.map((c: any) => c.internalType).toString()})${input.type.endsWith('[]') ? '[]' : ''}`
    } else {
      return input.type
    }
  }
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="w-full sm:w-1/2 mt-4 flex flex-col  gap-1 ">
        <div className="mb-6">
          <label htmlFor="ContractAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Enter Contract Address
          </label>
          {/* address Input */}
          <input
            type="text"
            id="ContractAddress"
            value={addressOrAbi}
            onChange={handleAddressOrABI}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="EnterABI" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Enter ABI
          </label>
          <textarea
            rows={4}
            cols={50}
            value={contract?.abiString}
            id="EnterABI"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* Input To (destination) */}
        <When condition={isValueInputVisible() || (contract !== undefined && contract.methods.length > 0)}>
          <h2>Transaction information</h2>
          <div className="mb-6">
            <label htmlFor="ContractAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              To Address
            </label>
            <input
              type="text"
              id="toAddress"
              value={toAddress}
              onChange={e => setToAddress(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </When>

        <When condition={contract && contract.methods.length > 0}>
          <div className="mb-6">
            <br />
            <label htmlFor="ContractMethods" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Contract Methods
            </label>
            <select
              onChange={e => {
                setAddTxError(undefined)
                handleMethod(Number(e.target.value))
                setValue('')
              }}
              id="ContractMethods"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {contract &&
                contract.methods.map((method, index) => {
                  return (
                    <option selected={selectedMethodIndex.toString() == index.toString()} key={index} value={index}>
                      {method.name}
                    </option>
                  )
                })}
            </select>
          </div>
        </When>
        {/* Input ETH value */}
        <When condition={isValueInputVisible()}>
          <div className="mb-6">
            <label htmlFor="ContractAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {ChainInfo?.nativeCurrency.name} Unit:wei
            </label>
            <input
              type="text"
              id="toAddress"
              value={value}
              onChange={e => setValue(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </When>
        <When condition={getContractMethod() !== undefined}>
          {getContractMethod()?.inputs.map((input, index) => {
            return (
              <div key={index}>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{`${input.name || ''}(${getInputInterface(input)})`}</label>
                  <input
                    type="text"
                    value={inputCache[index] || ''}
                    onChange={e => {
                      setAddTxError(undefined)
                      handleInput(index, e.target.value)
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
            )
          })}
        </When>
        <When condition={addTxError}>
          <div className="mb-6 text-red-400">{addTxError}</div>
        </When>
        <When condition={isValueInputVisible() || (contract && contract.methods.length > 0)}>
          <When condition={transactions.length == 0}>
            <button
              onClick={() => addTransaction()}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 "
            >
              Add transaction
            </button>
          </When>
        </When>
      </div>

      <div className="w-full sm:w-1/2 px-8">
        <When condition={transactions.length === 0}>
          <div className=" flex  h-screen w-full  justify-center">
            <div className=" mt-10">Create a new transaction</div>
          </div>
        </When>
        <When condition={transactions.length !== 0}>
          <div className=" relative  w-full sm:fixed flex flex-col">
            <h1 className=" text-2xl mb-8 ">{transactions.length} Transactions </h1>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {transactions.map((item, index) => {
                return (
                  <li className="pb-3 sm:pb-4 sm:max-w-sm" key={index}>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">{index + 1}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">{item.description}</p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">to: {cutOut(item.raw.to, 10, 10)}</p>
                      </div>
                      <div
                        onClick={() => {
                          deleteTransaction(index)
                        }}
                        className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white cursor-pointer"
                      >
                        x
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
            <div>
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 "
                disabled={!transactions.length}
                onClick={() => handleSubmit()}
              >
                {`Send Transactions ${transactions.length ? `(${transactions.length})` : ''}`}
              </button>
            </div>
          </div>
        </When>
      </div>
      <ContractModel
        isOpen={isOpen}
        closeModal={closeModal}
        transaction={transactions && transactions.length > 0 ? transactions[0] : undefined}
      ></ContractModel>
    </div>
  )
}

export default TransactionBuild
