export async function getReview({productId}:{productId:string}){ 
         
    // const params=new URLSearchParams({ 
    //     productDetailsId: productId,
    // })
    
    const response =await fetch(`/api/products/${productId}/review`)
    const data =await response.json()  
    console.log(data,"from reviewsssss ");
    
    return data
}


