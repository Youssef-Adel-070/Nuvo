import { Params } from 'next/dist/server/request/params';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req:NextRequest,{params}:{params:Params}) { 
        const {productId}=await params 

   
       
  
     const response =await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`)
    const data =await response.json()   
    
    return NextResponse.json(data)
}