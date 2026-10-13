
import { CategoryI } from '@/Interface';
import { getCategory } from '@/services/categoryService';
import Image from 'next/image';
import Link from 'next/link';
import DynamicCategorySlider from './DynamicCategorySlider';


export default async  function CategorySlider() {  
 


const data = await getCategory()
  return <> 
  
  
  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
        
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-slate-900">
            Explore by Category
          </h2>
        </div>
        <Link
          href="/categories"
          className="text-xs sm:text-sm font-semibold text-amber-800 hover:text-amber-900 flex items-center gap-1.5 transition"
        >
          <span>View All Categories</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Categories Horizontal Carousel */}
      <div className="flex items-center gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth"> 

        <DynamicCategorySlider categories={data}/>
      
      </div>
      
    </section>
  
  
  
  </>
}
