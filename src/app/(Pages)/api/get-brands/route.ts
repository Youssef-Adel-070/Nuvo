import { CategoryI } from "@/Interface";
import { SearchParams } from "next/dist/server/request/search-params";
import { NextRequest, NextResponse } from "next/server";

 
 export async function GET(req:NextRequest){ 
     
 const page= req.nextUrl.searchParams.get('page') 
  console.log(page  ,"44444444444");
  

 
     const response=await fetch(process.env.NEXTURL_API+`/brands?page=${page}`)
    const data=await response.json()   

    console.log(data,"from brands"); 

    return NextResponse.json(data)

 }