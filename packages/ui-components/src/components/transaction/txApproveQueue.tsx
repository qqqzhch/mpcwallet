import { FC,useState,useCallback } from 'react';
import { useAppStore } from '../..'
import { ArrowDownIcon, ArrowUpRightIcon,UsersIcon } from '@heroicons/react/20/solid'
import { formatTxApprove } from '../../utils'
import dayjs from 'dayjs'
import { classNames } from '../../utils';
import { When } from 'react-if';
import Avvvatars from 'avvvatars-react'
import TxApproveItem from './txApproveItem';



const TxApproveQueue:FC = () => {
  const needMpcApproves = useAppStore((state)=>state.getTxApproveListByStatus(0))
  const [actives,setActives]= useState<{
                                        [key: string]:boolean
                                      }>({})
 const openPanel = useCallback((Key_id:string)=>{
   console.log(Key_id)
  setActives((pre)=>{
     return {
       ...pre,
       [Key_id]:!pre[Key_id]
     }
  })
 },[setActives])
    return (
        <div className="flex flex-col overflow-x-auto  text-base p-2">
              {needMpcApproves.map(item => {
                return (<TxApproveItem key={item.Key_id} txApprove={item}></TxApproveItem>)
              })}
            </div>

    );
};

export default TxApproveQueue;