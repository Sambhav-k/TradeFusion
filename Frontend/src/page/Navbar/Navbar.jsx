import React from 'react'
import{
Sheet,
SheetContent,
SheetDescription,
SheetHeader,
SheetTitle,
SheetTrigger,
} from "@/components/ui/sheet"
import {
    AvatarIcon,
    DragHandleHorizontalIcon,
    MagnifyingGlassIcon,
  } from '@radix-ui/react-icons';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import  Sidebar  from './Sidebar';


const Navbar = () => {
  
  return (
    <div className='px-2 py-3 border-b z-50 bg-background bg-opacity-0 sticky top-0 left-0 right-0 flex justify-between items-center'>
      <div className='flex items-center gap-3'>
      <Sheet>
  <SheetTrigger>
    <Button variant="ghost" size="icon" className="rounded-full h-11 w-11">
        <DragHandleHorizontalIcon className="h-7 w-7"/>
    </Button>
  </SheetTrigger>
  <SheetContent  className="w-72 border-r-0 flex-col justify-center " side="left">
    <SheetHeader>
      <SheetTitle>
      <div className='text-3xl flex justify-center items-center gap-1'>
        <Avatar>
            <AvatarImage src="https://cdn.pixabay.com/photo/2021/04/30/16/47/binance-logo-6219389_1280.png" />
        </Avatar>
        <div>
            <span className="font-bold text-orange-700">Trade</span>
            <span>Fusion</span>
        </div>
      </div>
      </SheetTitle>
    </SheetHeader>
    <Sidebar/>
  </SheetContent>
      </Sheet>
      <div className='flex h-6 w-6 '>
      <Avatar>
            <AvatarImage src="https://cdn.pixabay.com/photo/2021/04/30/16/47/binance-logo-6219389_1280.png" />
        </Avatar>
        </div>
      <p className='text-sm lg:text-base cursor-pointer'>
        <span className='font-bold text-orange-400'>Trade</span>
        <span>Fusion</span>
      </p>
      

      </div>
      <div>
        <Avatar className='cursor-pointer'>
          <AvatarIcon className='h-8 w-8'/>
          {/* <AvatarFallback>
            S 

          </AvatarFallback> */}
            
          
        </Avatar>
      </div>
    </div>
  )
}

export default Navbar
