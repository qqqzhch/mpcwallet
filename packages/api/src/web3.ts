


import Web3 from 'web3'

// try {
//   web3 = new Web3(new Web3.providers.HttpProvider(config.serverRPC))
// } catch (error) {
//   web3 = new Web3()
// }
let web3 = new Web3();

web3.extend({
  property: "smpc",
  methods: [
    {
      name: "getGroupID",
      call: "smw_getGroupId",
      params: 2,
      inputFormatter: [null, null],
      outputFormatter: undefined,
    },
    {
      name: "reqSmpcAddr",
      call: "smpc_reqSmpcAddr",
      params: 1,
      inputFormatter: [null],
      outputFormatter: undefined,
    },
    {
      name: "reqKeyGen",
      call: "smw_keyGen",
      params: 2,
      inputFormatter: [null, null],
      outputFormatter: undefined,
    },

    {
      name: "acceptKeyGen",
      call: "smpc_acceptKeyGen",
      params: 2,
      inputFormatter: [null, null],
      outputFormatter: undefined,
    },
    {
      name: "signing",
      call: "smpc_signing",
      params: 2,
      inputFormatter: [null, null],
      outputFormatter: undefined,
    },
    {
      name: "acceptSign",
      call: "smw_acceptSign",
      params: 2,
      inputFormatter: [null, null],
      outputFormatter: undefined,
    },

    {
      name: "acceptLockOut",
      call: "smpc_acceptLockOut",
      params: 1,
      inputFormatter: [null],
      outputFormatter: undefined,
    },
    {
      name: "lockOut",
      call: "smpc_lockOut",
      params: 1,
      inputFormatter: [null],
      outputFormatter: undefined,
    },
    {
      name: "getCurNodeLockOutInfo",
      call: "smpc_getCurNodeLockOutInfo",
      params: 1,
      inputFormatter: [null],
      outputFormatter: undefined,
    },
    {
      name: "getBalance",
      call: "smpc_getBalance",
      params: 3,
      inputFormatter: [null, null, null],
      outputFormatter: undefined,
    },
    {
      name: "getLockOutNonce",
      call: "smpc_getLockOutNonce",
      params: 3,
      inputFormatter: [null, null, null],
      outputFormatter: undefined,
    },
    {
      name: "getEnode",
      call: "smpc_getEnode",
      params: 0,
      inputFormatter: [],
      outputFormatter: undefined,
    },
    {
      name: "getSDKGroupPerson",
      call: "smpc_getSDKGroupPerson",
      params: 1,
      inputFormatter: [null],
      outputFormatter: undefined,
    },
    {
      name: "getEnodeStatus",
      call: "smpc_getEnodeStatus",
      params: 1,
      inputFormatter: [null],
      outputFormatter: undefined,
    },
    {
      name: "createSDKGroup",
      call: "smpc_createSDKGroup",
      params: 3,
      inputFormatter: [null, null, null],
      outputFormatter: undefined,
    },
    {
      name: "setGroupNodeStatus",
      call: "smpc_setGroupNodeStatus",
      params: 3,
      inputFormatter: [null, null, null],
      outputFormatter: undefined,
    },
    {
      name: "getGroupNodeStatus",
      call: "smpc_getGroupNodeStatus",
      params: 1,
      inputFormatter: [null],
      outputFormatter: undefined,
    },
    {
      name: "getSDKGroup",
      call: "smpc_getSDKGroup",
      params: 1,
      inputFormatter: [null],
      outputFormatter: undefined,
    },
    {
      name: "getGroupByID",
      call: "smpc_getGroupByID",
      params: 1,
      inputFormatter: [null],
      outputFormatter: undefined,
    },
    {
      name: "getAccounts",
      call: "smw_getAccountList",
      params: 1,
      inputFormatter: [null],
      outputFormatter: undefined,
    },
    {
      name: "getAccountsBalance",
      call: "smpc_getAccountsBalance",
      params: 2,
      inputFormatter: [null, null],
      outputFormatter: undefined,
    },
    {
      name: "getCurNodeReqAddrInfo",
      call: "smpc_getCurNodeReqAddrInfo",
      params: 1,
      inputFormatter: [null],
      outputFormatter: undefined,
    },
    {
      name: "getReqAddrStatus",
      call: "smw_getReqAddrStatus",
      params: 1,
      inputFormatter: [null],
      outputFormatter: undefined,
    },
    {
      name: "acceptReqAddr",
      call: "smpc_acceptReqAddr",
      params: 1,
      inputFormatter: [null],
      outputFormatter: undefined,
    },
    {
      name: "getSignNonce",
      call: "smpc_getSignNonce",
      params: 1,
      inputFormatter: [null],
      outputFormatter: undefined,
    },
    {
      name: "getNonce",
      call: "smw_getNonce",
      params: 4,
      inputFormatter: [null,null,null,null],
      outputFormatter: undefined,
    },
    {
      name: "getLockOutStatus",
      call: "smpc_getLockOutStatus",
      params: 1,
      inputFormatter: [null],
      outputFormatter: undefined,
    },
    {
      name: "getSmpcAddr",
      call: "smpc_getSmpcAddr",
      params: 1,
      inputFormatter: [null],
      outputFormatter: undefined,
    },
    {
      name: "sign",
      call: "smw_sign",
      params: 2,
      inputFormatter: [null,null],
      outputFormatter: undefined,
    },
    {
      name: "getSignStatus",
      call: "smpc_getSignStatus",
      params: 1,
      inputFormatter: [null],
      outputFormatter: undefined,
    },
    {
      name: "getCurNodeSignInfo",
      call: "smpc_getCurNodeSignInfo",
      params: 1,
      inputFormatter: [null],
      outputFormatter: undefined,
    },
    {
      name: "getUnsigedTransactionHash",
      call: "smw_getUnsigedTransactionHash",
      params: 2,
      inputFormatter: [null,null],
      outputFormatter: undefined,
    },
    {
      name: "getApprovalList",
      call: "smw_getApprovalList",
      params: 1,
      inputFormatter: [null],
      outputFormatter: undefined,
    },
    {
      name: "getSignHistory",
      call: "smw_getSignHistory",
      params: 1,
      inputFormatter: [null],
      outputFormatter: undefined,
    },
    {
      name: "getTxStatusByKeyId",
      call: "smw_getTxStatusByKeyId",
      params: 1,
      inputFormatter: [null],
      outputFormatter: undefined,
    },
    {
      name: "getTxHashByKeyId",
      call: "smw_getTxHashByKeyId",
      params: 1,
      inputFormatter: [null],
      outputFormatter: undefined,
    },
    {
      name: "getAssetList",
      call: "smw_getAsset",
      params: 3,
      inputFormatter: [null,null,null],
      outputFormatter: undefined,
    },
    {
      name: "addAsset",
      call: "smw_addAsset",
      params: 2,
      inputFormatter: [null,null],
      outputFormatter: undefined,
    },
    {
      name: "getMpcAddressDetail",
      call: "smw_getMpcAddressDetail",
      params: 1,
      inputFormatter: [null],
      outputFormatter: undefined,
    },
    {
      name: "getApprovalListByKeyId",
      call: "smw_getApprovalListByKeyId",
      params: 1,
      inputFormatter: [null],
      outputFormatter: undefined,
    },
    {
      name: "getLatestMpcAddressStatus",
      call: "smw_getLatestMpcAddressStatus",
      params: 3,
      inputFormatter: [null,null,null],
      outputFormatter: undefined,
    }

    

    
  ],
});


export default web3;
// module.exports = web3

export  function getsmpc(rpc?:string){
  if(rpc){
    web3.setProvider(rpc)
  }
  // @ts-ignore
  return  web3.smpc
}

export const abi = [
  {
    constant: false,
    inputs: [
      { name: "_to", type: "address" },
      { name: "_value", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
