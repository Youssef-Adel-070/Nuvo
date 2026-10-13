import { CategoryI } from "@/Interface";

 export async function getBrand(currentPage:number=1){ 
 
     const response=await fetch(process.env.NEXT_PUBLIC_AUTH_URL+`/api/get-brands?page=${currentPage}`)
    const data=await response.json()  
    
    
    return data
 }