"use client"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel" 
import Autoplay from "embla-carousel-autoplay"
import { CategoryI } from '@/Interface'
import Image from 'next/image'

export default function DynamicCategorySlider({categories}:{categories:CategoryI[]}) {
  return <> 
  
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
>
  <CarouselContent className="items-center gap-2">
    {categories.map((cat) => (
      <CarouselItem
        key={cat._id}
        className="
          basis-1/2
          sm:basis-1/3
          md:basis-1/4
          lg:basis-1/5 
          p-2 
          cursor-pointer
        "
      >
        <div className="flex flex-col items-center gap-2  rounded-xl border border-stone-200 shadow-lg hover:border-amber-400 hover:scale-105 bg-white">
          <Image
            src={cat.image}
            alt={cat.name}
            width={100}
            height={50}
            className="w-full max-h-40 rounded-t-xl"
          />

          <p>{cat.name}</p>
        </div>
      </CarouselItem>
    ))}
  </CarouselContent>
</Carousel>
  
  </>
}
