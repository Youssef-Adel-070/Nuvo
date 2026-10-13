"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Banknote,
  CalendarDays,
  Check,
  ChevronDown,
  CreditCard,
  MapPin,
  Package,
  Phone,
  ShoppingBag,
  Truck,
  X,
} from "lucide-react";
import { useState } from "react";
import { OrderI } from "@/Interface";
import Link from "next/link";



interface OrdersClientProps {
  orders: OrderI[];
}

export default function OrdersCard({ orders }: OrdersClientProps) {
  const [openOrder, setOpenOrder] = useState<string | null>(null);

  const totalOrders = orders.length;

  const paidOrders = orders.filter((order) => order.isPaid).length;

  const pendingOrders = orders.filter((order) => !order.isPaid).length;

  const deliveredOrders = orders.filter(
    (order) => order.isDelivered
  ).length;

  return (
    <main className="min-h-screen bg-[#FBF9F6] px-4 py-8 text-slate-900 sm:px-6 lg:px-10">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-amber-200/25 blur-[120px]" />

        <div className="absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-stone-200/40 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-10">
          <div className="mb-10 flex items-center ">
           

            <Link
              href="/products"
              className="group flex items-center ms-auto gap-2 rounded-full border border-stone-200 bg-white px-4 py-2.5 text-xs font-medium text-slate-500 shadow-sm transition-all duration-300 hover:-translate-x-0.5 hover:border-amber-200 hover:text-amber-700"
            >
              <ArrowLeft
                size={14}
                className="transition-transform duration-300 group-hover:-translate-x-0.5"
              />

              Continue Shopping
            </Link>
          </div>

          {/* Hero */}
          <div className="relative overflow-hidden rounded-[2.5rem] border border-stone-200/80 bg-white shadow-[0_20px_70px_rgba(0,0,0,0.05)]">
            <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-amber-100/70 blur-3xl" />

            <div className="absolute -bottom-32 left-[35%] h-64 w-64 rounded-full bg-stone-100/80 blur-3xl" />

            <div className="relative p-7 sm:p-10">
              <div className="mb-8">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                    <Package size={19} />
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-600">
                    Your purchases
                  </span>
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                  My Orders
                </h1>

                <p className="mt-3 max-w-lg text-sm leading-6 text-slate-400 sm:text-base">
                  Track your purchases and keep an eye on your recent
                  orders.
                </p>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                <StatCard
                  label="Total Orders"
                  value={totalOrders}
                  icon={<Package size={16} />}
                />

                <StatCard
                  label="Paid"
                  value={paidOrders}
                  icon={<Check size={16} />}
                />

                <StatCard
                  label="Payment Pending"
                  value={pendingOrders}
                  icon={<Banknote size={16} />}
                />

                <StatCard
                  label="Delivered"
                  value={deliveredOrders}
                  icon={<Truck size={16} />}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Orders */}
        <section>
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-600">
                Order history
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight">
                Recent Orders
              </h2>
            </div>

            <span className="text-xs text-slate-400">
              {totalOrders} {totalOrders === 1 ? "order" : "orders"}
            </span>
          </div>

          {orders.length === 0 ? (
            <EmptyOrders />
          ) : (
            <div className="space-y-4">
              {orders.map((order, index) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.07,
                  }}
                >
                  <OrderCard
                    order={order}
                    isOpen={openOrder === order._id}
                    onToggle={() =>
                      setOpenOrder((current) =>
                        current === order._id
                          ? null
                          : order._id
                      )
                    }
                  />
                </motion.div>
              ))}
            </div>
          )}
        </section>

      
      </div>
      
    </main>
  );
}

/* ------------------------------------------------ */
/* STAT CARD */
/* ------------------------------------------------ */

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="group rounded-2xl border border-stone-200 bg-stone-50/70 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </span>

        <div className="text-amber-600 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
      </div>

      <p className="text-2xl font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

/* ------------------------------------------------ */
/* ORDER CARD */
/* ------------------------------------------------ */

