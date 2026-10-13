'use client'
import Loading from '@/app/loading'
import Checkout from '@/components/CheckoutSession/Checkout'
import { Button } from '@/components/ui/button'
import { CartContext } from '@/Context/CartContext'
import { formatCurrency } from '@/Helper/formatCurreny'
import getUserToken from '@/Helper/getUserToken'
import { CartResponse } from '@/Interface'
import { Loader2Icon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'


export default function Cart() { 

  const {cartData,isLoading,getCart,setCartData}=useContext(CartContext)     
  const [removingId, setRemovingId] = useState<string|null>(null)
  const [updatingId, setUpdatingId] = useState<string|null>(null)


  async function removeCartItem(ProductId:string) {

    setRemovingId(ProductId)
     const token =await getUserToken()
    const response=await fetch('https://ecommerce.routemisr.com/api/v1/cart/'+ProductId,{ 
      method:"DELETE",
      headers:{ 
        token:token+'', 
      }
    }) 
    const data =await response.json(); 
    if (data.status=="success") {
      setCartData(data) 
      setRemovingId(null)
      toast.success('product removed succesfully')
    }
  }
  async function updateCartItem(ProductId:string,count:number) {
     setUpdatingId(ProductId) 
      const token =await getUserToken()
    const response=await fetch('https://ecommerce.routemisr.com/api/v1/cart/'+ProductId,{ 
      method:"PUT",
      body:JSON.stringify({count}),
      headers:{ 
        token:token+'', 

       "Content-Type":"application/json"
      }
    })  
    console.log(response,'update response');
    
    const data =await response.json(); 
    if (data.status=="success") { 
      setCartData(data) 
      console.log(data);
      
      toast.success('product Updated succesfully')
    }
    setUpdatingId(null)
  }
  async function clearCart() {
    
    const token =await getUserToken()
    const response=await fetch('https://ecommerce.routemisr.com/api/v1/cart',{ 
      method:"DELETE",
      headers:{ 
        token:token+'',
        
      }
    }) 
    const data =await response.json(); 
    if (data.message=="success") {
       setCartData(data) 
     
      toast.success('Cart Clear succesfully')
    }
  } 

   


   useEffect(()=>{ 
    if(typeof cartData?.data?.products?.[0]?.product == 'string' || cartData==null){ getCart()}
   },[cartData,getCart])  



  return (
    <>
      <div className="min-h-screen bg-[#FBF9F6] text-slate-900">
        {isLoading ||
        typeof cartData?.data?.products?.[0]?.product === "string" ? (
          <Loading />
        ) : cartData?.numOfCartItems! > 0 ? (
          <div className="container mx-auto px-4 py-8 sm:py-10 lg:py-12">
            {/* ================= HEADER ================= */}
            <div className="mb-8 animate-in fade-in slide-in-from-bottom-3 duration-700">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
                    Your Shopping Cart
                  </div>

                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Shopping Cart
                  </h1>

                  <p className="mt-1.5 text-sm text-stone-500">
                    {cartData?.numOfCartItems}{" "}
                    {cartData?.numOfCartItems === 1 ? "item" : "items"} waiting
                    for you
                  </p>
                </div>

                <div className="hidden rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-sm sm:block">
                  <p className="text-xs text-stone-400">Cart total</p>
                  <p className="mt-0.5 text-lg font-bold text-slate-900">
                    {formatCurrency(cartData?.data?.totalCartPrice!)}
                  </p>
                </div>
              </div>
            </div>

            {/* ================= CONTENT ================= */}
            <div className="grid grid-cols-1 gap-7 lg:grid-cols-3 lg:items-start">
              {/* ================= PRODUCTS ================= */}
              <div className="space-y-4 lg:col-span-2">
                {cartData?.data?.products.map((item, index) => (
                  <div
                    key={item._id}
                    style={{
                      animationDelay: `${index * 80}ms`,
                    }}
                    className="
                  group
                  animate-in
                  fade-in
                  slide-in-from-bottom-4
                  fill-mode-both
                  duration-700

                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-stone-200/80
                  bg-white

                  p-4
                  sm:p-5

                  shadow-[0_4px_20px_rgba(0,0,0,0.03)]

                  transition-all
                  duration-300
                  ease-out

                  hover:-translate-y-1
                  hover:border-amber-200
                  hover:shadow-[0_12px_35px_rgba(0,0,0,0.07)]
                "
                  >
                    {/* subtle hover glow */}
                    <div
                      className=" 
                    pointer-events-none
                    absolute
                    -right-20
                    -top-20
                    h-40
                    w-40
                    rounded-full
                    bg-amber-100/40
                    blur-3xl
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  "
                    />

                    <div className="relative flex gap-4 sm:gap-5">
                      {/* IMAGE */}
                      <Link
                        href={`/products/${item.product._id}`}
                        className="
                      relative
                      flex
                      h-24
                      w-24
                      shrink-0
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-2xl
                      bg-gradient-to-br
                      from-stone-50
                      to-stone-100
                      sm:h-32
                      sm:w-32
                    "
                      >
                        <Image
                          src={item.product.imageCover}
                          alt={item.product.title}
                          width={300}
                          height={300}
                          className="
                        h-full
                        w-full
                        object-contain
                        p-2

                        transition-transform
                        duration-500
                        ease-out

                        group-hover:scale-110
                      "
                        />

                        {/* image shine */}
                        <div
                          className="
                        pointer-events-none
                        absolute
                        inset-0
                        -translate-x-full
                        bg-linear-to-r
                        from-transparent
                        via-white/40
                        to-transparent
                        transition-transform
                        duration-700
                        group-hover:translate-x-full
                      "
                        />
                      </Link>

                      {/* DETAILS */}
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex justify-between gap-3">
                          <div className="min-w-0">
                            <Link
                              href={`/products/${item.product._id}`}
                              className="
                            line-clamp-2
                            text-sm
                            font-semibold
                            leading-snug
                            text-slate-900
                            transition-colors
                            duration-200
                            hover:text-amber-700
                            sm:text-base
                          "
                            >
                              {item.product.title.split(" ", 3).join(" ")}
                            </Link>

                            <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px] text-stone-400">
                              <span className="rounded-md bg-stone-100 px-2 py-1">
                                {item.product.brand.name}
                              </span>

                              <span className="text-stone-300">•</span>

                              <span>{item.product.category.name}</span>
                            </div>
                          </div>

                          {/* PRICE */}
                          <div className="shrink-0 text-right">
                            <p className="text-base font-bold text-slate-900 sm:text-lg">
                              {formatCurrency(item.price * item.count)}
                            </p>

                            {item.count > 1 && (
                              <p className="mt-0.5 text-[10px] text-stone-400">
                                {formatCurrency(item.price)} / item
                              </p>
                            )}
                          </div>
                        </div>

                        {/* CONTROLS */}
                        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
                          {/* QUANTITY */}
                          <div
                            className="
                          flex
                          items-center
                          overflow-hidden
                          rounded-xl
                          border
                          border-stone-200
                          bg-stone-50
                          shadow-sm
                        "
                          >
                            <button
                              onClick={() =>
                                updateCartItem(item.product._id, item.count - 1)
                              }
                              disabled={
                                item.count === 1 ||
                                updatingId === item.product._id
                              }
                              className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            text-lg
                            text-stone-600
                            transition-all
                            duration-200
                            hover:bg-white
                            hover:text-amber-700
                            active:scale-90
                            disabled:cursor-not-allowed
                            disabled:opacity-30 
                            cursor-pointer
                          "
                            >
                              −
                            </button>

                            <div
                              className="
                            flex
                            h-8
                            min-w-9
                            items-center
                            justify-center
                            border-x
                            border-stone-200
                            bg-white
                            px-2
                            text-xs
                            font-bold
                          "
                            >
                              {updatingId === item.product._id ? (
                                <Loader2Icon className="h-3.5 w-3.5 animate-spin text-amber-600" />
                              ) : (
                                item.count
                              )}
                            </div>

                            <button
                              onClick={() =>
                                updateCartItem(item.product._id, item.count + 1)
                              }
                              disabled={updatingId === item.product._id}
                              className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            text-lg
                            text-stone-600
                            transition-all
                            duration-200
                            hover:bg-white
                            hover:text-amber-700
                            active:scale-90
                            disabled:cursor-not-allowed
                            disabled:opacity-30 
                            cursor-pointer
                          "
                            >
                              +
                            </button>
                          </div>

                          {/* REMOVE */}
                          <button
                            onClick={() => removeCartItem(item.product._id)}
                            disabled={removingId === item.product._id}
                            className="
                          group/remove
                          inline-flex
                          items-center
                          gap-1.5
                          rounded-lg
                          px-2.5
                          py-1.5
                          text-sm
                          font-medium
                          text-stone-400
                          transition-all
                          duration-200
                          hover:bg-red-50
                          hover:text-red-500
                          active:scale-95 
                          cursor-pointer
                        "
                          >
                            {removingId === item.product._id ? (
                              <Loader2Icon className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <>
                                <span className="transition-transform duration-200 group-hover/remove:scale-110">
                                  ×
                                </span>
                                Remove
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ================= SUMMARY ================= */}
              <div
                className="
              animate-in
              fade-in
              slide-in-from-right-4
              duration-700
              lg:sticky
              lg:top-6
            "
              >
                <div
                  className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-stone-200
                bg-white
                p-6
                shadow-[0_10px_40px_rgba(0,0,0,0.05)]
              "
                >
                  {/* decorative glow */}
                  <div
                    className="
                  pointer-events-none
                  absolute
                  -right-16
                  -top-16
                  h-36
                  w-36
                  rounded-full
                  bg-amber-100/50
                  blur-3xl
                "
                  />

                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-bold">Order Summary</h2>

                      <span className="rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-semibold text-stone-500">
                        {cartData?.numOfCartItems} ITEMS
                      </span>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-stone-500">Subtotal</span>

                        <span className="text-sm font-semibold">
                          {formatCurrency(cartData?.data?.totalCartPrice!)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-stone-500">Shipping</span>

                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                          FREE
                        </span>
                      </div>
                    </div>

                    <div className="my-6 h-px bg-stone-100" />

                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-stone-400">Total</p>

                        <p className="mt-1 text-2xl font-bold tracking-tight">
                          {formatCurrency(cartData?.data?.totalCartPrice!)}
                        </p>
                      </div>

                      <span className="mb-1 text-xs text-stone-400">EGP</span>
                    </div>

                    <div className="mt-6 space-y-3"> 
                      <Link  href={'/addressform'}>
                      <div
                        className="
                      overflow-hidden
                      rounded-xl
                      transition-transform
                      duration-300
                      hover:-translate-y-0.5
                    "
                      > 
                      <Button variant="default" className=" w-full cursor-pointer p-2">Proceed to checkout</Button>

                        {/* <Checkout cartId={cartData?.cartId!} /> */}
                      </div>
                       </Link>

                      <Link href="/products" className="block">
                        <Button
                          variant="outline"
                          className="
                        h-11
                        w-full
                        rounded-xl
                        border-stone-200
                        bg-stone-50
                        text-sm
                        font-medium
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:border-stone-300
                        hover:bg-white
                        hover:shadow-sm 
                        cursor-pointer
                      "
                        >
                          Continue Shopping
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* CLEAR CART */}
                <button
                  onClick={() => clearCart()}
                  className="
                mt-3
                w-full
                rounded-xl
                border
                border-transparent
                px-4
                py-2.5
                text-sm
                font-medium
                text-stone-400
                transition-all
                duration-300
                hover:border-red-100
                hover:bg-red-50
                hover:text-red-500 
                cursor-pointer
              "
                >
                  Clear all items
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ================= EMPTY CART ================= */
          <div className="flex min-h-[75vh] items-center justify-center px-4">
            <div
              className="
            animate-in
            fade-in
            zoom-in-95
            duration-700
            text-center
          "
            >
              <div
                className="
              relative
              mx-auto
              mb-6
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
              bg-white
              text-4xl
              shadow-[0_10px_40px_rgba(0,0,0,0.07)]
            "
              >
                <span className="animate-bounce">🛒</span>

                <span
                  className="
                absolute
                inset-0
                rounded-full
                border
                border-amber-200
                animate-ping
                opacity-20
              "
                />
              </div>

              <h2 className="text-2xl font-bold tracking-tight">
                Your Cart is Empty
              </h2>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-stone-500">
                Your shopping cart is waiting for something special. Explore our
                collection and find your next favorite item.
              </p>

              <Link href="/products">
                <Button
                  className="
                mt-7
                h-11
                rounded-xl
                px-7
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
              "
                >
                  Explore Products
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}