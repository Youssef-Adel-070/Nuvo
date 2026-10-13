export async function getWishlist(){ 
         
    
    
    const response =await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/get-wishlist`)
    const data =await response.json()  
    console.log(data,"from WishList ");
    
    return data
}