function OrderCard({   order, isOpen, onToggle,}: { order: OrderI; isOpen: boolean; onToggle: () => void;}) {

  const subtotal = order.cartItems.reduce(
    (total, item) => total + item.price * item.count,
    0
  );

  const shipping = order.shippingPrice ?? 0;

  const tax = order.taxPrice ?? 0;

  const formattedDate = new Date(
    order.createdAt
  ).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className={`overflow-hidden rounded-[2rem] border bg-white transition-all duration-300 ${
        isOpen
          ? "border-amber-200 shadow-[0_20px_60px_rgba(0,0,0,0.07)]"
          : "border-stone-200/80 shadow-sm hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-lg"
      }`}
    >
      {/* Main Card */}
      <div className="p-5 sm:p-6">
        {/* Top */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-base font-bold text-slate-900">
                Order #{order.id}
              </h3>

              <span className="hidden h-1 w-1 rounded-full bg-stone-300 sm:block" />

              <span className="text-xs text-slate-400">
                {formattedDate}
              </span>
            </div>

            {/* Status */}
            <div className="mt-3 flex flex-wrap gap-2">
              <StatusBadge
                active={order.isPaid}
                activeText="Paid"
                inactiveText="Payment Pending"
                type="payment"
              />

              <StatusBadge
                active={order.isDelivered}
                activeText="Delivered"
                inactiveText="Not Delivered"
                type="delivery"
              />
            </div>
          </div>

          {/* Total */}
          <div className="sm:text-right">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Total
            </p>

            <p className="mt-1 text-xl font-bold tracking-tight text-slate-900">
              EGP {order.totalOrderPrice}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-stone-100" />

        {/* Products Preview */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center">
            <div className="flex -space-x-3">
              {order.cartItems.slice(0, 3).map((item, index) => (
                <div
                  key={`${item.product._id}-${index}`}
                  className="relative h-14 w-14 overflow-hidden rounded-xl border-2 border-white bg-stone-50 shadow-sm"
                >
                  <Image
                    src={item.product.imageCover}
                    alt={item.product.title}
                    fill
                    sizes="56px"
                    className="object-contain p-1 transition-transform duration-500 hover:scale-110"
                  />
                </div>
              ))}
            </div>

            <div className="ml-4 min-w-0">
              <p className="truncate text-sm font-semibold text-slate-800">
                {order.cartItems[0]?.product.title}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {order.cartItems.length}{" "}
                {order.cartItems.length === 1
                  ? "product"
                  : "products"}
              </p>
            </div>
          </div>

          {/* View button */}
          <button
            type="button"
            onClick={onToggle}
            className="group flex shrink-0 items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs font-semibold text-slate-600 transition-all duration-300 hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700"
          >
            {isOpen ? "Hide Details" : "View Order"}

            <ChevronDown
              size={14}
              className={`transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Bottom */}
        <div className="mt-5 flex flex-col gap-3 border-t border-stone-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            {order.paymentMethodType === "card" ? (
              <CreditCard size={14} />
            ) : (
              <Banknote size={14} />
            )}

            <span>
              {order.paymentMethodType === "card"
                ? "Card Payment"
                : "Cash on Delivery"}
            </span>
          </div>

          <span className="text-xs font-medium text-slate-400">
            {order.cartItems.reduce(
              (total, item) => total + item.count,
              0
            )}{" "}
            items
          </span>
        </div>
      </div>

      {/* Expanded Details */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="border-t border-stone-100 bg-[#FCFAF7] p-5 sm:p-6">
              <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
                {/* Left */}
                <div>
                  <SectionTitle title="Products" />

                    {/*Products cards*/}
                  <div className="space-y-3">
                    {order.cartItems.map((item) => (
                         
        <div key={item._id} className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white p-3 transition-all duration-300 hover:border-amber-200">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-stone-50">
        <Image
          src={item.product.imageCover}
          alt={item.product.title}
          fill
          sizes="64px"
          className="object-contain p-1"
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="line-clamp-1 text-sm font-semibold text-slate-800">
          {item.product.title}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
          {item.product.brand?.name && (
            <span>{item.product.brand.name}</span>
          )}

          <span>× {item.count}</span>
        </div>
      </div>

      <div className="text-right">
        <p className="text-sm font-bold text-slate-900">
          EGP {item.price * item.count}
        </p>

        {item.count > 1 && (
          <p className="mt-0.5 text-[10px] text-slate-400">
            EGP {item.price} each
          </p>
        )}
      </div>
    </div>
                    ))}
                  </div>

                  {/* Address */}
                  <div className="mt-6">
                    <SectionTitle title="Delivery Address" />

                    <div className="rounded-2xl border border-stone-200 bg-white p-4">
                      <div className="flex gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                          <MapPin size={16} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {order.shippingAddress.details}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {order.shippingAddress.city}
                            {order.shippingAddress.postalCode &&
                              ` · ${order.shippingAddress.postalCode}`}
                          </p>

                          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
                            <Phone size={12} />
                            {order.shippingAddress.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="space-y-5">
                  {/* Status */}
                  <div>
                    <SectionTitle title="Order Status" />

                    <StatusTimeline order={order} />
                  </div>

                  {/* Price */}
                  <div>
                    <SectionTitle title="Price Details" />

                    <div className="rounded-2xl border border-stone-200 bg-white p-4">
                      <PriceRow
                        label="Products"
                        value={`EGP ${subtotal}`}
                      />

                      <PriceRow
                        label="Shipping"
                        value={`EGP ${shipping}`}
                      />

                      <PriceRow
                        label="Tax"
                        value={`EGP ${tax}`}
                      />

                      <div className="my-3 h-px bg-stone-100" />

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900">
                          Total
                        </span>

                        <span className="text-lg font-bold text-slate-900">
                          EGP {order.totalOrderPrice}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment */}
                  <div>
                    <SectionTitle title="Payment" />

                    <div className="flex items-center justify-between rounded-2xl border border-stone-200 bg-white p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-50 text-slate-500">
                          {order.paymentMethodType === "card" ? (
                            <CreditCard size={16} />
                          ) : (
                            <Banknote size={16} />
                          )}
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {order.paymentMethodType ==="card"
                              ? "Card"
                              : "Cash"}
                          </p>

                          <p className="text-xs text-slate-400">
                            Payment method
                          </p>
                        </div>
                      </div>

                      <span
                        className={`text-xs font-semibold ${
                          order.isPaid
                            ? "text-emerald-600"
                            : "text-amber-600"
                        }`}
                      >
                        {order.isPaid ? "Paid" : "Pending"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------ */
/* PRODUCT ROW */
/* ------------------------------------------------ */

// function ProductRow({
//   item,
// }: {
//   item: OrderProduct;
// }) {
//   return (
//     <div className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white p-3 transition-all duration-300 hover:border-amber-200">
//       <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-stone-50">
//         <Image
//           src={item.product.imageCover}
//           alt={item.product.title}
//           fill
//           sizes="64px"
//           className="object-contain p-1"
//         />
//       </div>

//       <div className="min-w-0 flex-1">
//         <p className="line-clamp-1 text-sm font-semibold text-slate-800">
//           {item.product.title}
//         </p>

//         <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
//           {item.product.brand?.name && (
//             <span>{item.product.brand.name}</span>
//           )}

//           <span>× {item.count}</span>
//         </div>
//       </div>

//       <div className="text-right">
//         <p className="text-sm font-bold text-slate-900">
//           EGP {item.price * item.count}
//         </p>

//         {item.count > 1 && (
//           <p className="mt-0.5 text-[10px] text-slate-400">
//             EGP {item.price} each
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

/* ------------------------------------------------ */
/* STATUS */
/* ------------------------------------------------ */

function StatusBadge({
  active,
  activeText,
  inactiveText,
  type,
}: {
  active: boolean;
  activeText: string;
  inactiveText: string;
  type: "payment" | "delivery";
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
        active
          ? "bg-emerald-50 text-emerald-600"
          : type === "payment"
            ? "bg-amber-50 text-amber-600"
            : "bg-stone-100 text-slate-400"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          active
            ? "bg-emerald-500"
            : type === "payment"
              ? "animate-pulse bg-amber-500"
              : "bg-stone-400"
        }`}
      />

      {active ? activeText : inactiveText}
    </span>
  );
}

/* ------------------------------------------------ */
/* TIMELINE */
/* ------------------------------------------------ */

function StatusTimeline({ order }: { order: OrderI }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-4 space-y-2">
      <TimelineItem
        active
        completed
        title="Order Placed"
      />

      <TimelineItem
        active={order.isPaid}
        completed={order.isPaid}
        title="Payment"
        line
      />

      <TimelineItem
        active={order.isDelivered}
        completed={order.isDelivered}
        title="Delivery"
        line
      />
    </div>
  );
}

