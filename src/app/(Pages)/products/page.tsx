import { MetaDataI, productI } from '@/Interface';
import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import { HeartIcon, ShoppingCartIcon } from 'lucide-react';
import StarIcon from '@/components/StartIcon/StarIcon';
import Link from 'next/link';
import AddToCart from '@/components/AddToCart/AddToCart';
import { getProducts } from '@/services/productService';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Params } from 'next/dist/server/request/params';
 
type searchparam={page?:string, "category[in]"?: string,brand:string}
export default async function Products( {searchParams}:{searchParams:Promise<searchparam>}) { 

const params=await searchParams 
console.log(params); 
const page = Number(params.page)||1 
const category=params['category[in]']
const brand=params.brand


// const response=await fetch('https://ecommerce.routemisr.com/api/v1/products',{ 
  //   method:"Get", 
  //   next:{ 
    //     revalidate:10
    //   }
    
    // })   
    // const {data:products}:{data:productI[]}=await response.json()
    
    const {data:products,metadata}:{data:productI[],metadata:MetaDataI}=await getProducts({limit:25,page:page,category:category,brand:brand})
   
    const hasPrevious=page>1
    const hasNext=page< metadata.numberOfPages

  return <>
  
   {/* Breadcrumb Bar */}
      <div className="max-w-7xl  px-4 sm:px-6 lg:px-8 pt-4">
        <nav className="flex items-center gap-2 text-sm text-stone-500">
          <Link href="/" className="hover:text-amber-800 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">Products</span>
        </nav>
      </div> 


<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 container mx-auto'>  
{products.length === 0 ? (
  <div className="col-span-full flex min-h-[420px] items-center justify-center">
    <div className="group text-center">

      {/* Animated Icon */}
      <div className="relative mx-auto mb-6 h-24 w-24">
        <div className="absolute inset-0 rounded-full bg-amber-100 animate-ping opacity-20" />

        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-amber-200 bg-gradient-to-br from-amber-50 to-white shadow-sm transition duration-500 group-hover:scale-110 group-hover:rotate-3">
          <span className="text-4xl transition duration-500 group-hover:-translate-y-1">
            🛍️
          </span>
        </div>
      </div>

      {/* Text */}
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
        Nothing here yet
      </h2>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-stone-500">
        This category is waiting for its first products.
        Check back soon for something new.
      </p>

      {/* Decorative line */}
      <div className="mx-auto mt-6 flex items-center justify-center gap-2">
        <span className="h-px w-8 bg-stone-200" />
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
        <span className="h-px w-8 bg-stone-200" />
      </div>

    </div>
  </div>
) : (
   products.map((product)=><div key={product._id} className=' p-4'> 
  
  
    <ProductCard product={product}/>
  
  
 </div>))
 }
</div> 


    {/* Pagination */}
      <div className="flex justify-center items-center gap-2 my-8">

        {/* Previous */}
        {hasPrevious && (
          <Link
            href={`/products?page=${page - 1}`}
            className="px-4 py-2 border rounded"
          >
            Previous
          </Link>
        )}

        {/* Pages */}
        {Array.from(
          { length: metadata.numberOfPages },
          (_, index) => index + 1
        ).map((pageNum) => (
          <Link
            key={pageNum}
            href={`/products?page=${pageNum}`}
            className={`px-4 py-2 border rounded ${
              pageNum === page
                ? "bg-amber-500 text-white shadow-sm"
                : "bg-white text-slate-700 border border-stone-200 hover:bg-stone-100"
            }`}
          >
            {pageNum}
          </Link>
        ))}

        {/* Next */}
        {hasNext && (
          <Link
            href={`/products?page=${page + 1}`}
            className="px-4 py-2 border rounded"
          >
            Next
          </Link>
        )}

      </div>



  
  </>
}
 

//  <Card className="relative mx-auto w-full max-w-sm pt-0  group">
//   <Link href={`/products/${product.id}`}> 
      
//       <Image
//         src={product.imageCover}
//         alt={product.title} 
//         width={400} 
//         height={400}
//         className=" w-full o  object-cover "
//       />
//       <CardHeader>
//         <CardAction>
//           <Badge variant="secondary">{product.brand.name}</Badge>
//         </CardAction>
//         <CardTitle>{product.title.split(" ",3).join(" ")}</CardTitle>
//         <CardDescription>
//           {product.category.name}
//         </CardDescription>
//       </CardHeader> 
//       <CardContent> 
         
//          <div className="flex items-center justify-between"> 
//           <div className="flex items-center "> 
//             <StarIcon/>
//           <StarIcon/> 
//           <p className='text-lg ml-1.5'>{product.ratingsAverage}</p>
//           </div> 

//           <p className='text-xl'> <span>$</span>{product.price}</p>

//          </div>

//       </CardContent>
//   </Link> 
      
//         <AddToCart productId={product._id}/>
      
//     </Card>