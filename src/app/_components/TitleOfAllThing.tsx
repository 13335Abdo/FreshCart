
import Link from 'next/link'
import { FaTags } from 'react-icons/fa6'

export default function TitleOfAllThing() {



    return (
        <>
            <div className='bg-linear-to-r from-[#7F22FE] to-[#C27AFF] w-full h-60 flex justify-center px-10 flex-col gap-5'>
                <div className='flex  gap-1'>
                    <Link className='text-white opacity-50 hover:opacity-100 text-[14px] font-medium' href={"/home"}>Home </Link>
                    <p className='text-white font-medium text-[14px]'> / Checkout</p>
                </div>
                <div className='flex items-center gap-3'>
                    <div className='text-white w-16 h-16 flex items-center justify-center rounded-xl bg-[#C27AFF]'>

                        <FaTags className='w-[31.52783203125px] h-[24.84450912475586px]' />

                    </div>
                    <div>
                        <p className='text-[16px] font-medium text-white'>Top Brands</p>
                        <p className='text-[16px] font-medium opacity-50 text-white'>Shop from your favorite brands</p>

                    </div>
                </div>
            </div>





        </>
    )
}
