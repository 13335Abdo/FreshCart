"use client";
import { ProdectType } from "@/types/types";
import { useState } from "react";
import { FiStar, FiTruck } from "react-icons/fi";
import { MdOutlineLocalGroceryStore } from "react-icons/md";

interface TapsProjectDetailsProps {
  prodect?: ProdectType | null;
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

export function TapsProjectDetails({ prodect }: TapsProjectDetailsProps) {
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
                <span className="text-gray-400 font-normal">({prodect?.ratingsQuantity})</span>
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
          {Number(prodect?.ratingsQuantity ?? 0) > 0 ? (
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
                  Based on {prodect?.ratingsQuantity} reviews
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-400">No reviews yet.</p>
          )}
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