 'use client'
 import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  CreditCard,
  Headphones,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#080d18] text-white ">
      {/* =========================================================
          HERO
      ========================================================== */}
      <div className="relative overflow-hidden min-h-[100svh]">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=85&w=2200&auto=format&fit=crop"
            alt="Modern retail store"
            className="h-full w-full object-cover object-center scale-105 transition-transform duration-[2000ms] ease-out hover:scale-100"
          />

          {/* Cinematic overlays */}
          <div className="absolute inset-0 bg-[#080d18]/70" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#080d18] via-[#080d18]/90 to-[#080d18]/35" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#080d18] via-transparent to-[#080d18]/70" />
        </div>

        {/* Ambient lights */}
        <div className="pointer-events-none absolute -left-40 top-1/4 size-[500px] rounded-full bg-amber-500/10 blur-[130px]" />

        <div className="pointer-events-none absolute right-[-180px] top-[-180px] size-[500px] rounded-full bg-amber-400/5 blur-[120px]" />

        {/* =====================================================
            TOP BAR
        ====================================================== */}
        <div className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-5 pt-6 sm:px-8 lg:px-10">
          {/* Collection label */}
          <div className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/25 px-3.5 py-2 backdrop-blur-md transition-all duration-300 hover:border-amber-400/30 hover:bg-black/40">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-amber-400/60" />
              <span className="relative size-2 rounded-full bg-amber-400" />
            </span>

            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-300 sm:text-[11px]">
              New season collection
            </span>
          </div>

          {/* Small counter */}
          <div className="hidden items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-stone-400 sm:flex">
            <span className="text-amber-400">01</span>

            <span className="h-px w-10 bg-white/20" />

            <span>03</span>
          </div>
        </div>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}
        <div className="relative z-10 mx-auto flex min-h-[610px] max-w-7xl items-center px-5 py-16 sm:px-8 lg:min-h-[625px] lg:px-10">
          <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
            {/* =================================================
                LEFT CONTENT
            ================================================== */}
            <div className="lg:col-span-7">
              {/* Eyebrow */}
              <div className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-amber-400">
                <span className="h-px w-8 bg-amber-400" />

                <span>Shop what you need</span>
              </div>

              {/* Heading */}
              <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl lg:text-[76px]">
                Everything
                <br />

                <span className="font-light text-stone-300">
                  you want.
                </span>

                <br />

                <span className="relative inline-block text-amber-400">
                  One place.
                  <span className="absolute -bottom-1 left-0 h-px w-2/3 bg-amber-400/50" />
                </span>
              </h1>

              {/* Description */}
              <p className="mt-7 max-w-xl text-sm leading-7 text-stone-300 sm:text-base">
               Browse a wide range of products, compare your options, and enjoy a
  simple shopping experience from browsing to checkout.
              </p>

              {/* CTA */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/products"
                  className="group inline-flex items-center gap-3 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-bold text-[#10151f] shadow-[0_10px_35px_rgba(245,158,11,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-amber-400 hover:shadow-[0_15px_45px_rgba(245,158,11,0.25)] active:scale-[0.97]"
                >
                  <ShoppingBag className="size-4" />

                  <span>Shop now</span>

                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/categories"
                  className="group inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-6 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.1] active:scale-[0.97]"
                >
                  <Sparkles className="size-4 text-amber-400" />

                  <span>Explore categories</span>

                  <ArrowUpRight className="size-4 opacity-50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </Link>
              </div>

             
            </div>

            {/* =================================================
                RIGHT PRODUCT VISUAL
            ================================================== */}
            <div className="relative hidden h-[500px] lg:col-span-5 lg:block">
              {/* Decorative circle */}
              <div className="absolute right-4 top-1/2 size-[360px] -translate-y-1/2 rounded-full border border-white/10" />

              <div className="absolute right-10 top-1/2 size-[300px] -translate-y-1/2 rounded-full border border-amber-400/10" />

              {/* Main product image */}
              <div className="group absolute right-8 top-1/2 w-[270px] -translate-y-1/2 overflow-hidden rounded-[28px] border border-white/15 bg-white/10 shadow-2xl backdrop-blur-sm transition-all duration-700 hover:-translate-y-[53%] hover:rotate-1">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=85&w=900&auto=format&fit=crop"
                    alt="Featured product"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                  {/* Product label */}
                  <div className="absolute left-4 top-4">
                    <span className="rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-900 shadow-lg">
                      Featured
                    </span>
                  </div>

                  {/* Product information */}
                  <div className="absolute inset-x-4 bottom-4">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-amber-300">
                     Featured product
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-white">
                       Take a closer look.
                    </h3>

                    <Link
                      href="/products"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-white transition-colors hover:text-amber-300"
                    >
                      View collection
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Floating small card - top */}
              <div className="absolute left-0 top-16 animate-[float_5s_ease-in-out_infinite]">
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#101722]/90 p-3 shadow-2xl backdrop-blur-xl">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400">
                    <ShoppingBag className="size-4" />
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-stone-500">
                      Shopping
                    </p>

                    <p className="mt-0.5 text-xs font-semibold text-white">
                      Made simple
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating small card - bottom */}
              <div className="absolute bottom-20 right-0 animate-[float_6s_ease-in-out_infinite_1s]">
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#101722]/90 p-3 shadow-2xl backdrop-blur-xl">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                    <ShieldCheck className="size-4" />
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-stone-500">
                      Checkout
                    </p>

                    <p className="mt-0.5 text-xs font-semibold text-white">
                     Simple & convenient
                    </p>
                  </div>
                </div>
              </div>

              {/* Small amber decoration */}
              <div className="absolute bottom-8 left-20 size-3 animate-pulse rounded-full bg-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.8)]" />

            </div>
          </div>
        </div>

    

        {/* =====================================================
            SCROLL INDICATOR
        ====================================================== */}
        <div className="absolute bottom-[92px] left-1/2 z-30 hidden -translate-x-1/2 lg:block">
          <button
            type="button" 
            aria-label="Scroll to explore"
            className="group flex flex-col items-center gap-2 text-stone-500 transition-colors duration-300 hover:text-amber-400"
          >
            <span className="text-[8px] font-semibold uppercase tracking-[0.3em]">
              Explore
            </span>

            <span className="flex size-8 items-center justify-center rounded-full border border-white/15 bg-black/20 backdrop-blur-sm transition-all duration-300 group-hover:border-amber-400/40 group-hover:bg-amber-400/10">
              <ChevronDown className="size-3.5 animate-bounce" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}