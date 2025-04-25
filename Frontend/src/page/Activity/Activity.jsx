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
import { getAllOrdersForUser } from '@/State/Order/Action';
import { calculateProfit } from '@/Util/calculateProfit';
import { readableDate } from "@/Util/readableDate";


const Activity = () => {
  const dispatch=useDispatch()
  const {order}=useSelector(store=>store)

  useEffect(()=>{
    dispatch(getAllOrdersForUser({jwt:localStorage.getItem("jwt")}))
  },[])

 

  return (
    <div className='p-5 lg:px-20'>
              <h1 className='font-bold text-3xl pb-5'>Activity</h1>
              <Table className="border">
                
                <TableHeader>
                  <TableRow>
                    <TableHead className="py-5">Date & Time</TableHead>

                    <TableHead>Trading Pair</TableHead>
                    
                    <TableHead>Buy Price</TableHead>
                    <TableHead> Sell Price</TableHead>
                    <TableHead>Order Type</TableHead>
                    <TableHead className="">Profit/Loss</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.orders.map((item,index)=><TableRow key={index}>
                    <TableCell>
                      <p>{readableDate(item.timestamp).date}</p>
                      <p className='text-grey-400'>{readableDate(item.timestamp).time}</p>
                    </TableCell>
                    <TableCell className="font-medium flex items-center gap-2">
                      <Avatar className="-z-50">
                          <AvatarImage src={item.orderItem.coin?.image}/>
                      </Avatar>
                      
                      <span>{item.orderItem.coin?.name}</span>
                      
                    </TableCell>
                    
                    <TableCell>${item.orderItem.buyPrice}</TableCell>
                    <TableCell>{"$" + item.orderItem.sellPrice || "-"}</TableCell>
                    <TableCell>{item.ordertype}</TableCell>
                    <TableCell
                className={`${
                  calculateProfit(item) < 0 ? "text-red-600" : ""
                }`}
              >
                {item.ordertype == "SELL" ? calculateProfit(item) : "-"}
              </TableCell>
                    <TableCell className="text-right">
                     {item.price}
                    </TableCell>
                  </TableRow>)}
                  
                </TableBody>
              </Table>
            </div>
  )
}

export default Activity
