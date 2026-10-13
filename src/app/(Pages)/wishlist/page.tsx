"use client"
import Link from "next/link";
import { Heart, ArrowLeft, ShoppingBag, Sparkles, Trash2, Loader2Icon } from "lucide-react";
import ProductCard from "@/components/ProductCard/ProductCard";
import { getWishlist } from "@/services/wishlistService";
import { productI } from "@/Interface";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { removeFromWishlist } from "@/actions/removeWishlist.action";

export default   function WishlistPage() {
    
 
    const [wishlistProducts,setWishlistProducts]=useState<productI[]>([])  
    const [removingId, setRemovingId] = useState<string | null>(null);

    async function getWishlistsData() {
          
        const {data}=await getWishlist()
        setWishlistProducts(data)
}
    
    async function handleRemove(productId: string) {
  
        setRemovingId(productId);

  try {
    const data = await removeFromWishlist(productId);

    if (data.status === "success") {
      setWishlistProducts((prev) =>
        prev.filter((product) => product._id !== productId)
      );

      toast.success("Removed from wishlist");
    }
  } catch (error) {
    console.log(error);
    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to remove from wishlist"
    );
  } finally {
    setRemovingId(null);
  }
}
   
useEffect(()=>{getWishlistsData()},[])

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FBF9F6] px-4 py-8 text-slate-900 sm:px-6 lg:px-10">
      
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-amber-200/25 blur-[120px]" />

        <div className="absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-stone-200/40 blur-[120px]" />

        <div className="absolute left-[15%] top-[20%] h-1.5 w-1.5 rounded-full bg-amber-400/60" />

        <div className="absolute right-[20%] top-[40%] h-2 w-2 rounded-full bg-stone-300" />
      </div>

      <div className="relative mx-auto max-w-7xl">

        {/* Header */}
        <header className="mb-10">
          {/* Top navigation */}
          <div className="mb-10 flex items-center  ">

            <Link
              href="/products"
              className="group flex items-center ms-auto  gap-2 rounded-full border border-stone-200 bg-white px-4 py-2.5 text-xs font-medium text-slate-500 shadow-sm transition-all hover:border-amber-200 hover:text-amber-700"
            >
              <ArrowLeft
                size={14}
                className="transition-transform group-hover:-translate-x-0.5"
              />

              Continue Shopping
            </Link>
          </div>

          {/* Wishlist Hero */}
          <div className="relative overflow-hidden rounded-[2.5rem] border border-stone-200/80 bg-white shadow-[0_20px_70px_rgba(0,0,0,0.05)]">
            
            {/* Decorative circles */}
            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-amber-100/70 blur-3xl" />

            <div className="absolute -bottom-32 left-[35%] h-64 w-64 rounded-full bg-stone-100/70 blur-3xl" />

            <div className="relative flex flex-col gap-6 p-7 sm:p-10 lg:flex-row lg:items-end lg:justify-between">
              
              {/* Title */}
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                    <Heart
                      size={19}
                      fill="currentColor"
                      strokeWidth={1.7}
                    />
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-600">
                    Your Collection
                  </span>
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                  Wishlist
                </h1>

                <p className="mt-3 max-w-lg text-sm leading-6 text-slate-400 sm:text-base">
                  Keep the things you love close. Your saved products are
                  waiting for you here.
                </p>
              </div>

              {/* Count */}
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-stone-200 bg-stone-50/80 px-5 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Saved Items
                  </p>

                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {wishlistProducts?.length}
                  </p>
                </div>

                <div className="hidden h-16 w-px bg-stone-200 sm:block" />

                <p className="hidden max-w-[120px] text-xs leading-5 text-slate-400 sm:block">
                  Products you've saved for later.
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Products */}
        {wishlistProducts?.length > 0 ? (
          <section>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-600">
                  Saved for later
                </p>

                <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                  Your Favorites
                </h2>
              </div>

              <span className="text-xs text-slate-400">
                {wishlistProducts?.length}{" "}
                {wishlistProducts?.length === 1 ? "item" : "items"}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
             {wishlistProducts.map((product) => (
  <div
    key={product._id}
    className="group relative"
  >
    <ProductCard product={product} />

    {/* Remove button */}
    <button
      type="button"
      onClick={() => handleRemove(product._id)}
      disabled={removingId === product._id}
      className="
        absolute
        bottom-4
        left-4
        z-20
        flex
        items-center
        gap-2
        rounded-xl
        border
        border-stone-200
        bg-white/95
        px-3
        py-2
        text-xs
        font-semibold
        text-slate-500
        shadow-sm
        backdrop-blur-sm
        transition-all
        duration-300
        hover:border-red-200
        hover:bg-red-50
        hover:text-red-500
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      {removingId === product._id ? (
        <Loader2Icon
          size={14}
          className="animate-spin"
        />
      ) : (
        <Trash2 size={14} />
      )}

      {removingId === product._id
        ? "Removing..."
        : "Remove"}
    </button>
  </div>
))}
            </div>
          </section>
        ) : (
          /* Empty Wishlist */
          <section className="flex min-h-[430px] items-center justify-center rounded-[2.5rem] border border-stone-200/80 bg-white shadow-sm">
            <div className="flex max-w-md flex-col items-center px-6 py-14 text-center">
              
              <div className="relative mb-7">
                <div className="absolute inset-0 scale-150 rounded-full bg-amber-100/60 blur-2xl" />

                <div className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] bg-stone-50 text-stone-300">
                  <Heart
                    size={40}
                    strokeWidth={1.4}
                  />
                </div>
              </div>

              <span className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-amber-600">
                Nothing saved yet
              </span>

              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Your wishlist is waiting
              </h2>

              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
                Explore our products and save anything you love. Your
                favorites will appear here.
              </p>

              <Link
                href="/products"
                className="group mt-7 flex items-center gap-3 rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <ShoppingBag size={17} />

                Explore Products

                <ArrowLeft
                  size={16}
                  className="rotate-180 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="py-10 text-center">
          <p className="text-[11px] tracking-wide text-slate-300">
            NUVO · Your shopping space
          </p>
        </footer>
      </div>
    </main>
  );
}