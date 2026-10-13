
import CategorySlider from "@/components/CategorySlider/CategorySlider";
import Footer from "@/components/Footer/page";
import HeroSection from "@/components/HeroSection/HeroSection";
import ProductCard from "@/components/ProductCard/ProductCard";
import { Button } from "@/components/ui/button";
import { productI } from "@/Interface";
import { getCategory } from "@/services/categoryService";
import { getProducts } from "@/services/productService";
import Image from "next/image";
import Link from "next/link";


 export default async function Home() { 


 const {data:products}:{data:productI[]}=await getProducts({limit:8,sort:"-price"})
  return <> 
  
   <div className="min-h-screen bg-[#FBF9F6] text-slate-900 flex flex-col font-sans">
    <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Explore by Category */}
        {/* <CategoriesRow categories={categories} /> */}
        <CategorySlider />

        {/* 3. Curated Products Preview (NO PAGINATION ON HOME) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
             
              <h2 className="font-serif text-3xl font-normal text-slate-900">
                Trending Essentials
              </h2>
            </div>
           
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((item) => (
              <ProductCard
                key={item._id}
                product={item}
               
              />
            ))}
          </div>

          {/* Dedicated Catalog Callout CTA */}
          <div className="mt-14 p-8 rounded-3xl bg-white border border-stone-200 text-center max-w-2xl mx-auto shadow-sm">
            <span className="px-3 py-1 bg-amber-50 text-amber-800 text-[11px] font-bold rounded-full uppercase tracking-wider border border-amber-200">
            Browse Our Products
            </span>
            <h3 className="font-serif text-2xl text-slate-900 mt-3 font-normal">
            Looking for More?            </h3>
            <p className="text-xs text-stone-500 mt-2 max-w-md mx-auto">
Explore the full product catalog and find more items across different categories.            </p>
            <div className="mt-5">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F172A] hover:bg-slate-800 text-amber-300 font-semibold rounded-xl text-xs transition"
              >
                <span>Explore All Products</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        
       
      </main>

   
    </div>
  
  
  
  </>
}


