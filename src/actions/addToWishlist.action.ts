"use server"


import getUserToken from "@/Helper/getUserToken" 

 export async function addToWishlist(productId:string){ 
     
    const token=await getUserToken()
    const response =await fetch('https://ecommerce.routemisr.com/api/v1/wishlist',{ 
        method:"POST",
        body:JSON.stringify({productId}),
        headers:{ 
            token:token+'' ,
            "Content-Type":"application/json"
        }
    }) 

    const data =await response.json() 
     
    if (!response.ok) {
        throw new Error(data?.statusMsg||data?.message)
    } 
    return data
 }