'use client'
import React from 'react'
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import CartContextProvider from "@/Context/CartContext";
import { SessionProvider } from "next-auth/react";
import Footer from '../Footer/page';
export default function ProviderSession({children}:{children:React.ReactNode}) {
  return <> 
    <SessionProvider> 
          <CartContextProvider> 
        <Navbar/> 
        <div className=" "> 
        <Toaster 
        
          position="top-center"
          
          /> 

        {children} 
        </div> 
        <Footer/>
        </CartContextProvider>
          </SessionProvider>
  
  
  </>
}