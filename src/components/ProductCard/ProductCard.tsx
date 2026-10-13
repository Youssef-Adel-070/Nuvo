import { productI } from '@/Interface'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import AddToCart from '../AddToCart/AddToCart'
import { Badge } from '../ui/badge'
import HeartIcon from '../HeartIcon/HeartIcon'

export default function ProductCard({product}:{product:productI}) {
  return <> 
  
  <div className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:border-amber-300 hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-300 flex flex-col justify-between max-w-[400px]">
      {/* Product Image Frame */}
      <div className="relative aspect-square w-full bg-[#fbf9f6] p-4 flex items-center justify-center overflow-hidden">
        {/* Deal Badge */}
      

        {/* Wishlist Heart Toggle */}
        <HeartIcon productId={product._id}/>

        {/* Product Media */}
        <Link href={`/products/${product._id}`} className="w-full h-full flex items-center justify-center">
          <Image
            src={product.imageCover}
            alt={product.title} 
            width={400}
            height={400}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="flex items-center justify-between"> 

        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
            {product.category?.name || 'General'}
          </span>
          <Link href={`/products/${product._id}`} className="block">
            <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 hover:text-amber-800 transition leading-snug">
              <i>{product.title.split(" ",3).join(" ")}</i>
            </h3>
          </Link>
        </div> 
        <Badge variant="outline" className='text-amber-800'>{product.brand.name}</Badge>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 text-sm text-stone-500">
          <div className="flex items-center text-amber-500">
            ★ <span className="font-bold ml-1 text-slate-800">{product.ratingsAverage.toFixed(1)}</span>
          </div>
          <span className="text-stone-300">({product.ratingsQuantity})</span>
        </div>

        {/* Price and Add to Cart Action */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-lg font-bold text-slate-900">
              {product.price}  <span className="text-sm font-normal text-slate-600">EGP</span>
            </div>
          
          </div>

          <AddToCart productId={product._id}/>
        </div>
      </div>
    </div>
  
  
  </>
}


    
     