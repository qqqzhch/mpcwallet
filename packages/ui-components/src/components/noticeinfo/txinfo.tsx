import React,{FC} from 'react';
import {txItem} from '../../state/index'
import { getChainInfo } from '../../constants/chainInfo';
import { formatUnitsErc20,formatUnits } from '../../utils';
import dayjs from '../../utils/dayjs'
import useTxStatus from '../../hooks/useTxStatus';

//txItem
const Txinfo:FC<{Item:txItem}> = ({Item}) => {
    const fromChainInfo = getChainInfo(Item.fromChainID)
    const toChainInfo = getChainInfo(Item.toChainID)
    // const status = useTxStatus(Item.txhash)
    // console.log(status)
    return (
        <div  className="flex flex-col pb-3">
            <dt className="mb-1 text-gray-500 md:text-md dark:text-gray-400">
                From: {fromChainInfo.label}, TO:{toChainInfo.label}  
            </dt>
            
            <dd className="text-md font-semibold">Amount:{formatUnitsErc20(Item.input,'usdc',6)}{" "}
            Fee:  {formatUnits(Item.fromChainID, Item.fee,true) }
            </dd>
            <dt className="mb-1 text-gray-500 md:text-md dark:text-gray-400">
                Time: {dayjs(Item.creattime).fromNow()}  
            </dt>
            <dt className="mb-1 text-gray-500 md:text-md dark:text-gray-400">
                State: -- 
            </dt>
        </div>
    );
};

export default Txinfo;