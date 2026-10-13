import { CategoryI } from "@/Interface";

 export async function getCategory(){ 
 
     const response=await fetch(process.env.NEXT_PUBLIC_AUTH_URL+'/api/get-categories')
    const data=await response.json()  
    
    
    return data
 }