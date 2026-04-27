"use client";
import { CreateReviewForProduct, GetReviewsForProduct } from "@/CallingAPIs/AllProdects";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { ProdectType } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FiStar, FiTruck } from "react-icons/fi";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import * as z from "zod";

const scema = z.object({

  review: z.string().min(5, "above 5 char"),
  rating: z.number().min(1, "Please select a rating").max(5)

})

interface Valuee {

  review: string,

  rating: number,

}

interface TapsProjectDetailsProps {
  prodect?: ProdectType | null;
  prodectٌReview: {

    _id: string,
    createdAt: string,
    product: string,
    rating: number,
    review: string,
    updatedAt: string,
    user: {
      name: string,
      _id: string,
    }

  }[]
}

const keyFeatures = [
  "Premium Quality Product",
  "100% Authentic Guarantee",
  "Fast & Secure Packaging",
  "Quality Tested",
];

const tabs = [
  { id: "details", label: "Product Details", shortLabel: "Details", icon: "store" },
  { id: "reviews", label: "Reviews", shortLabel: "Reviews", icon: "star", count: true },
  { id: "shipping", label: "Shipping & Returns", shortLabel: "Shipping", icon: "truck" },
];

export function TapsProjectDetails({ prodect, prodectٌReview }: TapsProjectDetailsProps) {

  const [reviews, setReviews] = useState<TapsProjectDetailsProps["prodectٌReview"]>(
    prodectٌReview ?? []
  );

  useEffect(() => {
    setReviews(prodectٌReview ?? []);
  }, [prodectٌReview]);

  async function handeldata(value: Valuee) {

    const createcommit = await CreateReviewForProduct(prodect?._id, value.review, value.rating)

    if (createcommit) {
      const latest = await GetReviewsForProduct(prodect?._id);
      if (latest) setReviews(latest);
      form.reset({ review: "", rating: undefined });
    }

}

  const form = useForm({
    defaultValues: {
      review: "",
      rating: undefined,
    }, resolver: zodResolver(scema)
  })


  const [showAll, setShowAll] = useState(false);


  const [activeTab, setActiveTab] = useState("details");
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative cursor-pointer flex items-center gap-1.5 px-4 sm:px-6 py-3.5 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0
                ${isActive ? "text-green-600" : "text-gray-500 hover:text-gray-700"}`}
            >
              {tab.icon === "store" && <MdOutlineLocalGroceryStore className="text-base hidden sm:block" />}
              {tab.icon === "star" && <FiStar className="text-base hidden sm:block" />}
              {tab.icon === "truck" && <FiTruck className="text-base hidden sm:block" />}

              {/* Short label on mobile, full label on sm+ */}
              <span className="sm:hidden">{tab.shortLabel}</span>
              <span className="hidden sm:inline">{tab.label}</span>

              {tab.count && (
                <span className="text-gray-400 font-normal">({reviews.length})</span>
              )}

              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 rounded-t" />
              )}
            </button>
          );
        })}
      </div>

      {/* Product Details panel */}
      {activeTab === "details" && (
        <div className="p-4 sm:p-6 lg:p-8">
          <h2 className="text-base font-bold text-gray-900">About this Product</h2>
          <p className="mt-2 text-sm text-gray-500 leading-6">{prodect?.description}</p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Product Information */}
            <div className="rounded-xl border border-gray-200 p-4 sm:p-5">
              <h3 className="text-sm font-bold text-gray-800 mb-4">Product Information</h3>
              <table className="w-full text-sm">
                <tbody>
                  {[
                    { label: "Category", value: prodect?.category.name },
                    { label: "Subcategory", value: (prodect?.subcategory ?? [])[0]?.name ?? "—" },
                    { label: "Brand", value: prodect?.brand.name },
                    { label: "Items Sold", value: `${prodect?.sold ?? 0}+ sold` },
                  ].map(({ label, value }) => (
                    <tr key={label} className="border-b border-gray-100 last:border-0">
                      <td className="py-2.5 text-gray-400 w-1/2">{label}</td>
                      <td className="py-2.5 text-right font-semibold text-gray-800">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Key Features */}
            <div className="rounded-xl border border-gray-200 p-4 sm:p-5">
              <h3 className="text-sm font-bold text-gray-800 mb-4">Key Features</h3>
              <ul className="space-y-3">
                {keyFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="text-green-600 font-bold text-base leading-none">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Reviews panel */}
      {activeTab === "reviews" && (
        <div className="p-4 sm:p-6 lg:p-8">
          <h2 className="text-base font-bold text-gray-900 mb-4">Customer Reviews</h2>
          {reviews?.length ?? 0 > 0 ? (
            <div className="flex items-center gap-4">
              <div className="text-4xl sm:text-5xl font-bold text-gray-900">
                {prodect?.ratingsAverage}
              </div>
              <div>
                <div className="flex gap-0.5 text-amber-400 text-lg">
                  {"★".repeat(Math.floor(prodect?.ratingsAverage ?? 0))}
                  <span className="text-gray-200">
                    {"★".repeat(5 - Math.floor(prodect?.ratingsAverage ?? 0))}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-400">
                  Based on {reviews?.length} reviews
                </p>
              </div>
            </div>


          ) : (
            <p className="text-sm text-gray-400">No reviews yet.</p>
          )}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">


            {reviews?.slice(0, showAll ? reviews.length : 5).map((review, index) => (
              <div
                key={index}
                className="flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 mt-4"
              >
                <Avatar className="w-11 h-11 shrink-0 ring-2 ring-[#28C862]/30">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt={review.user.name}
                    className="grayscale"
                  />
                  <AvatarFallback className="bg-[#28C862]/10 text-[#28C862] font-bold text-sm">
                    {review.user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {review.user.name}
                    </p>
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${star <= review.rating ? "text-amber-400" : "text-gray-200"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1 text-xs text-gray-400 font-medium">
                        {review.rating}/5
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed wrap-break-word">
                    {review.review}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {reviews?.length > 5 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-1/2 text-center justify-center items-center m-auto flex mt-4 py-2.5 rounded-2xl border border-[#28C862] text-[#28C862] text-sm font-bold hover:bg-[#28C862] hover:text-white transition-all duration-200"
            >
              {showAll ? "Show Less ↑" : `Show More (${reviews.length - 5} more) ↓`}
            </button>
          )}


          <form onSubmit={form.handleSubmit(handeldata)} className="mt-8 max-w-xl mx-auto">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm space-y-5">

              <h3 className="text-base font-extrabold text-gray-900">Leave a Review</h3>

              {/* Rating Stars */}
              <Controller
                name="rating"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Your Rating <span className="text-red-400">*</span>
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => field.onChange(star)}
                          className="text-3xl transition-transform hover:scale-110 focus:outline-none"
                        >
                          <span className={field.value >= star ? "text-amber-400" : "text-gray-200"}>
                            ★
                          </span>
                        </button>
                      ))}
                      {field.value && (
                        <span className="ml-2 self-center text-sm font-semibold text-gray-500">
                          {field.value}/5
                        </span>
                      )}
                    </div>
                    {fieldState.error && (
                      <p className="mt-1 text-xs text-red-500">Please select a rating</p>
                    )}
                  </div>
                )}
              />

              {/* Review Text */}
              <Controller
                name="review"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor={field.name}>
                      Your Comment <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      {...field}
                      id={field.name}
                      rows={4}
                      placeholder="Share your experience with this product..."
                      className={`w-full rounded-xl border px-4 py-3 text-sm text-gray-800 bg-white shadow-sm resize-none outline-none transition-all
              ${fieldState.invalid
                          ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                          : "border-gray-200 focus:border-[#28C862] focus:ring-2 focus:ring-[#28C862]/10"
                        }`}
                    />
                    {fieldState.error && (
                      <p className="mt-1 text-xs text-red-500">{fieldState.error.message}</p>
                    )}
                  </div>
                )}
              />

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#28C862] hover:bg-[#16A34A] text-white text-sm font-extrabold transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                Submit Review ✓
              </button>

            </div>
          </form>


        </div>
      )}

      {/* Shipping panel */}
      {activeTab === "shipping" && (
        <div className="p-4 sm:p-6 lg:p-8">
          <h2 className="text-base font-bold text-gray-900 mb-5">Shipping & Returns</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[
              { title: "Dispatch", text: "Orders are prepared and dispatched quickly after purchase." },
              { title: "Returns", text: "Easy returns available within the policy window." },
              { title: "Support", text: "Reach support for order updates, questions, or after-sales help." },
            ].map(({ title, text }) => (
              <div key={title} className="rounded-xl border border-gray-200 p-4 sm:p-5">
                <p className="text-sm font-bold text-gray-900 mb-2">{title}</p>
                <p className="text-sm leading-6 text-gray-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}