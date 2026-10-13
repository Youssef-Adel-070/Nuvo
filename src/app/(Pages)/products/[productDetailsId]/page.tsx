import { productI } from '@/Interface';
import { Params } from 'next/dist/server/request/params'
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


import StarIcon from '@/components/StartIcon/StarIcon';
import Image from 'next/image';
import { HeartIcon, ShoppingCartIcon } from 'lucide-react';
import ProductSlider from '@/components/ProductSlider/ProductSlider';
import AddToCart from '@/components/AddToCart/AddToCart';
import ProductReviews from '@/components/ProductReviews/ProductReviews';

export default async function ProductsDeatils({params}:{params:Params}) { 

    const {productDetailsId}=await params 
    console.log(productDetailsId); 


    const response= await fetch('https://ecommerce.routemisr.com/api/v1/products/'+productDetailsId) 
    const {data:product}:{data:productI}=await response.json() 
    console.log(product,"from ProductDetails");
    
  
    
  return (
    <>
      <main className="min-h-screen bg-[#FBF9F6] px-4 py-6 sm:py-8 lg:py-10">
      <div className="mx-auto max-w-7xl">

        {/* ================= PRODUCT DETAILS ================= */}
        <section className="relative overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white shadow-[0_15px_50px_rgba(0,0,0,0.06)]">

          {/* Background Decorations */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-amber-100/60 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-stone-100/70 blur-3xl" />

          <div className="relative grid items-center md:grid-cols-[0.8fr_1.2fr]">

            {/* ================= IMAGE ================= */}
            <div className="flex items-center justify-center p-6 sm:p-8 lg:p-10">

              <div className="relative w-full max-w-[380px]">

                {/* Image background */}
                <div className="absolute inset-4 rounded-[2rem] bg-stone-50" />

                {/* Decorative circle */}
                <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-amber-100/70" />

                {/* Product image */}
                <div className="relative overflow-hidden rounded-[2rem] border border-stone-200/70 bg-white p-4 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl sm:p-6">

                  <ProductSlider
                    productImgs={product.images}
                    title={product.title}
                  />
                  

                </div>

              </div>

            </div>

            {/* ================= PRODUCT INFO ================= */}
            <div className="p-6 sm:p-8 lg:p-12">

              {/* Brand */}
              <div className="mb-4 flex flex-wrap items-center gap-2">

                <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 ring-1 ring-amber-200">
                  {product.brand.name}
                </span>

                <span className="rounded-full bg-stone-100 px-3 py-1.5 text-xs font-medium text-slate-500">
                  {product.category.name}
                </span>

              </div>

              {/* Title */}
              <h1 className="max-w-2xl text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="mt-5 flex flex-wrap items-center gap-3">

                <div className="flex items-center gap-1.5 rounded-xl bg-amber-50 px-3 py-2">

                  <StarIcon />

                  <span className="text-sm font-bold text-slate-800">
                    {product.ratingsAverage}
                  </span>

                </div>

                <span className="text-sm text-slate-400">
                  {product.ratingsQuantity} reviews
                </span>

              </div>

              {/* Divider */}
              <div className="my-6 h-px bg-stone-200" />

              {/* Description */}
              <div>
                <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-900">
                  Product Description
                </h2>

                <p className="max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="mt-7">

                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                  Price
                </p>

                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold tracking-tight text-slate-900">
                    EGP {product.price}
                  </span>
                </div>

              </div>

              {/* Add To Cart */}
              <div className="mt-7 transition-transform duration-300 hover:-translate-y-0.5">
                <AddToCart productId={`${productDetailsId}`} />
              </div>

              {/* Product Information */}
              <div className="mt-8 grid grid-cols-3 gap-3">

                {/* Category */}
                <div className="rounded-2xl border border-stone-200 bg-stone-50/60 p-3 sm:p-4   hover:border-amber-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

                  <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                    Category
                  </p>

                  <p className="mt-1 truncate text-sm font-semibold text-slate-800">
                    {product.category.name}
                  </p>

                </div>

                {/* Brand */}
                <div className="rounded-2xl border border-stone-200 bg-stone-50/60 p-3 sm:p-4  hover:border-amber-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

                  <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                    Brand
                  </p>

                  <p className="mt-1 truncate text-sm font-semibold text-slate-800">
                    {product.brand.name}
                  </p>

                </div>

                {/* Rating */}
                <div className="rounded-2xl border border-stone-200 bg-stone-50/60 p-3 sm:p-4 hover:border-amber-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

                  <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                    Rating
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {product.ratingsAverage}/5
                  </p>

                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ================= REVIEWS ================= */}
        <ProductReviews
          productId={`${productDetailsId}`}
          rating={product.ratingsAverage}
          reviewsCount={product.ratingsQuantity}
        />

      </div>
    </main>
    </>
  );
}
