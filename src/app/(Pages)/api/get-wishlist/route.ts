import getUserToken from "@/Helper/getUserToken";
import { WishlistI } from "@/Interface";
import { NextResponse } from "next/server";

 


  export async function GET(){ 
      
 
   
 
 
 
  const token =await getUserToken()
     
  const response = await fetch(`${process.env.NEXTURL_API}/wishlist`,{ 
    method:"GET",
    headers:{ 
        token:token+''
    }
  } );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Failed to get wishlist");
  }

  return NextResponse.json(data);
}