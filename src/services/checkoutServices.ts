
import getUserToken from '@/Helper/getUserToken'
import toast from 'react-hot-toast'






  type address={  
         _id?:string,
        details:string,
        phone:string,
        city:string,
        postalCode?:string,
      }
     
 
 export async function checkoutSession(shippingAddress:address,{cartId}:{cartId:string}) {
    
      // const shippingAddress={ 
      //   details:detailsInput.current?.value,
      //   phone:phoneInput.current?.value,
      //   city:cityInput.current?.value
      // }
      const response=await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{ 
        method:"POST",
        body:JSON.stringify({shippingAddress}),
        headers:{ 
          token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhYTE4NGZjZmMzM2Q4MDAxMjRlZmFmZiIsIm5hbWUiOiJ5b3BlIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3ODk0NzIxMDEsImV4cCI6MTc5NzI0ODEwMX0.HqeX7GqZEOMrDbnn9KKX6yIc-_pFloeUBOIZcMo8WkI", 
          "Content-Type":"application/json"
        }
      })  
      
      
      const data =await response.json(); 
        console.log(data); 
        if (data.status=="success") {
           
          location.href=data?.session.url
        }
        
    } 

    
   export async function CashSession(shippingAddress:address,{cartId}:{cartId:string}){  
      const token=await getUserToken()
    //   const shippingAddress={ 
        
    // details:detailsInput.current?.value ,
    // phone: phoneInput.current?.value,
    // city: cityInput.current?.value,
    // postalCode: postalCodeInput.current?.value
  
    //   }
       
      const response=await fetch(`https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,{ 
        method:"POST", 
        body:JSON.stringify({shippingAddress}), 
        headers: {
           token:token+"",
           "Content-Type":"application/json"
        }
      }) 


      const data =await response.json() 

      console.log(data); 
      if(data.status=="success"){  
        toast.success(data.message)
        // router.push('/allorders')
        // setCartData(null)  

      }
      
    }