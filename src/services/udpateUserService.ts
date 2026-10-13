'use server'
import getUserToken from "@/Helper/getUserToken"

 
 export async function updateUserInfo(name:string,email:string,phone:string){ 
     const token=await getUserToken()
    const response =await fetch('https://ecommerce.routemisr.com/api/v1/users/updateMe/',{ 
        method:"PUT",
        body:JSON.stringify({name,email,phone}),
        headers:{ 
            token:token+'',
            "Content-Type":"application/json"
        }
    }) 

    const data=await response.json() 

   
    return data 
    
 }
 export async function updateUserPassword(currentPassword:string,password:string,rePassword:string){ 
     const token=await getUserToken()
    const response =await fetch('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword',{ 
        method:"PUT",
        body:JSON.stringify({currentPassword,password,rePassword}),
        headers:{ 
            token:token+'',
            "Content-Type":"application/json"
        }
    }) 

    const data=await response.json()  
    console.log(data,'from service');
    

   
    return data 
    
 }