"use client"
import { addToWishlist } from '@/actions/addToWishlist.action'
import { AddWishlistI } from '@/Interface'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

export default function HeartIcon({productId}:{productId:string}) { 
 

    const [ischecked, setISChecked]=useState(false)  
    const pathname=usePathname()
    
    const session =useSession()
 
    
    async function goToWishlist(){  
        if (session.status=="authenticated") {
        
         try {
             
             const data:AddWishlistI= await addToWishlist(productId) 
             if (data.status=="success") {
                 toast.success(data.message) 
                 console.log(data.data[0],"wishlist Id");
                 
                 setISChecked(true)
             }
         }catch(error){
             console.log(error ,"from WishList"); 
     
             toast.error("Failed Added to Your Wishlist")
             
         }finally{ 
            
         }
         
        }
         }
  return <> 
  {pathname=='/wishlist'?'':
  <button
          onClick={()=>goToWishlist()}
          aria-label="Save to Wishlist"
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-stone-200 flex items-center justify-center text-slate-400 hover:text-amber-500 hover:fill-amber-500 cursor-pointer hover:bg-white shadow-sm transition active:scale-90 
              ${ ischecked
      ? "bg-amber-500 text-white border-amber-500"
      : "bg-white/90 text-slate-400 border-stone-200 hover:text-amber-500 hover:bg-white"} `}
        >
          <svg
            className={`w-4 h-4 transition-colors  ${ ischecked? "fill-amber-500" : "fill-none"}`}
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
}
  </>
}
