"use client"
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

export default function Footer() { 

  const session=useSession()
  return <> 
  {session.status=='authenticated'&&
   <footer className="mt-16 w-full border-t border-stone-200 bg-[#FBF9F6] pt-14 pb-8">

  {/* Main Footer */}
  <div className="mx-auto mb-12 grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">

    {/* Brand */}
    <div className="lg:pr-8  lg:col-span-2 ">
      <div className="mb-5 flex items-center gap-3">

        <div className="flex size-10 items-center justify-center rounded-xl bg-slate-950 text-lg font-bold text-white shadow-sm transition-all duration-300 hover:-rotate-3 hover:scale-105">
          N
        </div>

        <span className="text-lg font-bold tracking-tight text-slate-900">
          NuvoStore
        </span>
      </div>

      <p className="max-w-sm text-sm leading-6 text-stone-500">
        A simple and modern e-commerce platform powered by Route Misr APIs,
  making it easy to browse products, manage your cart, and place orders
  with a smooth shopping experience.
      </p>

     
    </div>

    {/* Shop */}
    <div>
      <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-slate-900">
        Shop & Catalog
      </h4>

      <ul className="space-y-3">
        <li>
          <Link
            href="/categories"
            className="group flex items-center text-sm text-stone-500 transition-all duration-200 hover:translate-x-1 hover:text-amber-700"
          >
            <span className="mr-2 h-px w-0 bg-amber-500 transition-all duration-200 group-hover:w-3" />
            Official Categories
          </Link>
        </li>

        <li>
          <Link
            href="/brands"
            className="group flex items-center text-sm text-stone-500 transition-all duration-200 hover:translate-x-1 hover:text-amber-700"
          >
            <span className="mr-2 h-px w-0 bg-amber-500 transition-all duration-200 group-hover:w-3" />
            Featured Brands
          </Link>
        </li>

        <li>
          <Link
            href="/products"
            className="group flex items-center text-sm text-stone-500 transition-all duration-200 hover:translate-x-1 hover:text-amber-700"
          >
            <span className="mr-2 h-px w-0 bg-amber-500 transition-all duration-200 group-hover:w-3" />
            Trending Products
          </Link>
        </li>

        <li>
          <Link
            href="/"
            className="group flex items-center text-sm text-stone-500 transition-all duration-200 hover:translate-x-1 hover:text-amber-700"
          >
            <span className="mr-2 h-px w-0 bg-amber-500 transition-all duration-200 group-hover:w-3" />
            Offers & Promo Deals
          </Link>
        </li>
      </ul>
    </div>

    {/* Account */}
    <div>
      <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-slate-900">
        User & Orders
      </h4>

      <ul className="space-y-3">
        <li>
          <Link
            href="/profile"
            className="group flex items-center text-sm text-stone-500 transition-all duration-200 hover:translate-x-1 hover:text-amber-700"
          >
            <span className="mr-2 h-px w-0 bg-amber-500 transition-all duration-200 group-hover:w-3" />
            My Account Profile
          </Link>
        </li>

        <li>
          <Link
            href="/allorders"
            className="group flex items-center text-sm text-stone-500 transition-all duration-200 hover:translate-x-1 hover:text-amber-700"
          >
            <span className="mr-2 h-px w-0 bg-amber-500 transition-all duration-200 group-hover:w-3" />
            Order History & Tracking
          </Link>
        </li>

        <li>
          <Link
            href="/wishlist"
            className="group flex items-center text-sm text-stone-500 transition-all duration-200 hover:translate-x-1 hover:text-amber-700"
          >
            <span className="mr-2 h-px w-0 bg-amber-500 transition-all duration-200 group-hover:w-3" />
            Wishlist Items
          </Link>
        </li>

        <li>
          <Link
            href="/addressform"
            className="group flex items-center text-sm text-stone-500 transition-all duration-200 hover:translate-x-1 hover:text-amber-700"
          >
            <span className="mr-2 h-px w-0 bg-amber-500 transition-all duration-200 group-hover:w-3" />
            Saved Shipping Addresses
          </Link>
        </li>
      </ul>
    </div>

    {/* Customer Care */}
    <div>
      <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-slate-900">
        Customer Care & Trust
      </h4>

      <ul className="space-y-3">
        <li>
          <div
            
            className="group flex items-center text-sm text-stone-500 transition-all duration-200 hover:translate-x-1 hover:text-amber-700"
          >
            <span className="mr-2 h-px w-0 bg-amber-500 transition-all duration-200 group-hover:w-3" />
            Shipping & Delivery Rates
          </div>
        </li>

        <li>
          <div
            
            className="group flex items-center text-sm text-stone-500 transition-all duration-200 hover:translate-x-1 hover:text-amber-700"
          >
            <span className="mr-2 h-px w-0 bg-amber-500 transition-all duration-200 group-hover:w-3" />
            14-Day Free Returns Policy
          </div>
        </li>

        <li>
          <div
           
            className="group flex items-center text-sm text-stone-500 transition-all duration-200 hover:translate-x-1 hover:text-amber-700"
          >
            <span className="mr-2 h-px w-0 bg-amber-500 transition-all duration-200 group-hover:w-3" />
            Terms & Conditions
          </div>
        </li>

        <li>
          <div
           
            className="group flex items-center text-sm text-stone-500 transition-all duration-200 hover:translate-x-1 hover:text-amber-700"
          >
            <span className="mr-2 h-px w-0 bg-amber-500 transition-all duration-200 group-hover:w-3" />
            Privacy & Security Policy
          </div>
        </li>
      </ul>
    </div>
  </div>

  {/* Bottom */}
  <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 border-t border-stone-200 px-4 pt-6 sm:px-6 lg:flex-row lg:px-8">

    <p className="text-center text-xs text-stone-400 lg:text-left">
      © {new Date().getFullYear()} NuvoStore Egypt 
    </p>

    <div className="flex flex-wrap items-center justify-center gap-2">
      <span className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 shadow-sm transition-colors hover:border-amber-200 hover:text-amber-700">
        Visa
      </span>

      <span className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 shadow-sm transition-colors hover:border-amber-200 hover:text-amber-700">
        Mastercard
      </span>

      <span className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 shadow-sm transition-colors hover:border-amber-200 hover:text-amber-700">
        Meeza
      </span>

      <span className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 shadow-sm transition-colors hover:border-amber-200 hover:text-amber-700">
        ValU
      </span>

      <span className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 shadow-sm transition-colors hover:border-amber-200 hover:text-amber-700">
        Cash on Delivery
      </span>
    </div>
  </div>
</footer>
}
  
  
  
  </>
}
