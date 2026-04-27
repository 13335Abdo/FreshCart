"use client"
import { storeTpe } from '@/types/types'
import Link from 'next/link'
import { FaCartShopping } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import CartProdectCell from '../_components/CartProdectCell'
import OrderSummery from '../_components/OrderSummery'
import { ShoppingBag } from 'lucide-react'

export default function page() {
    const noOfcart = useSelector((store: storeTpe) => store.changeNoOFCartItem.noOfcart)

    return (
        <div className='min-h-screen bg-[#F9FAFB] pb-12'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col gap-5'>

                {/* Breadcrumb */}
                <div className='flex gap-1 items-center'>
                    <Link className='text-[#6A7282] text-[14px] font-medium hover:text-[#16A34A] transition-colors' href={"/"}>Home</Link>
                    <p className='text-[#101828] font-medium text-[14px]'> / Shopping Cart</p>
                </div>

                {/* Header */}
                <div className='flex items-center gap-3'>
                    <div className='bg-[#16A34A] rounded-xl p-2.5'>
                        <FaCartShopping className='w-7 h-7 text-white' />
                    </div>
                    <div>
                        <p className='text-[#101828] text-2xl sm:text-[30px] font-bold'>Shopping Cart</p>
                        <p className='text-[#6A7282] text-[14px] font-medium'>
                            You have <span className='text-[#16A34A] font-semibold'>{noOfcart} item{noOfcart !== 1 ? "s" : ""}</span> in your cart
                        </p>
                    </div>
                </div>

                {/* Content */}
                {noOfcart === 0 ? (
                    /* ===== Empty State ===== */
                    <div className='flex flex-col items-center justify-center py-20 gap-6'>
                        <div className='w-28 h-28 rounded-full bg-gray-100 flex items-center justify-center'>
                            <ShoppingBag className='w-14 h-14 text-gray-300' strokeWidth={1.2} />
                        </div>
                        <div className='text-center flex flex-col gap-2'>
                            <h2 className='text-[#101828] text-2xl font-bold'>Your cart is empty</h2>
                            <p className='text-[#6A7282] text-[15px] font-medium max-w-xs'>
                                Looks like you haven't added anything to your cart yet. Start exploring our products!
                            </p>
                        </div>
                        <Link
                            href={"/"}
                            className='inline-flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold text-[15px] px-8 py-3 rounded-xl transition-colors shadow-sm'
                        >
                            Start Shopping →
                        </Link>
                    </div>
                ) : (
                    /* ===== Cart Items + Summary ===== */
                    <div className='flex flex-col lg:flex-row gap-5 items-start'>
                        {/* Cart Items */}
                        <div className='flex-1 flex flex-col gap-4 w-full'>
                            <CartProdectCell />
                        </div>

                        {/* Order Summary — sticky on desktop */}
                        <div className='w-full lg:w-85 lg:sticky lg:top-24'>
                            <OrderSummery />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}