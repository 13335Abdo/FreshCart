"use client"
import { storeTpe } from '@/types/types'
import Link from 'next/link'
import { FaCartShopping } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import CartProdectCell from '../_components/CartProdectCell'
import OrderSummery from '../_components/OrderSummery'

export default function page() {

const noOfcart = useSelector((store:storeTpe) => store.changeNoOFCartItem.noOfcart)

    return (
        <>
            <div className='bg-[#F9FAFB] flex flex-col gap-4'>
                <div className='mx-15 m-auto flex flex-col gap-4'>
                    <div className='flex  gap-1'>
                        <Link className='text-[#6A7282] text-[14px] font-medium hover:text-[#16A34A]' href={"/home"}>Home</Link>
                        <p className='text-[#101828] font-medium text-[14px]'> / Shopping Cart</p>
                    </div>
                    <div className='flex items-center gap-2'>

                        <div className='bg-[#16A34A] rounded-xl p-2'>
                            <FaCartShopping className='w-[33.36680221557617] h-[30.9375] text-white' />
                        </div>

                        <p className='text-[#101828] text-[30px] font-bold'>Shopping Cart</p>
                    </div>

                    <div>
                        <p className='text-[#6A7282] text-[16px] font-medium'>You have <span className='text-[#16A34A]'>{noOfcart} item</span> in your cart</p>
                    </div>
                </div>

                <div className='flex gap-3'>

                    <div className='w-[850] flex flex-col gap-5 rounded-2xl ms-15 mb-10'>
                        <CartProdectCell />

                    </div>
                    <div className='w-90 sticky inset-0 h-fit'>
                        <OrderSummery />
                    </div>

                </div>

            </div>



        </>
    )
}
