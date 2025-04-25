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
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from 'react-redux';
import { getUserAssets } from '@/State/Asset/Action';

const Portfolio = () => {
  const dispatch=useDispatch();
  const {asset}=useSelector(store=>store)

  useEffect(()=>{
    dispatch(getUserAssets(localStorage.getItem("jwt")))
  },[]);
  return (
  
    <div className='p-5 lg:px-20'>
      <h1 className='font-bold text-3xl pb-5'>Portfolio</h1>
      <Table>
        
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Asset</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>24h Change</TableHead>
            <TableHead>24h Change%</TableHead>
            <TableHead className="text-right">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {asset.userAssets.map((item,index)=><TableRow key={index}>
            <TableCell className="font-medium flex items-center gap-2">
              <Avatar className="-z-50">
                  <AvatarImage src={item.coin?.image}/>
              </Avatar>
              <span>{item.coin?.name}</span>
            </TableCell>
            <TableCell>${item.coin.current_price}</TableCell>
            <TableCell>{item?.quantity}</TableCell>
            <TableCell
                    className={`${
                      item.coin.price_change_percentage_24h < 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {item.coin.price_change_24h}
                  </TableCell>
                  <TableCell
                    className={`${
                      item.coin.price_change_percentage_24h < 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {item.coin.price_change_percentage_24h}%
                  </TableCell>
                  <TableCell className="text-right">
                    {item.coin.current_price * item.quantity}
                  </TableCell>
          </TableRow>)}
          
        </TableBody>
      </Table>
    </div>
  )
}

export default Portfolio
