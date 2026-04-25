"use client"
import { storeTpe } from '@/types/types'
import Link from 'next/link'
import { FaLock, FaTag, FaTruck } from 'react-icons/fa6'
import { IoBag } from 'react-icons/io5'
import { MdOutlineSecurity } from 'react-icons/md'
import { useSelector } from 'react-redux'

export default function OrderSummery() {
    const totalPrice = useSelector((store: storeTpe) => store.changeNoOFCartItem.totalPriceOfCart)
    const totalCartItems = useSelector((store: storeTpe) => store.changeNoOFCartItem.noOfcart)

    return (
        <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            {/* Header */}
            <div className='bg-gradient-to-r from-[#16A34A] to-[#15803D] p-4'>
                <div className='flex gap-2 items-center text-white font-bold text-[18px]'>
                    <IoBag />
                    <p>Order Summary</p>
                </div>
                <p className='text-[13px] font-medium text-green-100 mt-0.5'>
                    {totalCartItems} item{totalCartItems !== 1 ? "s" : ""} in your cart
                </p>
            </div>

            {/* Body */}
            <div className='p-5 bg-white flex flex-col gap-5'>
                {/* Free Shipping Badge */}
                <div className='flex gap-3 items-center p-3 bg-[#F0FDF4] rounded-xl border border-[#DCFCE7]'>
                    <div className='p-2 rounded-full bg-[#DCFCE7] text-[#00A63E] shrink-0'>
                        <FaTruck size={16} />
                    </div>
                    <div>
                        <p className='font-semibold text-[14px] text-[#008236]'>Free Shipping!</p>
                        <p className='text-[12px] font-medium text-[#00A63E]'>You qualify for free delivery</p>
                    </div>
                </div>

                {/* Price Breakdown */}
                <div className="flex flex-col gap-3">
                    <div className='flex items-center justify-between'>
                        <p className='text-[#4A5565] font-medium text-[15px]'>Subtotal</p>
                        <p className='text-[#101828] font-semibold text-[15px]'>{totalPrice} EGP</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className='text-[#4A5565] font-medium text-[15px]'>Shipping</p>
                        <p className='text-[#00A63E] font-semibold text-[15px]'>FREE</p>
                    </div>
                    <div className='h-px bg-gray-100 my-1' />
                    <div className='flex items-center justify-between'>
                        <p className='text-[#101828] font-bold text-[16px]'>Total</p>
                        <p className='text-[#101828] font-bold text-[18px]'>{totalPrice} EGP</p>
                    </div>
                </div>

                {/* Promo Code */}
                <button className='border-dashed border-2 border-gray-200 cursor-pointer hover:text-[#14A34A] hover:border-[#14A34A] transition duration-200 rounded-xl flex w-full py-2.5 items-center text-[#6A7282] justify-center text-[13px] font-medium gap-2'>
                    <FaTag size={13} />
                    <span>Apply Promo Code</span>
                </button>

                {/* Checkout Button */}
                <Link
                    href={"/checkout"}
                    className='flex items-center justify-center gap-2 text-white text-[15px] font-semibold py-3 rounded-xl bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:opacity-95 transition shadow-sm'
                >
                    <FaLock size={14} />
                    Secure Checkout
                </Link>

                {/* Trust Badges */}
                <div className='flex gap-4 justify-center'>
                    <div className='flex gap-1 items-center'>
                        <MdOutlineSecurity className='text-[#00C950]' size={15} />
                        <p className='text-[#6A7282] text-[11px] font-medium'>Secure Payment</p>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <FaTruck className='text-[#2B7FFF]' size={13} />
                        <p className='text-[#6A7282] text-[11px] font-medium'>Fast Delivery</p>
                    </div>
                </div>

                {/* Continue Shopping */}
                <div className='text-center'>
                    <Link href={"/"} className='text-[#16A34A] text-[13px] font-medium hover:underline'>
                        ← Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    )
}