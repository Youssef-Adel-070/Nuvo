"use server"
 
 export async function forgotPassword(email:string){ 
         
    const response= await fetch('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',{ 
        method:"POST",
        body:JSON.stringify({email}),
        headers:{ 
            "Content-Type":"application/json"
        }
    }) 

    const data= await response.json() 
    return data
 }