"use client"
import { storeTpe } from '@/types/types'
import Link from 'next/link'
import { FaLock, FaTag, FaTruck } from 'react-icons/fa6'
import { IoBag } from 'react-icons/io5'
import { MdOutlineSecurity } from 'react-icons/md'
import { useSelector } from 'react-redux'

export default function OrderSummery() {
    const totalPrice =  useSelector((store:storeTpe)=>store.changeNoOFCartItem.totalPriceOfCart)
    
    
    const totalCartItems =  useSelector((store:storeTpe)=>store.changeNoOFCartItem.noOfcart)
    

    return (
        <>

            <div>
                <div className='bg-linear-to-r from-[#16A34A] to-[#15803D] p-3 rounded-t-2xl'>
                    <div className='text-[18px] font-bold  flex gap-2 items-center text-white'>
                        <IoBag />
                        <p>Order Summary</p>
                    </div>
                    <p className='text-[14px] font-medium text-white' >{totalCartItems} items in your cart</p>
                </div>
                <div className='p-4 bg-white flex flex-col gap-6 rounded-b-2xl'>
                    <div className='flex gap-2 items-center p-3 bg-[#F0FDF4] rounded-md'>
                        <div className='p-2 rounded-full bg-[#DCFCE7] text-[#00A63E]'>
                            <FaTruck width={18} height={15} />
                        </div>
                        <div>
                            <p className='font-medium text-[16px] text-[#008236]'>Free Shipping!</p>
                            <p className='text-[14px] font-medium text-[#00A63E]'>You qualify for free delivery</p>
                        </div>
                    </div>

                    <div className='flex items-center justify-between'>
                        <p className='text-[#4A5565] font-medium text-[16px]'>Subtotal</p>
                        <p className='text-[#101828] font-medium text-[16px]'>{totalPrice} EGP</p>
                    </div>

                    <div className='flex items-center justify-between'>
                        <p className='text-[#4A5565] font-medium text-[16px]'>Shipping</p>
                        <p className='text-[#00A63E] font-medium text-[16px]'>FREE</p>
                    </div>

                    <div className='h-px bg-gray-300'></div>


                    <button className='border-dotted border-2 cursor-pointer hover:text-[#14A34A] hover:border-[#14A34A] transition duration-200 rounded-xl flex w-full! py-2 items-center text-[#4A5565] justify-center text-[14px] text-center font-medium gap-2'> <FaTag /> <p>Apply Promo Code</p></button>

                    <Link href={"/checkout"} className='p-2.5! text-white justify-center text-[16px] font-semibold flex shadow-md cursor-pointer rounded-xl bg-linear-to-r from-[#16A34A] to-[#15803D]  w-full! py-2 items-center gap-2'><FaLock /> Secure Checkout</Link>


                    <div className='flex gap-3 justify-center'>
                        <div className='flex gap-1'>
                            <MdOutlineSecurity className='text-[#00C950]' />

                            <p className='text-[#6A7282] text-[12px] font-medium'>Secure Payment</p>
                        </div>
                        <div className='flex gap-1 items-center' >
                            <FaTruck className='text-[#2B7FFF]' />
                            <p className='text-[#6A7282] text-[12px] font-medium'>Fast Delivery</p>
                        </div>
                    </div>

                    <div className='text-[#16A34A] text-[14px] font-medium text-center'>
                        <Link href={"/"}>← Continue Shopping</Link>
                    </div>


                </div>

            </div>





        </>
    )
}
