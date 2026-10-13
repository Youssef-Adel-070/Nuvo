"use client"

import Link from "next/link"
import {
  ArrowLeft,
  Check,
  CreditCard,
  MapPin,
  Plus,
  Trash2,
  WalletCards,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useContext, useEffect, useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { addAddress, getAddress, removeAddressdata } from "@/services/addressService"
import { Label } from "@/components/ui/label"
import { CashSession, checkoutSession } from "@/services/checkoutServices"
import { CartContext } from "@/Context/CartContext"
import { useRouter } from "next/navigation"
import { CartResponse } from "@/Interface"
import Image from "next/image"
import toast from "react-hot-toast"

type address={ _id?:string ,name:string,details:string,phone:string,city:string}
export default function AddressForm() {
  const [savedAddresses,setSavedAddressser] = useState<address[]>([]) 

  const [hiddenInput,setHiddenInput]=useState<HTMLButtonElement|string>('hidden')   
  const [selectedAddresss,setSelectedAddresss]=useState<address|undefined>()   
  const [paymentMethod,setPaymentMethod]=useState<'visa'|'cash'>('visa')   
  const [postalcode,setPostalcode]=useState<string>('')    
  const [items,setItems]=useState<CartResponse|null>(null)

const {cartData,setCartData}=useContext(CartContext) 
const router=useRouter()

 
const {handleSubmit,register,control,reset}=useForm({ 
            defaultValues:{ 
                 
                name:'',
                details:'',
                phone:'',
                city:'',
              

            }
            
}) 
async function addDataForm(data:address){ 
   console.log(data); 
 const newAddress= await addAddress(data)  
 setSavedAddressser(newAddress) 
 setHiddenInput("hidden")
   reset()
   
} 


async function getDataForm(){ 

   const newAddress= await getAddress()   
       setSavedAddressser(newAddress) 

       
       
   
   
}
  
async function removeDataForm(id:string) {
   const data= await removeAddressdata(id)
   setSavedAddressser(data)
} 


    

function placeOrder(dataAddress:address,paymethod:string){ 
  
    if (paymethod=='visa') { 
        const shippingAdress={ 
            details:dataAddress.details,
            city:dataAddress.city,
            phone:dataAddress.phone,
        } 
            if (cartData) {
                
                const cartId=cartData?.cartId
                checkoutSession(shippingAdress,{cartId})
            }
    } 
    if(paymethod=='cash'){ 
          const shippingAdress={ 
            details:dataAddress.details,
            city:dataAddress.city,
            phone:dataAddress.phone, 
            postalcode
        }  
           if (cartData) {
                
                const cartId=cartData?.cartId 
                if(postalcode){
                CashSession(shippingAdress,{cartId})
                router.push('/allorders')
                 setCartData(null) 
                 }else{ 
                  toast.error("Please enter your postal code to continue with cash payment")
                 }
            }
    }
}

useEffect(()=>{ 
    getDataForm() 
 
     
},[])
useEffect(()=>{ 
    
 
    if(cartData?.data){ 

        setItems(cartData)
    }
   
     
},[cartData])

  return (
    <main className="min-h-screen bg-[#FBF9F6] text-slate-900">
      
   

      {/* Content */}
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* LEFT */}
          <div className="space-y-8">
            {/* Delivery Address */}
            <section className="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-sm sm:p-7"> 
              <div className="mb-7">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    <MapPin size={18} />
                  </div>

                  <h2 className="text-xl font-bold">
                    Delivery Address
                  </h2>
                </div>

                <p className="text-sm text-slate-500">
                  Choose where you want your order delivered.
                </p>
              </div>

              {/* Saved Addresses */}
             {/* Saved Addresses */}
<div className="grid gap-4 sm:grid-cols-2">
  {savedAddresses.length > 0 ? (
    savedAddresses.map((address) => {
      const isSelected = selectedAddresss?._id === address._id

      return (
        <div
          key={address._id}
          onClick={() => setSelectedAddresss(address)}
          className={`group relative min-h-[205px] cursor-pointer overflow-hidden rounded-2xl border p-5 transition-all duration-300 ${
            isSelected
              ? "border-amber-400 bg-gradient-to-br from-amber-50 via-white to-amber-50/40 shadow-md shadow-amber-100"
              : "border-stone-200 bg-white hover:-translate-y-1 hover:border-amber-300 hover:shadow-md"
          }`}
        >
          {/* Selected indicator */}
          <div
            className={`absolute right-4 top-4 flex size-7 items-center justify-center rounded-full transition-all duration-300 ${
              isSelected
                ? "scale-100 bg-amber-500 text-white shadow-sm"
                : "scale-75 border border-stone-200 bg-white opacity-0 group-hover:scale-100 group-hover:opacity-100"
            }`}
          >
            {isSelected && (
              <Check size={15} strokeWidth={3} />
            )}
          </div>

          {/* Decorative background */}
          <div
            className={`absolute -right-10 -top-10 size-28 rounded-full transition-all duration-500 ${
              isSelected
                ? "bg-amber-100/50"
                : "bg-stone-100/60 group-hover:bg-amber-50"
            }`}
          />

          {/* Header */}
          <div className="relative mb-5 flex items-center gap-3 pr-8">
            <div
              className={`flex size-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                isSelected
                  ? "bg-amber-100 text-amber-700"
                  : "bg-stone-100 text-slate-500 group-hover:bg-amber-50 group-hover:text-amber-600"
              }`}
            >
              <MapPin size={20} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-base font-bold text-slate-900">
                {address.name}
              </p>

              <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-slate-400">
                Delivery address
              </p>
            </div>
          </div>

          {/* Address details */}
          <div className="relative space-y-3">
            <div>
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Address
              </p>

              <p className="line-clamp-2 text-sm leading-5 text-slate-600">
                {address.details}
              </p>
            </div>

            {/* City + Phone */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-stone-100 px-2.5 py-1.5 text-xs font-semibold capitalize text-slate-700">
                {address.city}
              </span>

              <span className="h-1 w-1 rounded-full bg-stone-300" />

              <span className="text-xs font-medium text-slate-500">
                {address.phone}
              </span>
            </div>
          </div>

          {/* Delete button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              removeDataForm(address?._id!)
            }}
            className="absolute bottom-4 right-4 flex size-9 items-center justify-center rounded-xl border border-transparent text-slate-400 opacity-70 transition-all duration-200 hover:border-red-100 hover:bg-red-50 hover:text-red-500 hover:opacity-100 active:scale-90"
            aria-label={`Delete ${address.name} address`}
          >
            <Trash2 size={16} />
          </button>

          {/* Selected bottom accent */}
          <div
            className={`absolute bottom-0 left-0 h-1 bg-amber-500 transition-all duration-300 ${
              isSelected ? "w-full" : "w-0 group-hover:w-1/3"
            }`}
          />
        </div>
      )
    })
  ) : (
    <div className="group col-span-full flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-gradient-to-br from-stone-50/80 via-white to-amber-50/30 px-6 text-center transition-all duration-300 hover:border-amber-300">
      <div className="mb-4 flex size-14 items-center justify-center rounded-2xl border border-stone-200 bg-white text-slate-400 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-amber-200 group-hover:bg-amber-50 group-hover:text-amber-600">
        <MapPin
          size={25}
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <h3 className="text-lg font-bold text-slate-800">
        No saved addresses
      </h3>

      <p className="mt-1 max-w-sm text-sm leading-6 text-slate-500">
        You don&apos;t have a delivery address yet. Add one to continue
        with your order.
      </p>

    </div>
  )}

  {/* Add New Address */}
  <button
    type="button"
    onClick={() => setHiddenInput("")}
    className="group flex min-h-[205px] flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-stone-50/50 px-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:bg-amber-50/40 hover:shadow-sm"
  >
    <div className="mb-4 flex size-12 items-center justify-center rounded-xl border border-stone-300 bg-white text-slate-500 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-amber-300 group-hover:bg-amber-100 group-hover:text-amber-700">
      <Plus
        size={22}
        className="transition-transform duration-300 group-hover:rotate-90"
      />
    </div>

    <span className="text-sm font-bold text-slate-800">
      Add New Address
    </span>

    <span className="mt-1.5 max-w-[180px] text-xs leading-5 text-slate-500">
      Use a different delivery address
    </span>
  </button>
</div>
            </section>

            {/* Add Address Form */}
            <section className={`rounded-[2rem] border border-stone-200 bg-white p-5 shadow-sm sm:p-7 ${hiddenInput} `}>
              <div className="mb-7">
                <h2 className="text-xl font-bold">
                  Add New Address
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Add a new address for your delivery.
                </p>
              </div>

              <form  onSubmit={handleSubmit(addDataForm)} className="space-y-5">
                {/* Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="address-name"
                    className="text-sm font-semibold"
                  >
                    Address Name
                  </label>

                  <Input
                    id="address-name" 
                    {...register('name')} 
                    
                    placeholder="e.g. Home"
                    className="h-12 rounded-xl border-stone-200 bg-stone-50/50 px-4 shadow-none focus-visible:border-amber-400 focus-visible:ring-amber-400/20"
                  />
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <label
                    htmlFor="address-details"
                    className="text-sm font-semibold"
                  >
                    Address Details
                  </label>

                  <Input
                    id="address-details" 
                      {...register('details')} 
                    placeholder="Apartment, street, building..."
                    className="h-12 rounded-xl border-stone-200 bg-stone-50/50 px-4 shadow-none focus-visible:border-amber-400 focus-visible:ring-amber-400/20"
                  />
                </div>
               

                {/* Phone + City */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-sm font-semibold"
                    >
                      Phone
                    </label>

                    <Input
                      id="phone" 
                        {...register('phone')} 
                      type="tel"
                      placeholder="01010700700"
                      className="h-12 rounded-xl border-stone-200 bg-stone-50/50 px-4 shadow-none focus-visible:border-amber-400 focus-visible:ring-amber-400/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold">
                      City
                    </label>

                    <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <Select 
                        onValueChange={field.onChange} 
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="h-12 w-full rounded-xl border-stone-200 bg-stone-50/50 shadow-none focus:border-amber-400 focus:ring-amber-400/20">
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="cairo">Cairo</SelectItem>
                          <SelectItem value="gizaa">Gizaa</SelectItem>
                          <SelectItem value="benha">Benha</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                  <Button
                    type="button" 
                    onClick={()=>setHiddenInput('hidden')}
                    variant="outline"
                    className="h-11 rounded-xl border-stone-200 px-6"
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit" 
                    
                    className="h-11 rounded-xl bg-slate-950 px-6 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 active:scale-95"
                  >
                    Save Address
                  </Button>
                </div>
              </form>
            </section>

            {/* Payment */}
            <section className="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-7">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    <CreditCard size={18} />
                  </div>

                  <h2 className="text-xl font-bold">
                    Payment Method
                  </h2>
                </div>

                <p className="text-sm text-slate-500">
                  Choose how you want to pay for your order.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Visa */}
                
                <div onClick={()=>setPaymentMethod('visa')} className= {`relative cursor-pointer rounded-2xl ${paymentMethod=="visa"? "border border-amber-400  bg-amber-50/50":' border border-stone-200 bg-white'} p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-md`}>
                 
                 {paymentMethod=='visa'? <div className="absolute right-4 top-4 flex size-6 items-center justify-center rounded-full bg-amber-500 text-white">
                    <Check size={14} strokeWidth={3} />
                  </div>:""}

                  <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-white text-slate-900 shadow-sm">
                    <CreditCard size={21} />
                  </div>

                  <h3 className="font-bold">
                    Visa / Card
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Pay securely online
                  </p>
                </div>

                {/* Cash */}
                <div onClick={()=>setPaymentMethod('cash')} className={`relative cursor-pointer rounded-2xl ${paymentMethod=="cash"? "border border-amber-400 bg-amber-50/50":' border border-stone-200 bg-white'}  p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300 hover:shadow-md`}>
                  <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-stone-100 text-slate-700">
                    <WalletCards size={21} />
                  </div> 
                    {paymentMethod=='cash'? <div className="absolute right-4 top-4 flex size-6 items-center justify-center rounded-full bg-amber-500 text-white">
                    <Check size={14} strokeWidth={3} />
                  </div>:""}

                  <h3 className="font-bold">
                    Cash
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Pay when your order arrives
                  </p> 
                </div>  
                {paymentMethod=='cash'&&
               <div className="space-y-1 p-2"> 
                 <Label htmlFor="postalCode">PostalCode</Label>
                  <Input name='postalCode' placeholder="Enter your postalCode like :11478" id="postalCode" value={postalcode} onChange={(e)=>setPostalcode(e.target?.value!)}></Input>
               </div>
                }
              </div>
            </section>
          </div>

          {/* RIGHT — ORDER SUMMARY */}
          <aside className="lg:sticky lg:top-8 lg:h-fit">
            <div className="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-sm sm:p-7">
              <h2 className="text-xl font-bold">
                Order Summary
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Review your order before placing it.
              </p>

              {/* Products */}
              <div className="mt-7 space-y-4">  
                { items?.data.products.map((item)=><div key={item.product._id} className="flex items-center gap-4">
                  <div className="size-16 shrink-0 rounded-xl bg-stone-100"> 

                    <Image src={item.product.imageCover} alt={item.product.title} width={300} height={300}/>

                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {item.product.title}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Qty: {item.count}
                    </p>
                  </div>

                  <p className="text-sm font-bold">
                    EGP {item.price}
                  </p>
                </div>)}

                
              </div>

              <div className="my-7 h-px bg-stone-200" />

              {/* Prices */}
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Subtotal
                  </span>

                  <span className="font-medium">
                    EGP {cartData?.data.totalCartPrice}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Shipping
                  </span>

                  <span className="font-medium">
                    EGP {paymentMethod=='cash'?'100':"0"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Tax
                  </span>

                  <span className="font-medium">
                    EGP {paymentMethod=='cash'?'20':"0"}
                  </span>
                </div>
              </div>

              <div className="my-6 h-px bg-stone-200" />

              {/* Total */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Total
                  </p>

                  <p className="mt-1 text-2xl font-bold tracking-tight">
                    EGP   {paymentMethod=='cash'? cartData?.data?cartData?.data.totalCartPrice+100+20:'':cartData?.data.totalCartPrice}
                  </p>
                </div>
              </div>
 

 <div className="flex items-center justify-center flex-col space-y-2">
              <Button
                type="button" 
                onClick={()=> selectedAddresss? placeOrder(selectedAddresss,paymentMethod):""}
                className="mt-7 h-13 w-full rounded-xl bg-slate-950 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg active:scale-[0.98]"
              >
                Place Order
              </Button> 

              <Button className={'w-full '} variant={'outline'}> 
                  <Link  href="/cart" className="group flex items-center gap-2 text-lg p-1   font-medium text-slate-600 transition-colors hover:text-amber-500" > 

            <ArrowLeft
              size={20}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to Cart
          </Link>
          </Button>
</div>
              <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                By placing your order, you agree to our terms
                and conditions.
              </p>
            </div>
          </aside>
        </div>
        </div>
      
    </main>
  )
}