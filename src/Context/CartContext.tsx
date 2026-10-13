'use client'
import { CartResponse } from "@/Interface";
import { useSession } from "next-auth/react";
import { createContext, useCallback, useEffect, useState } from "react";

  type cart =CartResponse|null
 export const CartContext=createContext<{ 
    cartData:cart,
    setCartData:(value:cart)=> void,
    isLoading:boolean,
    setIsLoading:(value:boolean)=> void,
    getCart:()=> void,
    
 }
 >({ 
    cartData:null,
    setCartData:()=>{},
    isLoading:false,
    setIsLoading:()=>{}, 
    getCart:()=>{},
    
 }) 

 export default function CartContextProvider({children}:{children:React.ReactNode}){ 
     const [cartData, setCartData] = useState<CartResponse|null>(null)
     const [isLoading, setIsLoading] = useState<boolean>(false)
     const [userId, setUserId] = useState<string>('')
 

const getCart=useCallback(async ()=>{
       
    setIsLoading(true)
    try { 
        const response= await fetch('/api/get-cart') 

    const data:CartResponse=await response.json()   
   setCartData(data)   
   const userId = data?.data?.cartOwner;
   if(userId){ 
      
    localStorage.setItem('userId',userId)
    localStorage.setItem('personId',userId)
   }
   console.log(data,"from cartContext"); 
  

    } catch (error) {
        console.log(error); 
   } finally {
      setIsLoading(false)
   }
},[])
     
   
    
 const sesssion =useSession()
 useEffect(()=>{ 
   if (sesssion.status=='authenticated') {
      
      getCart()
   }
 },[getCart,sesssion.status])

    return <CartContext.Provider value={{cartData,setCartData ,isLoading,setIsLoading,getCart}}> 
    {children}
    </CartContext.Provider>
 }