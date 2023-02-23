export interface peopleType {
  id: number
  name: string
}

export interface nodeItem {
  address: string
  createFailNum: number
  createNum: number
  groupNum: number
  name: string
  nodeType: string
  signFailNum: number
  signNum: number
  staking: number
  status: number
  version: string
  _id: string
}

export interface nodeList {
  info: Array<nodeItem>
  msg: string
}
