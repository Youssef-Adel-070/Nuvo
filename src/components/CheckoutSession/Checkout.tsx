'use client'
import React, { useContext, useRef } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from 'react-hook-form'
import { CartResponse } from '@/Interface'
import getUserToken from '@/Helper/getUserToken'
import { CartContext } from '@/Context/CartContext'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'



export default function Checkout({ cartId }: { cartId: string }) {

 
const {setCartData}=useContext(CartContext)

  const detailsInput=useRef<HTMLInputElement|null>(null)
  const phoneInput=useRef<HTMLInputElement|null>(null)
  const cityInput=useRef<HTMLInputElement|null>(null)
  const postalCodeInput=useRef<HTMLInputElement|null>(null) 
  const router=useRouter()
 
  async function checkoutSession(shippingAddress) {
    
      // const shippingAddress={ 
      //   details:detailsInput.current?.value,
      //   phone:phoneInput.current?.value,
      //   city:cityInput.current?.value
      // }
      const response=await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{ 
        method:"POST",
        body:JSON.stringify({shippingAddress}),
        headers:{ 
          token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhYTE4NGZjZmMzM2Q4MDAxMjRlZmFmZiIsIm5hbWUiOiJ5b3BlIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3ODk0NzIxMDEsImV4cCI6MTc5NzI0ODEwMX0.HqeX7GqZEOMrDbnn9KKX6yIc-_pFloeUBOIZcMo8WkI", 
          "Content-Type":"application/json"
        }
      })  
      
      
      const data =await response.json(); 
        console.log(data); 
        if (data.status=="success") {
           
          location.href=data?.session.url
        }
        
    } 

    async function CashSession(){  
      const token=await getUserToken()
      const shippingAddress={ 
        
    details:detailsInput.current?.value ,
    phone: phoneInput.current?.value,
    city: cityInput.current?.value,
    postalCode: postalCodeInput.current?.value
  
      }
       
      const response=await fetch(`https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,{ 
        method:"POST", 
        body:JSON.stringify({shippingAddress}), 
        headers: {
           token:token+"",
           "Content-Type":"application/json"
        }
      }) 


      const data =await response.json() 

      console.log(data); 
      if(data.status=="success"){  
        toast.success(data.message)
        router.push('/allorders')
        setCartData(null)  

      }
      
    }
  return <>
 

  <Dialog>
    <DialogTrigger render={<Button variant="default" className=" w-full cursor-pointer p-2">Proceed to checkout</Button>} />
    <DialogContent className="sm:max-w-sm">
      <form >
          <DialogHeader>
            <DialogTitle>Shipping Address</DialogTitle>
            <DialogDescription>
              Enter your address
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="details">details</Label>
              <Input id="details" name='details' ref={detailsInput}  />
            </Field>
            <Field>
              <Label htmlFor="phone">Phone</Label>
              <Input id='phone' name='phone'  ref={phoneInput}/>
            </Field>
            <Field>
              <Label htmlFor="city">City</Label>
              <Input id='city' name='city' ref={cityInput}  />
            </Field>
            <Field>
              <Label htmlFor="postalCode">PostalCode</Label>
              <Input id='postalCode' name='postalCode' ref={postalCodeInput}  />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button onClick={checkoutSession}>Visa</Button>
            <Button onClick={CashSession} >Cash</Button>
          </DialogFooter>      
        </form>
      </DialogContent>
    </Dialog>
  
  
  </>
}
