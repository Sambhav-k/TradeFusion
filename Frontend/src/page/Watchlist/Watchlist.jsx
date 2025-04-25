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
import { BookmarkFilledIcon } from '@radix-ui/react-icons';
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from 'react-redux';
import { addItemToWatchlist, getUserWatchlist } from '@/State/WatchList/Action';
import { useNavigate } from 'react-router-dom';

const Watchlist = () => {
  const dispatch=useDispatch();
  const {watchlist}=useSelector(store=>store)
  const navigate = useNavigate();

  const handleAddToWatchlist=(id)=>{
    dispatch(addItemToWatchlist(id))
  }

  useEffect(()=>{
    dispatch(getUserWatchlist(localStorage.getItem("jwt")))
  },[])

  
  return (
    <div className='p-5 lg:px-20'>
          <h1 className='font-bold text-3xl pb-5'>Watchlist</h1>
          <Table className="border">
            
            <TableHeader>
              <TableRow>
                <TableHead className="py-5">Coin</TableHead>
                <TableHead>SYMBOL</TableHead>
                <TableHead>VOLUME</TableHead>
                <TableHead>MARKET CAP</TableHead>
                <TableHead>24h</TableHead>
                <TableHead className="">PRICE</TableHead>
                <TableHead className="text-right text-red-600">REMOVE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {watchlist.items.map((item,index)=><TableRow key={index}>
              <TableCell
                  onClick={() => navigate(`/market/${item.id}`)}
                  className="font-medium flex items-center gap-2 cursor-pointer"
                >
                  <Avatar className="-z-50">
                      <AvatarImage src={item.image}/>
                  </Avatar>
                  
                  <span>{item.name}</span>
                  
                </TableCell>
                <TableCell>{item.symbol.toUpperCase()}</TableCell>
                <TableCell>{item.total_volume}</TableCell>
                <TableCell>{item.market_cap}</TableCell>
                <TableCell
                  className={`${
                    item.market_cap_change_percentage_24h < 0
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {item.market_cap_change_percentage_24h}%
                </TableCell>
                <TableCell className="">${item.current_price}</TableCell>
                <TableCell className="text-right">
                  <Button onClick={()=>handleAddToWatchlist(item.id)} className="h-10 w-10" variant="outline" size="icon">
                    <BookmarkFilledIcon className="h-6 w-6" />
                  </Button>
                </TableCell>
              </TableRow>)}
              
            </TableBody>
          </Table>
        </div>
  )
}

export default Watchlist
