"use client";

import { useEffect, useState } from "react";
import { Star, UserRound, Send, Loader2Icon } from "lucide-react";
import { getReview } from "@/services/reviewService";
import { ReviewI } from "@/Interface";
import { addReview } from "@/actions/addReview.action";
import toast from "react-hot-toast";



type ProductReviewsProps = {
  productId: string;
  rating: number;
  reviewsCount: number;
}

export default function ProductReviews({
  productId,
  rating,
  reviewsCount,
}: ProductReviewsProps) {
  const [selectedRating, setSelectedRating] = useState(0);
  const [review, setReview] = useState("");  
  const [customerReview, setCustomerReview] = useState<ReviewI[]>([]);  
  const [isLoading, setisLoading] = useState<boolean>(false);  
  const [isAdding, setIsAdding] = useState<boolean>(false);  

  async function reviewData() { 
    setisLoading(true) 
    try {
        const {data:customerReviews}= await getReview({productId}) 
        setCustomerReview(customerReviews) 
        
    } catch (error) {
        console.log(error);
        
        
    }finally{ 
        setisLoading(false)
    }
  
   
  }

 useEffect(()=>{reviewData()},[productId])
 
async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

 

  setIsAdding(true);

  try {
    const { data } = await addReview(
      { productId },
      review,
      selectedRating
    );

    if (data) {
      toast.success("Review Added Successfully");

      // Get updated reviews
      await reviewData();

      setReview("");
      setSelectedRating(0);
    }
  } catch (error) {
    console.log(error, "error from add Review");
    if (error instanceof Error) {
      toast.error(error.message); 
      
      setReview("");
      setSelectedRating(0);
    } else {
      toast.error("Failed to add review");
    }
  } finally {
    setIsAdding(false);
  }
}
  return (
    <section className="mt-8 sm:mt-10 lg:mt-12">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 ring-1 ring-amber-200">
            Customer feedback
          </span>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Reviews & Ratings
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            See what other customers think about this product.
          </p>
        </div>

        {/* Rating summary */}
        <div className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
            <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-slate-900">
                {rating.toFixed(1)}
              </span>

              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-3.5 w-3.5 ${
                      star <= Math.round(rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-stone-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-500">
              {reviewsCount} reviews
            </p>
          </div>
        </div>
      </div>

      {/* Add Review */}
      <div className="relative overflow-hidden rounded-3xl border border-stone-200/80 bg-white p-5 shadow-sm sm:p-6">
        {/* Decorative glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-amber-100/50 blur-3xl" />

        <div className="relative">
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-slate-900">
              Share your experience
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Your review helps other customers make better decisions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Rating */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Your rating
              </label>

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setSelectedRating(star)}
                    className="rounded-lg p-1.5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-50"
                  >
                    <Star
                      className={`h-6 w-6 transition-all ${
                        star <= selectedRating
                          ? "fill-amber-400 text-amber-400"
                          : "text-stone-300 hover:text-amber-300"
                      }`}
                    />
                  </button>
                ))}

                {selectedRating > 0 && (
                  <span className="ml-2 text-sm font-medium text-slate-500">
                    {selectedRating}/5
                  </span>
                )}
              </div>
            </div>

            {/* Review input */}
            <div>
              <label
                htmlFor="review"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Your review
              </label>

              <textarea
                id="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Tell us what you think about this product..."
                rows={4}
                className="w-full resize-none rounded-2xl border border-stone-200 bg-stone-50/50 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-amber-300 focus:bg-white focus:ring-4 focus:ring-amber-100/60"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!review.trim() || selectedRating === 0}
                className="group inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              > 
              {isAdding?<Loader2Icon className="animate-spin"/>:
                <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              }
                Add Review
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">
            Customer Reviews
          </h3>

          <span className="text-sm text-slate-500">
            {customerReview.length} reviews
          </span>
        </div>

        <div className="space-y-4">
          {customerReview.map((review) => (
            <div
              key={review._id}
              className="group rounded-2xl border border-stone-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100">
                    <UserRound className="h-5 w-5 text-slate-500" />
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">
                      {review.user.name}
                    </h4>

                    <p className="text-xs text-slate-400">
                      {review.createdAt.split("T",1).join(" _ ")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 rounded-lg bg-amber-50 px-2 py-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-3.5 w-3.5 ${
                        star <= review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-stone-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                {review.review}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}