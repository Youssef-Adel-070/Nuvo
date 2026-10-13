"use client"
import CategoryCard from '@/components/CategoryCard/CategoryCard';
import { CategoryI } from '@/Interface';
import { getCategory } from '@/services/categoryService';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react'

export default  function Categories() {
  const [categories,setCategories]=useState<CategoryI[]>([]) 
  const [isLoading,setIsLoading]=useState<boolean>(false)  
    const [searchQuery, setSearchQuery] = useState('');
  const [selectedSlug, setSelectedSlug] = useState('ALL');
    const [layoutMode, setLayoutMode] = useState<'bento' | 'list'>('bento');


   async  function getCategoryData() {
        setIsLoading(true)
        try {
          const data =await getCategory() 
          if(data){ 
            setCategories(data) 
            setIsLoading(false)
          }
        } catch (error) {
          console.log(error);
          
        }
     }
   
     useEffect(()=>{getCategoryData()},[]) 

      const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        cat.name.toLowerCase().includes(q) ||
        cat.slug.toLowerCase().includes(q);

      const matchesSlug = selectedSlug === 'ALL' || cat.slug === selectedSlug;

      return matchesSearch && matchesSlug;
    });
  }, [categories, searchQuery, selectedSlug]);
  
  return <> 
   <div className="min-h-screen bg-[#FBF9F6] text-slate-900 font-sans">
      {/* Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="flex items-center gap-2 text-xs text-stone-500">
          <Link href="/" className="hover:text-amber-800 transition">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">Categories</span>
        </nav>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Editorial Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200/80 pb-8">
          <div className="space-y-2.5 max-w-2xl">
           
            <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-slate-900">
              Our Categories
            </h1>

            <p className="text-sm sm:text-base text-stone-500 font-light leading-relaxed">
              Explore our product categories and find everything from electronics and
                fashion to home essentials and everyday products.           
                 </p>
          </div>

          {/* Department Count Metric Pill */}
          <div className="flex items-center gap-3.5 bg-white px-5 py-3 rounded-2xl border border-stone-200 shadow-sm text-xs text-stone-600 self-start md:self-auto">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-800 text-lg">
              田
            </div>
            <div>
              <strong className="block text-sm font-bold text-slate-900">
                {categories.length} Categories
              </strong>
              <span>Explore our product range</span>
            </div>
          </div>
        </div>

        {/* Quick Navigation Slugs Bar */}
        <div className="space-y-3">
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar text-xs">
            <button
              onClick={() => setSelectedSlug('ALL')}
              className={`px-4 py-1.5 rounded-full font-medium transition-all ${
                selectedSlug === 'ALL'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-stone-200/60 text-stone-700 hover:bg-stone-200'
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setSelectedSlug(cat.slug)}
                className={`px-3.5 py-1.5 rounded-full font-mono text-[11px] whitespace-nowrap transition-all ${
                  selectedSlug === cat.slug
                    ? 'bg-amber-700 text-white shadow-sm'
                    : 'bg-stone-200/50 text-stone-600 hover:bg-stone-200 hover:text-slate-900'
                }`}
              >
                /{cat.slug}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Layout Toggle Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search categories..."
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
              onClick={() => setLayoutMode('bento')}
              aria-label="Bento Grid Layout"
              className={`px-3 py-2 rounded-xl flex items-center gap-1.5 border transition ${
                layoutMode === 'bento'
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
        ) : filteredCategories.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3">
            <div className="text-3xl">🔍</div>
            <h3 className="font-serif text-lg font-medium text-slate-900">No categories found</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
                        No categories found for "{searchQuery}".
          Try a different search or reset your filters.
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
              layoutMode === 'bento'
                ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'
                : 'space-y-3'
            }
          >
            {filteredCategories.map((cat, index) => (
              <CategoryCard
                key={cat._id}
                category={cat}
                index={index}
                layout={layoutMode}
              />
            ))}
          </div>
        )}

        {/* Directory Callout Banner */}
        <div className="mt-16 bg-white border border-stone-200/80 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
               Explore Our Catalog
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-slate-900 font-normal">
  Looking for something else?            </h2>
            <p className="text-xs sm:text-sm text-stone-500 max-w-lg font-light">
  Browse all available products and use filters to find the right item
  for you.       
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
