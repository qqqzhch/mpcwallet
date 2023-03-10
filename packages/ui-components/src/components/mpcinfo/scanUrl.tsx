import { useParams } from 'react-router-dom'
import { FC, useCallback } from 'react'
import {ArrowTopRightOnSquareIcon} from '@heroicons/react/20/solid'
import { useWeb3React } from '@web3-react/core';
import { getChainInfo } from '../../constants/chainInfo'

const ScanUrl:FC = () => {
    const { address } = useParams<{ address: string; chainType: string }>()
    const {chainId}= useWeb3React();
    const ChainInfo = getChainInfo(chainId)

    return (
        <a rel="noreferrer"  target={'_blank'} href={`${ChainInfo?.explorer}address/${address}`}>
            <ArrowTopRightOnSquareIcon className=" h-4 w-4 "></ArrowTopRightOnSquareIcon>
        </a>
    );
};

export default ScanUrl;