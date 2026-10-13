'use client'
import OrdersCard from '@/components/OrderCard/OrderCard';
import { CartContext } from '@/Context/CartContext'
import { OrderI } from '@/Interface';
import React, { useContext, useEffect, useState } from 'react'

export default function AllOrders() { 

const userId=localStorage.getItem('userId')
 console.log(userId); 
 const [ordersData,setOrdersData]=useState<OrderI[]>([])
 
  
  async function getUserOrders() {
       
     
      const response=await fetch('https://ecommerce.routemisr.com/api/v1/orders/user/'+localStorage.getItem('userId'))  
     
      
      const data =await response.json(); 
      setOrdersData(data) 
        console.log(data); 
       
        
    } 
    useEffect(()=>{ 
        getUserOrders()
    },[])
  return (
    <OrdersCard orders={ordersData}/>
  )
}
