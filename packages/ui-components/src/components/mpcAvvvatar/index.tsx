import {FC} from 'react';
import Avvvatars from 'avvvatars-react'
import useAccount from '../../hooks/useAccount';

const MpcAvvvatar:FC<{address:string | undefined,chainid:number | undefined}> = ({address,chainid}) => {
    const wallet = useAccount(address)
    // wallet?.Threshold
    return (
        <div className=" w-12 relative ">
            <span className=" absolute  bg-green-200  text-[12px]  p-[3px]  rounded-xl  -top-2 left-6  ">{wallet?.Threshold}</span>
          <Avvvatars value={address ? address : ''} style="shape" size={40} />
        </div>
    );
};

export default MpcAvvvatar;