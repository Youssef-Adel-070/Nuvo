'use client'
import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { HeartIcon, Loader, Loader2Icon, ShoppingCartIcon, UserStar } from 'lucide-react'
import { CardFooter } from '../ui/card'
import { usePathname, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { CartContext } from '@/Context/CartContext'
import { addToCartAction } from '@/actions/addToCartAction.action'
import { useSession } from 'next-auth/react'

export default function AddToCart({productId}:{productId:string}) { 
 
    const pathName= usePathname() 
    const [isLoadingBtn, setIsloadingBtn] = useState(false) 
     const {cartData,setCartData,getCart}=useContext(CartContext)

     const session=useSession() 
     const router=useRouter()
async function addProductToCart() {  
 
    if(session.status=="authenticated"){
            
        setIsloadingBtn(true)
   
        try { 
        

        const data=await addToCartAction(productId) 
        setCartData(data)
        if (data.status=='success') { 
            toast.success(data.message)
        } 
    
        setIsloadingBtn(false) 
    
        console.log(data);
        
        } catch (error) {
            console.log(error); 
            toast.error(`${error}`)
            
        }
        }else{ 
            router.push('/login')
        }
   
     
   
    
 }


  return <>  


  {/* <CardFooter className={pathName==`/products/${productId}`?"border-none bg-white":''} >
          <Button disabled={isLoadingBtn} onClick={addProductToCart} className={pathName==`/products/${productId}`?"ml-auto md:grow-0 grow cursor-pointer ":"w-full cursor-pointer"}>{isLoadingBtn?<Loader2Icon className='animate-spin'/>:<ShoppingCartIcon/>} Add to Cart</Button> 
        <HeartIcon className="size-7 z-2 absolute top-1 right-2 hover:fill-black hidden  group-hover:block" />
          </CardFooter>  */}

          <Button
          disabled={isLoadingBtn} 
           onClick={addProductToCart}
            aria-label="Add to cart"
            className={`p-1 cursor-pointer rounded-xl flex items-center justify-center transition shadow-sm ${
              isLoadingBtn? 'bg-amber-600 text-white scale-95':
                 'bg-slate-900 hover:bg-amber-600 text-white active:scale-95'
            }`}
          >
            
              {isLoadingBtn?<svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
           :
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>} 

              AddToCart
           
          </Button>
  </>
}
