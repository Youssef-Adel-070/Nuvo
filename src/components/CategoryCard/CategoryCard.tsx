import { CategoryI } from '@/Interface'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
type layout='bento'|"list"
export default function CategoryCard({category,index,layout='bento'}:{category:CategoryI,index:number,layout?:layout}) {
    
     const padIndex = String(index + 1).padStart(2, '0');
   const editionYear=new Date(category.createdAt!).getFullYear()||2023
   
    if (layout === 'list') {
    return (
      <Link
        href={`/products?category[in]=${category._id}`}
        className="group bg-white rounded-2xl border border-stone-200/90 p-4 sm:p-5 flex items-center justify-between gap-4 hover:border-amber-400 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
      >
        <div className="flex items-center gap-4 sm:gap-6">
          <span className="font-mono text-xs sm:text-sm text-stone-400 font-semibold group-hover:text-amber-800 transition">
            {padIndex}
          </span>
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-stone-100 shrink-0">
            <Image
              src={category.image}
              alt={category.name} 
              width={200}
              height={200}
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
              loading="lazy"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200/60">
                /{category.slug}
              </span>
              <span className="text-[10px] text-stone-400 hidden sm:inline">
                Catalog {editionYear}
              </span>
            </div>
            <h3 className="font-serif text-lg sm:text-xl text-slate-900 font-medium group-hover:text-amber-800 transition">
              {category.name}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 group-hover:text-amber-800 transition">
          <span className="hidden sm:inline">Explore</span>
          <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 text-sm sm:text-base">
            →
          </span>
        </div>
      </Link>
    );
  }

  
  
  
  
  // Default: Bento Grid Card
  return (
    <Link
      href={`/products?category[in]=${category._id}`}
      className="group relative bg-white rounded-2xl border border-stone-200/90 p-3.5 sm:p-4 flex flex-col justify-between hover:border-amber-400 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
    >
      {/* Header Numerals & Slug Badge */}
      <div className="flex items-center justify-between mb-3 text-[11px]">
        <span className="font-mono text-stone-400 font-semibold group-hover:text-amber-800 transition">
          {padIndex}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200/60">
          /{category.slug}
        </span>
      </div>

      {/* Aspect Image Frame with Lens Zoom */}
      <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-stone-50 mb-3.5">
        <Image
          src={category.image}
          alt={category.name} 
             width={200}
              height={200}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-colors" />
      </div>

      {/* Title & Metadata */}
      <div className="space-y-1 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] text-stone-400 uppercase tracking-widest font-semibold block">
            Catalog {editionYear} • Spring Edition
          </span>
          <h3 className="font-serif text-base sm:text-lg text-slate-900 font-medium group-hover:text-amber-800 transition leading-snug">
            {category.name}
          </h3>
        </div>

        {/* Animated Arrow Prompt */}
        <div className="pt-3.5 mt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 group-hover:text-amber-800 transition">
          <span className="text-[11px] font-medium">Explore Department</span>
          <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">
            →
          </span>
        </div>
      </div>
    </Link>
  );
};
