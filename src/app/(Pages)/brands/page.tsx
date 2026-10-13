'use client'
import BrandCard from '@/components/BrandCard/BrandCard'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { CategoryI, MetaDataI } from '@/Interface'
import { getBrand } from '@/services/brandService'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'

export default function Brands() { 

  const[brands,setBrands]=useState<CategoryI[]>([])
  const[isLoading,setisLoading]=useState(false)
  const [searchQuery,setSearchQuery]=useState('')
  const [currentPage,setCurrentPage]=useState<number>(1) 
  const [metadata, setMetadata] = useState<MetaDataI>()
  const [selectedSlug,setSelectedSlug]=useState('ALL')  
    const [selectedLetter, setSelectedLetter] = useState('ALL');

  const [layoutMode,setLayoutMode]=useState<"grid"|"list">('grid')  

   async function getBrandData(){ 
      setisLoading(true) 
      try {
        
        const {data,metadata}:{data:CategoryI[],metadata:MetaDataI} =await getBrand(currentPage)   
        

        setMetadata(metadata)
        
        if (data) {
          setBrands(data) 
          console.log(data,"BEROoooo set daat");
          
          setisLoading(false)
        }
      } catch (error) {
        console.log(error,"there is errorrrr");
        
      }

    }
     

    const filteredBrands=useMemo(()=>{ 
    return brands.filter((brand)=>{ 
      const q=searchQuery.toLowerCase().trim()
      const matchQurey= q ===''|| brand.name.includes(q)||brand.slug.includes(q) 
      const matchSelectedLetter= selectedLetter==="ALL"||brand.name.toUpperCase().startsWith(selectedLetter)
      const matchSelectedSlug= selectedSlug==="ALL"||brand.slug===selectedSlug 
      return matchQurey && matchSelectedSlug
    })
  },[brands,searchQuery,selectedSlug,selectedLetter])

  useEffect(()=>{getBrandData()
     
  },[currentPage]) 
  return <> 
  
   <div className="min-h-screen bg-[#FBF9F6] text-slate-900 font-sans">
      {/* Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="flex items-center gap-2 text-xs text-stone-500">
          <Link href="/" className="hover:text-amber-800 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">brands</span>
        </nav>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Editorial Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200/80 pb-8">
          <div className="space-y-2.5 max-w-2xl">
            

           <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-slate-900">
  Our Brands
</h1>

         <p className="text-sm sm:text-base text-stone-500 font-light leading-relaxed">
  Explore the brands available in our catalog and discover products across
  different categories.
</p>
          </div>

          {/* Department Count Metric Pill */}
          <div className="flex items-center gap-3.5 bg-white px-5 py-3 rounded-2xl border border-stone-200 shadow-sm text-xs text-stone-600 self-start md:self-auto">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-800 text-lg">
              田
            </div>
            <div>
              <strong className="block text-sm font-bold text-slate-900">
                  {brands.length} Brands
              </strong>
              <span>Available in our catalog</span>
            </div>
          </div>
        </div>

        {/* Quick Navigation Slugs Bar */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
         <span className="font-semibold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
  Browse Brands
</span>

<span className="text-stone-400 text-[11px]">
  Select a brand to filter
</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar text-xs"> 
         <Carousel
  opts={{
    loop: true,
    align: "start",
  }}
  plugins={[
    Autoplay({
      delay: 2000,
    }),
  ]}
  className="w-full"
>
  <CarouselContent className="items-center gap-3 py-2">

    {/* ALL */}
    <CarouselItem className="basis-auto shrink-0">
      <button
        onClick={() => setSelectedSlug("ALL")}
        className={`
          group relative
          px-4 py-2
          rounded-full
          font-medium
          whitespace-nowrap
          border
          transition-all duration-300 ease-out
          hover:-translate-y-0.5
          hover:shadow-md
          active:scale-95
          ${
            selectedSlug === "ALL"
              ? "bg-slate-900 text-white border-slate-900 shadow-md"
              : "bg-white text-stone-700 border-stone-200 hover:border-slate-400 hover:text-slate-900"
          }
        `}
      >
        All
      </button>
    </CarouselItem>

    {/* BRANDS */}
    {brands.map((brand) => (
      <CarouselItem
        key={brand._id}
        className="basis-auto shrink-0"
      >
        <button
          onClick={() => setSelectedSlug(brand.slug)}
          className={`
            group relative
            px-3.5 py-2
            rounded-full
            font-mono text-[11px]
            whitespace-nowrap
            border
            transition-all duration-300 ease-out
            hover:-translate-y-0.5
            hover:shadow-md
            active:scale-95
            ${
              selectedSlug === brand.slug
                ? "bg-amber-700 text-white border-amber-700 shadow-md"
                : "bg-white text-stone-600 border-stone-200 hover:border-amber-400 hover:text-amber-700 hover:bg-amber-50"
            }
          `}
        >
          /{brand.slug}
        </button>
      </CarouselItem>
    ))}

  </CarouselContent>
</Carousel>
            
          
          </div>
        </div>

        {/* Search & Layout Toggle Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search brands..."
              className="w-full bg-white border border-stone-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-800 placeholder-stone-400 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/15 transition shadow-sm"
            />
            <svg
              className="w-4 h-4 text-stone-400 absolute left-4 top-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Layout Mode Switcher */}
          <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-stone-600">
            <span className="uppercase tracking-wider font-semibold text-[10px] text-stone-400 mr-1">
              Layout
            </span>
            <button
              onClick={() => setLayoutMode('grid')}
              aria-label="Bento Grid Layout"
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 border transition ${
                layoutMode === 'grid'
                  ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                  : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <span>▦ Bento</span>
            </button>
            <button
              onClick={() => setLayoutMode('list')}
              aria-label="List View Layout"
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 border transition ${
                layoutMode === 'list'
                  ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                  : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              <span>☰ List</span>
            </button>
          </div>
        </div>

        {/* Categories Render Area */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-stone-200 p-4 animate-pulse space-y-4"
              >
                <div className="flex justify-between">
                  <div className="w-6 h-3 bg-stone-200 rounded" />
                  <div className="w-16 h-3 bg-stone-200 rounded" />
                </div>
                <div className="aspect-[4/3] bg-stone-200 rounded-xl" />
                <div className="w-3/4 h-4 bg-stone-200 rounded" />
                <div className="w-1/2 h-3 bg-stone-200 rounded" />
              </div>
            ))}
          </div>
        ) : filteredBrands.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3">
            <div className="text-3xl">🔍</div>
            <h3 className="font-serif text-lg font-medium text-slate-900">
  No brands found
</h3>

<p className="text-xs text-stone-500 max-w-sm mx-auto">
  No brands match your search "{searchQuery}". Try a different search or
  reset your filters.
</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSlug('ALL');
              }}
              className="px-4 py-2 bg-amber-700 text-white rounded-xl text-xs font-semibold hover:bg-amber-800 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            className={
              layoutMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'
                : 'space-y-3'
            }
          >
            {filteredBrands.map((brand, index) => (
              <BrandCard
                key={brand._id}
                brand={brand}
                index={index}
                layout={layoutMode}
              />
            ))}
          </div>
        )}

        <div className="flex items-center justify-center gap-2 mt-10">

  {/* Previous */}
  <button
    onClick={() =>{if (currentPage>1) {
       setCurrentPage(currentPage - 1)
    }}}
    disabled={currentPage === 1}
    className="px-4 py-2 rounded-lg border border-stone-200 bg-white cursor-pointer
               text-slate-700 transition
               hover:bg-stone-100
               disabled:opacity-40 disabled:cursor-not-allowed"
  >
    Previous
  </button>

  {/* Pages */}
  <div className="flex items-center gap-1">
    {Array.from(
      {length:metadata?.numberOfPages||0},
      (_, index) => index + 1
    ).map((page) => (
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        className={`w-10 h-10 rounded-lg font-medium transition cursor-pointer
          ${
            currentPage === page
              ? "bg-amber-500 text-white shadow-sm"
              : "bg-white text-slate-700 border border-stone-200 hover:bg-stone-100"
          }
        `}
      >
        {page}
      </button>
    ))}
  </div>

  {/* Next */}
  <button
    onClick={() => {if (currentPage<metadata?.numberOfPages!) {
       setCurrentPage(currentPage + 1)
    }}}
    disabled={currentPage === metadata?.numberOfPages}
    className="px-4 py-2 rounded-lg border border-stone-200 bg-white cursor-pointer
               text-slate-700 transition
               hover:bg-stone-100
               disabled:opacity-40 disabled:cursor-not-allowed"
  >
    Next
  </button>

</div>
        {/* Directory Callout Banner */}
        <div className="mt-16 bg-white border border-stone-200/80 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1.5 text-center sm:text-left">
           <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
  Explore Our Catalog
</span>

<h2 className="font-serif text-2xl sm:text-3xl text-slate-900 font-normal">
  Looking for a specific product?
</h2>

<p className="text-xs sm:text-sm text-stone-500 max-w-lg font-light">
  Browse all available products and use categories, brands, and filters
  to find what you need.
</p>
          </div>
          <Link
            href="/products"
            className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs tracking-wide transition shadow-sm whitespace-nowrap"
          >
            Explore All Products →
          </Link>
        </div>

     
      </main>
    </div>
  
  
  </>
}
