import React from 'react';
import useSignHistory from '../../hooks/useSignHistory';
import TxApproveItem from './txApproveItem'

const SignHistory = () => {
    const {data,error,isLoading} = useSignHistory()
    return (
        <>
        {data.map((item)=>{
            return (<TxApproveItem key={item.Key_id} txApprove={item}></TxApproveItem>)
        })}
        </>
    );
};

export default SignHistory;