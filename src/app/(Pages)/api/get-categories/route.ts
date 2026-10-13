import { CategoryI } from "@/Interface";
import { NextResponse } from "next/server";

 
 export async function GET(){ 
     

     const response=await fetch(process.env.NEXTURL_API+'/categories')
    const {data}:{data:CategoryI[]}=await response.json()  
    console.log(data,"from categoreis"); 

    return NextResponse.json(data)

 }