"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Heart,
  MapPin,
  Package,
  Settings2,
  ShoppingBag,
  LogOut,
  Sparkles,
  UserRound,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const items = [
  {
    title: "Orders",
    subtitle: "Track and manage your purchases",
    icon: Package,
    href: "/allorders",
  },
  {
    title: "Wishlist",
    subtitle: "Products you saved for later",
    icon: Heart,
    href: "/wishlist",
  },
  {
    title: "Addresses",
    subtitle: "Manage your delivery locations",
    icon: MapPin,
    href: "/addressform",
  },
  {
    title: "Settings",
    subtitle: "Account and personal preferences",
    icon: Settings2,
    href: "/usersetting",
  },
];

export default function ProfilePage() { 

  const {data}= useSession() 
  console.log(data,"from UserProfile");
  
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FBF9F6] px-4 py-8 text-slate-900 sm:px-6 lg:px-10">

      {/* Background */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-amber-200/25 blur-[120px]" />

        <div className="absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-stone-200/40 blur-[120px]" />

        <div className="absolute left-[18%] top-[22%] h-1.5 w-1.5 rounded-full bg-amber-400/60" />

        <div className="absolute right-[22%] top-[48%] h-2 w-2 rounded-full bg-stone-300" />

      </div>

      <div className="relative mx-auto max-w-6xl">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <motion.header
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >

         

          {/* Main identity */}

          <div className="relative overflow-hidden rounded-[2.5rem] border border-stone-200/80 bg-white shadow-[0_20px_70px_rgba(0,0,0,0.05)]">

            {/* decorative amber shape */}

            <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-amber-100/70 blur-3xl" />

            <div className="absolute -bottom-32 left-[40%] h-64 w-64 rounded-full bg-stone-100/70 blur-3xl" />

            <div className="relative flex flex-col justify-between gap-8 p-7 sm:p-10 lg:flex-row lg:items-end">

              {/* User */}

              <div className="flex items-center gap-5 sm:gap-6">

                {/* Avatar */}

                <div className="relative shrink-0">

                  <div className="flex h-20 w-20 items-center justify-center rounded-[1.7rem] bg-slate-900 text-xl font-bold text-white shadow-xl sm:h-24 sm:w-24 sm:text-2xl">
                    {data?.user.name.toUpperCase().split('',2).join('')}
                  </div>

                  <span className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full border-4 border-white bg-emerald-400" />

                </div>

                {/* Info */}

                <div>

                  <div className="mb-2 flex items-center gap-2">

                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-600">
                      Profile
                    </span>

                    <span className="h-1 w-1 rounded-full bg-stone-300" />

                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                      {data?.user.role}
                    </span>

                  </div>

                  <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                    {data?.user.name}
                  </h1>

                  <p className="mt-2 text-sm text-slate-400">
                    {data?.user.email}
                  </p>

                </div>

              </div>

              {/* Account mark */}

              {/* <div className="hidden lg:block">

                <div className="flex items-end gap-3">

                  <div className="h-px w-16 bg-stone-200" />

                  <div>
                    <p className="text-right text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300">
                      Member
                    </p>

                    <p className="mt-1 text-right text-sm font-semibold text-slate-700">
                      NUVO / 2026
                    </p>
                  </div>

                </div>

              </div> */}

            </div>

            {/* Bottom information */}

            <div className="relative flex flex-col gap-3 border-t border-stone-100 px-7 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-10">

              <p className="text-xs text-slate-400">
                Manage your shopping experience from one place.
              </p>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <UserRound size={14} />
                Personal account
              </div>

            </div>

          </div>

        </motion.header>

        {/* ================================================= */}
        {/* ACCOUNT NAVIGATION */}
        {/* ================================================= */}

        <section>

          <div className="mb-6 flex items-end justify-between">

            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-amber-600">
                Account
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                What would you like to do?
              </h2>
            </div>

            <span className="hidden text-xs text-slate-400 sm:block">
              04 options
            </span>

          </div>

          {/* Cards */}

          <div className="grid gap-4 md:grid-cols-2">

            {items.map((item, index) => {

              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group relative min-h-[205px] overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
                >

                  {/* Hover background */}

                  <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-amber-100/70 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Number */}

                  <span className="absolute right-6 top-6 text-xs font-bold text-stone-200 transition-colors duration-300 group-hover:text-amber-300">
                    0{index + 1}
                  </span>

                  {/* Icon */}

                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-50 text-slate-700 transition-all duration-500 group-hover:bg-amber-50 group-hover:text-amber-600 group-hover:shadow-sm">
                    <Icon
                      size={23}
                      strokeWidth={1.7}
                    />
                  </div>

                  {/* Text */}

                  <div className="relative mt-8">

                    <h3 className="text-xl font-bold tracking-tight text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-1 max-w-xs text-sm leading-6 text-slate-400">
                      {item.subtitle}
                    </p>

                  </div>

                  {/* Arrow */}

                  <div className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-stone-50 text-slate-400 transition-all duration-500 group-hover:bg-slate-900 group-hover:text-white">
                    <ArrowUpRight
                      size={18}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>

                </Link>
              );
            })}

          </div>

        </section>

        {/* ================================================= */}
        {/* QUICK ACTIONS */}
        {/* ================================================= */}

        <div className="mt-5 grid gap-4 sm:grid-cols-2">

          {/* Shopping */}

          <Link
            href="/products"
            className="group flex items-center justify-between rounded-[2rem] bg-slate-900 px-6 py-5 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                <ShoppingBag size={19} />
              </div>

              <div>
                <p className="font-semibold">
                  Continue Shopping
                </p>

                <p className="mt-0.5 text-xs text-white/40">
                  Discover something new
                </p>
              </div>

            </div>

            <ArrowUpRight
              size={19}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />

          </Link>

          {/* Logout */}

          <button
            className="group flex items-center justify-between rounded-[2rem] border border-stone-200 bg-white px-6 py-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-red-100 hover:bg-red-50"
          >

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-stone-50 text-slate-400 transition-colors duration-300 group-hover:bg-red-100 group-hover:text-red-500">
                <LogOut size={18} />
              </div>

               
               <Link href="/" onClick={() => signOut({ callbackUrl: "/" })} className="flex items-center gap-4"> 
                <div  >
                <p className="font-semibold text-slate-800">
                  Sign out
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  End your current session
                </p>
              </div>
               </Link>
             

            </div>

            <ArrowUpRight
              size={18}
              className="text-slate-300 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-red-400"
            />

          </button>

        </div>

        

      </div>
    </main>
  );
}