function TimelineItem({
  title,
  active,
  completed,
  line,
}: {
  title: string;
  active: boolean;
  completed: boolean;
  line?: boolean;
}) {
  return (
    <div className="relative flex items-center gap-3">
      {line && (
        <div
          className={`absolute bottom-5 left-[11px]  top-[-18px] w-px ${
            completed ? "bg-emerald-300" : "bg-stone-200"
          }`}
        />
      )}

      <div
        className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
          completed
            ? "bg-emerald-500 text-white"
            : active
              ? "bg-amber-100 text-amber-600"
              : "bg-stone-100 text-stone-400"
        }`}
      >
        {completed ? (
          <Check size={12} strokeWidth={3} />
        ) : (
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
        )}
      </div>

      <span
        className={`text-xs font-semibold ${
          completed || active
            ? "text-slate-700"
            : "text-slate-400"
        }`}
      >
        {title}
      </span>
    </div>
  );
}

/* ------------------------------------------------ */
/* SMALL COMPONENTS */
/* ------------------------------------------------ */

function SectionTitle({ title }: { title: string }) {
  return (
    <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
      {title}
    </p>
  );
}

function PriceRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between py-1.5 text-xs">
      <span className="text-slate-400">{label}</span>

      <span className="font-medium  text-slate-700">
        {value}
      </span>
    </div>
  );
}

/* ------------------------------------------------ */
/* EMPTY */
/* ------------------------------------------------ */

function EmptyOrders() {
  return (
    <div className="flex min-h-[430px] flex-col items-center justify-center rounded-[2.5rem] border border-stone-200/80 bg-white px-6 text-center shadow-sm">
      <div className="relative mb-7">
        <div className="absolute inset-0 scale-150 rounded-full bg-amber-100/60 blur-2xl" />

        <div className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] bg-stone-50 text-stone-300">
          <Package size={40} strokeWidth={1.4} />
        </div>
      </div>

      <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-600">
        No orders yet
      </span>

      <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
        Your order history is empty
      </h2>

      <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
        Once you place an order, you&apos;ll be able to track
        everything from here.
      </p>

      <a
        href="/products"
        className="group mt-7 flex items-center gap-3 rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        <ShoppingBag size={17} />

        Start Shopping

        <ArrowLeft
          size={16}
          className="rotate-180 transition-transform duration-300 group-hover:translate-x-1"
        />
      </a>
    </div>
  );
}