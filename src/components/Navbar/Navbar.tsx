"use client";

import {
  Loader2Icon,
  ShoppingCartIcon,
  UserIcon,
  Home,
  Grid2X2,
  Package,
  Tags,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Badge } from "../ui/badge";
import { CartContext } from "@/Context/CartContext";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const pathName = usePathname();
  const { cartData, isLoading } = useContext(CartContext);

  const session = useSession();

  console.log(session);

  const navItems = [
    {
      href: "/",
      label: "Home",
      icon: Home,
    },
    {
      href: "/categories",
      label: "Categories",
      icon: Grid2X2,
    },
    {
      href: "/products",
      label: "Products",
      icon: Package,
    },
    {
      href: "/brands",
      label: "Brands",
      icon: Tags,
    },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-stone-200/80 bg-[#FBF9F6]/95 shadow-sm backdrop-blur-md">
        <div className="container mx-auto flex min-h-18 items-center justify-between gap-4 px-4 sm:px-6">
          {/* Logo */}
          <h2 className="shrink-0 text-2xl font-bold tracking-tight">
            <Link href="/" className="group inline-flex items-center">
              <span className="mr-0.5 flex size-9 items-center justify-center rounded-xl bg-slate-950 text-lg font-extrabold text-white shadow-sm transition-all duration-300 group-hover:-rotate-3 group-hover:scale-105">
                N
              </span>

              <span className="text-slate-900 transition-colors duration-300 group-hover:text-amber-600">
                Nuvo
              </span>
            </Link>
          </h2>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-1 rounded-2xl border border-stone-200 bg-white/70 p-1.5 shadow-sm">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link key={item.href} href={item.href}>
                    <li
                      className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
                        pathName === item.href
                          ? "bg-slate-950 text-white shadow-sm"
                          : "text-slate-600 hover:bg-stone-100 hover:text-slate-950"
                      }`}
                    >
                      {item.label}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Greeting */}
            {session.status == "authenticated" && (
              <h2 className="hidden text-sm font-medium text-slate-600 lg:block">
                Hi{" "}
                <span className="font-semibold text-slate-900">
                  {session.data?.user.name.split(" ", 1).join("")}
                </span>
              </h2>
            )}

            {/* Account */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex size-10 items-center justify-center rounded-xl border border-stone-200 bg-white text-slate-700 shadow-sm outline-none transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 hover:shadow-md active:scale-95">
                <UserIcon className="size-5" />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-52 rounded-2xl border-stone-200 bg-white p-2 shadow-xl"
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    My Account
                  </DropdownMenuLabel>

                  {session.status == "authenticated" ? (
                    <div>
                      <Link href="/profile">
                        <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5 text-sm transition-colors focus:bg-stone-100">
                          Profile
                        </DropdownMenuItem>
                      </Link>

                      <Link
                        href="/"
                        onClick={() => signOut({ callbackUrl: "/" })}
                      >
                        <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5 text-sm text-red-500 transition-colors focus:bg-red-50 focus:text-red-600">
                          LoginOut
                        </DropdownMenuItem>
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <Link href="/login">
                        <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5 text-sm transition-colors focus:bg-stone-100">
                          Login
                        </DropdownMenuItem>
                      </Link>

                      <Link href="/register">
                        <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5 text-sm transition-colors focus:bg-stone-100">
                          Register
                        </DropdownMenuItem>
                      </Link>
                    </div>
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            {session.status == "authenticated" && (
              <Link href="/cart" className="group">
                <div className="relative flex size-10 items-center justify-center rounded-xl border border-stone-200 bg-white text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 hover:shadow-md active:scale-95">
                  <ShoppingCartIcon className="size-5 transition-transform duration-300 group-hover:scale-110" />

                  <Badge className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full border-2 border-[#FBF9F6] bg-amber-500 p-0 shadow-sm">
                    <span className="text-[10px] font-bold text-white">
                      {isLoading ? (
                        <Loader2Icon className="size-3 animate-spin" />
                      ) : (
                        cartData?.numOfCartItems
                      )}
                    </span>
                  </Badge>
                </div>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200/80 bg-[#FBF9F6]/95 px-3 pb-[max(0.65rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl md:hidden">
        <div className="mx-auto flex max-w-md items-center justify-around rounded-2xl border border-stone-200/80 bg-white/80 p-1.5 shadow-sm">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathName === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-1 justify-center"
              >
                <div
                  className={`group relative flex min-w-[64px] flex-col items-center justify-center gap-1 rounded-xl px-3 py-2 transition-all duration-300 ${
                    isActive
                      ? "bg-slate-950 text-white shadow-md"
                      : "text-slate-500 hover:bg-stone-100 hover:text-slate-900"
                  }`}
                >
                  <Icon
                    className={`size-[18px] transition-transform duration-300 ${
                      isActive ? "scale-105" : "group-hover:scale-110"
                    }`}
                  />

                  <span className="text-[10px] font-semibold leading-none">
                    {item.label}
                  </span>

                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-amber-400" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}