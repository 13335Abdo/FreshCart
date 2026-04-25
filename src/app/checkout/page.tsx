"use client";
import { storeTpe } from "@/types/types";
import Link from "next/link";
import { FaReceipt, FaTruck } from "react-icons/fa6";
import { IoBag } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";
import { useSelector } from "react-redux";
import PaymentComponent from "../_components/PaymentComponent";

export default function Page() {
  const prodects = useSelector(
    (store: storeTpe) => store.changeNoOFCartItem.allProdects
  );
  const prodectprice = useSelector(
    (store: storeTpe) => store.changeNoOFCartItem.totalPriceOfCart
  );
  const noOfcart = useSelector(
    (store: storeTpe) => store.changeNoOFCartItem.noOfcart
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-wrap items-center gap-1 text-sm mb-4">
            <Link href="/home" className="text-gray-500 hover:text-green-600 transition">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/cart" className="text-gray-500 hover:text-green-600 transition">Cart</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Checkout</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-green-100 rounded-xl p-2.5">
              <FaReceipt className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Complete Your Order</h1>
              <p className="text-gray-500 text-sm mt-1">Review your items and complete your purchase</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - بدون أي تعقيدات */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* على الشاشات الكبيرة: صف واحد (payment left, summary right) */}
        {/* على الموبايل: عمود واحد مع ترتيب (summary first, payment second) */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Order Summary - يظهر أولاً على الموبايل، ويبقى على اليمين في الديسكتوب */}
          <div className="lg:w-96 xl:w-104 lg:order-2">
            <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-5">
                <div className="flex items-center gap-2 text-white">
                  <IoBag className="w-5 h-5" />
                  <h3 className="font-semibold text-lg">Order Summary</h3>
                </div>
                <p className="text-green-100 text-sm mt-1">{noOfcart} item{noOfcart !== 1 ? 's' : ''}</p>
              </div>
              <div className="max-h-96 overflow-y-auto scrollbar-thin">
                <div className="p-5 space-y-4">
                  {prodects.map((item, index) => (
                    <div key={index} className="flex gap-3 group">
                      <div className="w-14 h-14 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                        <img
                          src={item.product?.imageCover}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          alt={item.product?.title}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">
                          {item.product?.category?.name}
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {item.count} × {item.price} EGP
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {item.count * item.price} EGP
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t border-gray-100 my-2"></div>
              <div className="p-5 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">{prodectprice} EGP</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="border-t border-gray-100 pt-3">
                  <div className="flex justify-between">
                    <span className="text-base font-bold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-green-600">
                      {prodectprice} <span className="text-sm font-normal text-gray-500">EGP</span>
                    </span>
                  </div>
                </div>
                <div className="bg-green-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-700">
                    Complete your order with{" "}
                    <span className="font-semibold text-green-700">Pay with cash</span> or{" "}
                    <span className="font-semibold text-green-700">Pay with card</span>
                  </p>
                </div>
                <div className="flex justify-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <MdOutlineSecurity className="text-green-600" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaTruck className="text-blue-500" />
                    <span>Fast Delivery</span>
                  </div>
                </div>
                <div className="text-center">
                  <Link href="/" className="text-sm text-green-600 hover:text-green-700 font-medium inline-flex items-center gap-1 transition">
                    ← Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Component - يظهر ثانياً على الموبايل، وعلى اليسار في الديسكتوب */}
          <div className="flex-1 lg:order-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/30">
                <h2 className="text-lg font-semibold text-gray-900">Payment Details</h2>
                <p className="text-sm text-gray-500">All fields are required</p>
              </div>
              <div className="p-6">
                <PaymentComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}