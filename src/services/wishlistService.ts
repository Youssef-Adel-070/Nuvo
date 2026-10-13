export async function getWishlist(){ 
         
    
    
    const response =await fetch(`/api/get-wishlist`)
    const data =await response.json()  
    console.log(data,"from WishList ");
    
    return data
}