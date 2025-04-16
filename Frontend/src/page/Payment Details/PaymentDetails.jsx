import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger, } from '@/components/ui/dialog'
import { Button } from "@/components/ui/button";
import PaymentDetailsForm from "./PaymentDetailsForm";
import React from 'react'

const PaymentDetails = () => {
  return (
    <div className='px-20'>
      <h1 className='text-3xl font-bold py-10'> Payment Details</h1>
      {false?<Card>
        <CardHeader>
          <CardTitle>
            Yes Bank
          </CardTitle>
          <CardDescription>
            A/C No :
            **********1651
          </CardDescription>
          <CardContent>
            <div className='flex items-center'>
              <p className='w-32'>A/c Holder</p>
              <p className='text-gray-400'>: Sambhav Kanugo</p>
            </div>

            <div className='flex items-center'>
              <p className='w-32'>IFSC</p>
              <p className='text-gray-400'>YESB00000007</p>

            </div>
          </CardContent>
        </CardHeader>
      </Card>

      :<Dialog>
          <DialogTrigger>
            <Button className="py-6">Add Payment Details</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="pb-5">
              <DialogTitle>Payment Details</DialogTitle>
            </DialogHeader>
            <PaymentDetailsForm />
          </DialogContent>
        </Dialog>
}
    </div>
    
  )
}

export default PaymentDetails
