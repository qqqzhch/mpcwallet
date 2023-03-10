import {FC} from 'react';
import useAccounts from '../../hooks/useAccounts';

const FetchDataGlobal:FC = () => {
    useAccounts()
    return (<></>);
};

export default FetchDataGlobal;