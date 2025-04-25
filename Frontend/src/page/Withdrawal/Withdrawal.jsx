import React, { useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from 'react-redux';
import { getWithdrawalHistory } from '@/State/Withdrawal/Action';
import { readableTimestamp } from '@/Util/readableTimestamp';



const Withdrawal = () => {
  const dispatch=useDispatch();
  const {wallet,withdrawal}=useSelector(store=>store);  

  useEffect(()=>{
    dispatch(getWithdrawalHistory(localStorage.getItem("jwt")))
  },[])



  return (
    <div className='p-5 lg:px-20'>
                  <h1 className='font-bold text-3xl pb-5'>Withdrawal</h1>
                  <Table className="border">
                    
                    <TableHeader>
                      <TableRow>
                        <TableHead className="py-5">Date </TableHead>
    
                        <TableHead>Method</TableHead>
                        
                        <TableHead>Amount</TableHead>
                        
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {withdrawal.history.map((item,index)=><TableRow key={index}>
                        <TableCell>
                        {readableTimestamp(item?.date)}
                          
                        </TableCell>
                        
                        
                        <TableCell>bank</TableCell>
                        
                        <TableCell className="">${item.amount}</TableCell>
                        <TableCell className="text-right">
                         {item.status}
                        </TableCell>
                      </TableRow>)}
                      
                    </TableBody>
                  </Table>
                </div>  
  )
}

export default Withdrawal
