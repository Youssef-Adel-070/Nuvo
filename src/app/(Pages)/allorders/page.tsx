'use client'
import Loading from '@/app/loading';
import OrdersCard from '@/components/OrderCard/OrderCard';
import { CartContext } from '@/Context/CartContext'
import { OrderI } from '@/Interface';
import React, { useContext, useEffect, useState } from 'react'

export default function AllOrders() { 


 const [ordersData,setOrdersData]=useState<OrderI[]>([])
   const[isLoading,setIsLoading]=useState<boolean>(false)

 
  
  async function getUserOrders() { 
      setIsLoading(true)
      const userId=await localStorage.getItem('userId')
      console.log(userId); 
      try {
           const response=await fetch('https://ecommerce.routemisr.com/api/v1/orders/user/'+localStorage.getItem('userId'))  
     
      
      const data =await response.json(); 
      setOrdersData(data) 
        console.log(data); 
      } catch (error) {
        throw new Error('Failed to fetch user orders: ' + error);
      }finally{ 
        setIsLoading(false)
      }
     
   
       
        
    } 
    useEffect(()=>{ 
        getUserOrders()
    },[])
  
    return<> 
     
      {isLoading?<Loading/>:<OrdersCard orders={ordersData}/> }
    
    
    </>
}
