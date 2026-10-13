import { Item } from "./cart"
import { User } from "./review"


export interface OrderI {
  shippingAddress: ShippingAddress
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  _id: string
  user: User
  cartItems: Item[]
  paidAt?: string
  createdAt: string
  updatedAt: string
  id: number
  __v: number
}

export interface ShippingAddress {
  details: string
  city: string
  phone: string
  postalCode?: string
}




