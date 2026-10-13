import { productI } from "@/Interface"

 
 export async function getProducts({ limit = 20,page = 1,sort='price',category,brand}: { limit?: number; page?: number;sort?: string,category?:string,brand?:string}) {
    
    const params = new URLSearchParams();

  params.set("page", String(page));
  params.set("limit", String(limit));
  params.set("sort", sort);

  if (category) {
    params.set("category[in]", category);
  }
  if (brand) {
    params.set("brand", brand);
  }
     const response=await fetch(process.env.NEXTURL_API+`/products?${params.toString()}`,{ 
        method:"Get",  
        next:{ 
          revalidate:10
        }
    
      })   
      const data=await response.json() 
      return data
 }