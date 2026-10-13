'use server'
import getUserToken from "@/Helper/getUserToken";
import { NextResponse } from "next/server";

 
 export async function addReview({productId}:{productId:string},review:string,rating:number){ 

    const token=await  getUserToken(); 
    const response =await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`,{ 
        method:"POST",
        body:JSON.stringify({review,rating}),
        headers:{ 
            token:token +'',
            "Content-Type":"application/json"
        }
    }) 
    const data =await response.json() 
    if (!response.ok) {
    throw new Error(
      data?.errors?.msg || data?.message || "Failed to add review"
    );
  }

    return data
 }