'use client'
import React from 'react' 
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel" 
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image'

export default function ProductSlider({productImgs,title}:{productImgs:string[],title:string}) {
  return <> 
  
  <Carousel
            opts={{
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent>
              {productImgs.map((img, index) => (
                <CarouselItem key={index}>
                  <Image
                    src={img}
                    alt={title}
                    width={400}
                    height={400}
                    className=" w-full  object-cover "
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
  </>
}
