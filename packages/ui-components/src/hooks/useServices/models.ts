export interface ProposedTransaction {
  description: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raw: {
    from: string
    to: string
    value: string | number
    data: string
    haveNative: boolean
  }
}
