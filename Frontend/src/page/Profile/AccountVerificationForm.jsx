import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';

const AccountVerificationForm = () => {
    const [value,setValue]=useState("")

    const handleSubmit=()=>{
        console.log("Handle Submit")
    }

    return (
        <div className='flex justify-center '>
            <div className='space-y-5 mt-10 w-full'>
                <div className='flex justify-between items-center'>
                    <p>Email :</p>
                    <p>sambhav03@gmail.com</p>
                    <Dialog>
                        <DialogTrigger>
                            <Button className="">Send OTP</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader className="">
                                <DialogTitle>Enter OTP</DialogTitle>
                            </DialogHeader>
                            <div className='py-5 flex gap-10 justify-center items-center '>
                                <InputOTP 
                                onChange={()=>setValue(value)}
                                maxLength={6}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                                <DialogClose>
                                    <Button onClick={handleSubmit} className="w-[10rem]">
                                        Submit
                                    </Button>
                                </DialogClose>

                            </div>

                        </DialogContent>
                    </Dialog>

                </div>
            </div>

        </div>
    )
}

export default AccountVerificationForm
