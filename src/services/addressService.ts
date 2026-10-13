
import getUserToken from "@/Helper/getUserToken"
import toast from "react-hot-toast"

  
  type Address={
    name:string,
   details:string,
   phone:string,
   city:string
  }
 export async function addAddress(address:Address){  
    const token=await getUserToken()
 
    const response =await fetch('https://ecommerce.routemisr.com/api/v1/addresses',{ 
        method:"POST",
        body:JSON.stringify(address),
        headers:{ 
            token:token+"",
            "Content-Type":"application/json"
        }
    }) 

    const data=await response.json()   
         
    if(data.status=='success'){ 
        toast.success(data.message)
        return data.data
    }

    console.log(data);  

    
    

   
 }
 export async function getAddress(){  
    const token=await getUserToken()
 
    const response =await fetch('https://ecommerce.routemisr.com/api/v1/addresses',{ 
        method:"GET",
        headers:{ 
            token:token+"",
           
        }
    }) 

    const data=await response.json()  
    console.log(data,"from get Address"); 
     if(data.status=='success'){ 
       
        return data.data
    }
    

   
 }
 export async function removeAddressdata(id:string){  
    const token=await getUserToken()
 
    const response =await fetch('https://ecommerce.routemisr.com/api/v1/addresses/'+id,{ 
        method:"DELETE",
        headers:{ 
            token:token+"",
           
        }
    }) 

    const data=await response.json()  
    console.log(data,"from remove Address");  
    
     if(data.status=='success'){ 
        
        toast.success(data.message)
        return data.data
    }
    

   
 }
