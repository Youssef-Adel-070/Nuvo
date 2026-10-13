import { productI } from "./product"

export interface AddWishlistI {
  status: string
  message: string
  data: string[] 
 

}
export interface WishlistI {
  status: string
  count:number
  data:productI[]
}