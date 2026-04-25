"use client";
import { allProdects, AllProductsInCart } from "@/types/types";
import { useState } from "react";
import {
  FaBoxOpen,
  FaCalendarAlt,
  FaChevronDown,
  FaChevronUp,
  FaClock,
  FaEye,
  FaEyeSlash,
  FaReceipt,
  FaShippingFast,
  FaTruck
} from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";

export default function UserOrders({ item }: { item: allProdects }) {

  const [isVisible, setIsVisible] = useState(true);

  const toggleDetails = () => setIsVisible(!isVisible);

  // حساب إجمالي السعر مع الشحن

  const totalWithShipping = (item?.totalOrderPrice || 0)
  const statusSteps = [
    { label: "Order Placed", icon: FaReceipt, completed: true },
    { label: "Processing", icon: FaClock, completed: item?.isPaid ? true : false },
    { label: "Shipped", icon: FaShippingFast, completed: item?.isPaid ? true : false },
    { label: "Delivered", icon: MdDeliveryDining, completed: item?.isPaid },
  ];

  return (
    <div className="max-w-5xl mx-auto my-10 px-4 md:px-6">
      {/* Card with modern glass morphism effect */}
      <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20 transition-all duration-500 hover:shadow-green-500/20 hover:scale-[1.01] group">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-linear-to-br from-green-50 via-white to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        {/* Header Section with modern design */}
        <div className="relative z-10 bg-linear-to-br from-green-800 via-green-700 to-green-600 px-6 py-6 md:px-8">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-sm shadow-lg">
                <FaBoxOpen className="text-2xl text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-white font-bold text-xl md:text-2xl tracking-tight">
                    #{item?.id}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
                      item?.isPaid
                        ? "bg-green-400 text-green-900"
                        : "bg-amber-400 text-amber-900"
                    }`}
                  >
                    {item?.isPaid ? "✓ Paid" : "⏳ Pending"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-green-100 text-sm mt-1.5">
                  <FaCalendarAlt className="text-green-200" />
                  <span>{new Date(item?.createdAt).toLocaleDateString("en-GB")}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-black text-white tracking-tighter">
                {totalWithShipping.toLocaleString()}
                <span className="text-lg font-semibold ml-1 text-green-200">EGP</span>
              </div>
              <div className="text-green-100 text-sm">Total Amount</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 p-6 md:p-8">
          {/* Order Status Timeline */}
          <div className="mb-8 bg-gray-50/80 rounded-2xl p-5 shadow-inner">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <FaTruck className="text-green-600" /> Order Status
            </h3>
            <div className="flex flex-wrap justify-between items-center gap-2">
              {statusSteps.map((step, idx) => (
                <div key={step.label} className="flex flex-col items-center flex-1 min-w-17.5">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      step.completed
                        ? "bg-green-600 text-white shadow-lg shadow-green-200"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    <step.icon className="text-lg" />
                  </div>
                  <div className="text-[11px] font-medium mt-2 text-center text-gray-600">
                    {step.label}
                  </div>
                  {idx < statusSteps.length - 1 && (
                    <div className="hidden md:block w-full h-0.5 bg-gray-200 -mt-5 ml-12 -z-10" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Products Section - Toggle */}
          <div className="mb-8">
            <button
              onClick={toggleDetails}
              className="flex items-center justify-between w-full py-4 px-5 bg-gray-50 hover:bg-green-50 rounded-2xl transition-all duration-300 group shadow-sm"
            >
              <span className="flex items-center gap-3 font-bold text-gray-700 group-hover:text-green-700">
                <FaTruck className="text-green-600 text-xl" />
                Order Items ({item?.cartItems?.length})
              </span>
              {isVisible ? (
                <FaChevronUp className="text-green-600 animate-pulse" />
              ) : (
                <FaChevronDown className="text-green-600 animate-pulse" />
              )}
            </button>

            {isVisible && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                {item?.cartItems?.map((product : AllProductsInCart , idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl border border-green-100 shadow hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  >
                    <img
                      src={product?.product?.imageCover}
                      alt={product?.product?.title}
                      className="w-20 h-20 rounded-xl object-cover ring-2 ring-green-100"
                    />
                    <div className="flex-1">
                      <p className="font-bold text-gray-800 line-clamp-1">
                        {product?.product?.title}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-500">Qty: {product?.count}</span>
                        <span className="font-black text-green-700">
                          {(product?.price * product?.count).toLocaleString()} EGP
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">
                        {product?.price} EGP / each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Delivery Address + Summary in Grid */}
          <div className="w-full! mb-8">

            {/* Summary Card */}
            <div className="bg-[#60A5FA] rounded-2xl p-5 w-full! border-2 border-green-100 shadow-md">
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Tax</span>
                  <span className="font-medium">{item?.taxPrice?.toLocaleString()} EGP</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Shipping</span>
                  <span className="text-gray-800  font-bold">{item?.shippingPrice?.toLocaleString()} EGP</span>
                </div>
                <div className="border-t border-green-100 my-2"></div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-800 text-lg">Total</span>
                  <div className="text-right">
                    <span className="font-black text-2xl text-black">
                      {totalWithShipping.toLocaleString()}
                    </span>
                    <span className="font-semibold text-black ml-1">EGP</span>
                  </div>
                </div>
              </div>
              
            </div>


          </div>

          {/* Bottom Toggle Button with animation */}
          <div className="flex justify-end">
            <button
              onClick={toggleDetails}
              className="flex items-center gap-2 text-sm font-semibold text-green-700 bg-green-50 hover:bg-green-100 px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow"
            >
              {isVisible ? <FaEyeSlash /> : <FaEye />}
              {isVisible ? "Hide Items" : "Show Items"}
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-0 w-32 h-32 bg-green-200 rounded-full filter blur-3xl opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-200 rounded-full filter blur-3xl opacity-20 pointer-events-none" />
      </div>
    </div>
  );
}