
"use client"
import Link from 'next/link';
import { ArrowLeft, Home, ShoppingCart, Apple, Carrot, Leaf, Sprout } from 'lucide-react';


export default function NotFound() {
  return (
    <>
      <div className="min-h-screen bg-[#f8fbf6] flex items-center justify-center overflow-hidden relative px-4 py-12">
        {/* Soft Background Decorations - Now using Lucide React Icons */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          {/* Apple Icon */}
          <Apple
            className="absolute top-16 left-12 text-[#14A34A] w-12 h-12"
          />

          {/* Carrot Icon */}
          <Carrot
            className="absolute top-52 right-16 text-[#14A34A] w-10 h-10"
          />

          {/* Leaf Icon */}
          <Leaf
            className="absolute bottom-28 left-1/4 text-[#14A34A] w-14 h-14"
          />

          {/* Sprout Icon */}
          <Sprout
            className="absolute bottom-40 right-1/3 text-[#14A34A] w-11 h-11"
          />
        </div>

        <div className="max-w-md w-full text-center relative z-10">
          {/* 404 Card - Main Shopping Cart now using Lucide Icon */}
          <div className="relative mx-auto mb-10 w-44 h-44">
            <div className="bg-white rounded-3xl shadow-md p-10 flex items-center justify-center border border-[#f0f4f0]">
              <ShoppingCart className="text-[#14A34A] w-24 h-24 drop-shadow-sm" />
            </div>

            {/* 404 Badge - Softer Green */}
            <div className="absolute -top-3 -right-3 bg-[#14A34A] text-white text-xl font-semibold w-14 h-14 rounded-2xl flex items-center justify-center shadow-md border-4 border-white">
              404
            </div>
          </div>

          {/* Gentle Smiley */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-[#14A34A] rounded-full"></div>
              <div className="w-5 h-1.5 border-b-2 border-[#14A34A] rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-[#14A34A] rounded-full"></div>
            </div>
          </div>

          {/* Content - Smaller & Softer Text */}
          <h1 className="text-3xl font-semibold text-[#1f2a24] mb-3 tracking-tight">
            Oops! Nothing Here
          </h1>

          <p className="text-[#45544b] text-[15.5px] leading-relaxed max-w-xs mx-auto mb-12">
            Looks like this page went out of stock! Don&apos;t worry,
            there&apos;s plenty more fresh content to explore.
          </p>

          {/* Action Buttons - Softer & Comfortable */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <Link
              href="/"
              className="flex items-center justify-center gap-2.5 bg-[#14A34A] hover:bg-[#118f3f] 
                       text-white font-medium text-base px-8 py-3.5 rounded-2xl 
                       transition-all duration-200 shadow-sm active:scale-[0.985]"
            >
              <Home className="w-4.5 h-4.5" />
              Go to Homepage
            </Link>

            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2.5 border border-[#a3b8a9] 
                       hover:bg-white hover:border-[#14A34A] hover:text-[#14A34A]
                       text-[#45544b] font-medium text-base px-8 py-3.5 rounded-2xl 
                       transition-all duration-200 active:scale-[0.985]"
            >
              <ArrowLeft className="w-4.5 h-4.5" />
              Go Back
            </button>
          </div>

          {/* Popular Destinations - Cleaner & Smaller */}
          <div className="bg-white rounded-3xl p-7 shadow-sm border border-[#f0f4f0]">
            <p className="text-xs uppercase tracking-[1px] text-[#8a9a91] mb-5 font-medium">
              POPULAR DESTINATIONS
            </p>

            <div className="flex gap-2.5 justify-center">
              <Link
                href="/products"
                className="px-5 py-2.5 bg-[#f0f7f0] hover:bg-[#e6f2e6] text-[#14A34A] 
                         text-sm font-medium rounded-xl transition-colors"
              >
                All Products
              </Link>
              <Link
                href="/categories"
                className="px-5 py-2.5 flex items-center justify-center text-[#45544b] hover:bg-[#f8faf7] 
                         text-sm font-medium rounded-xl border border-[#e8ede8] transition-colors"
              >
                Categories
              </Link>
              <Link
                href="/deals"
                className="px-5 py-2.5 text-[#45544b] hover:bg-[#f8faf7] 
                         text-sm font-medium rounded-xl border border-[#e8ede8] transition-colors"
              >
                Today&apos;s Deals
              </Link>
              <Link
                href="/contact"
                className="px-5 py-2.5 text-[#45544b] hover:bg-[#f8faf7] 
                         text-sm font-medium rounded-xl border border-[#e8ede8] transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}