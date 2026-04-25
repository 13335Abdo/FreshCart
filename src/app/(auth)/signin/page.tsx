import TitleSections from '@/app/_components/TitleSections'
import { FaFacebookF, FaStar, FaTruck } from 'react-icons/fa'
import { MdOutlineSecurity } from 'react-icons/md'
import imgelogo from "../../../assets/7be87acff8878d0ff905ef9dcd5bf7d2fd7a6c6f.png"

import FormComponent from '@/app/_components/FormComponent'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'

export default function page() {
    const w = "Welcome to "
    const f = "FreshCart"


    return (
        <>

            <div className='mx-auto my-8 flex w-11/12 flex-col gap-6 lg:my-14 lg:flex-row' >
                <div className='w-full lg:w-1/2'>
                    <TitleSections issignin={true} featured={w} products={f} />
                    <p className='mt-1 text-lg font-medium text-[#364153] sm:text-[20px]'>Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.</p>
                    <div className='my-5'>
                        <div className='flex gap-3 items-center'>
                            <div className='p-3 rounded-full bg-[#BBF7D0] text-[#16A34A]'>
                                <FaStar className='w-[19.341947555541992] h-[18.47823143005371]' />
                            </div>
                            <div>
                                <p className='text-[#364153] text-[18px] font-semibold'>Premium Quality</p>
                                <p className='text-[#4A5565] text-[16px] font-medium'>Premium quality products sourced from trusted suppliers.</p>
                            </div>
                        </div>
                        <div className='flex gap-3 items-center mt-3'>
                            <div className='p-3 rounded-full bg-[#BBF7D0] text-[#16A34A]'>
                                <FaTruck className='w-[19.341947555541992] h-[18.47823143005371]' />
                            </div>
                            <div>
                                <p className='text-[#364153] text-[18px] font-semibold'>Fast Delivery</p>
                                <p className='text-[#4A5565] text-[16px] font-medium'>Same-day delivery available in most areas</p>
                            </div>
                        </div>
                        <div className='flex gap-3 items-center mt-3'>
                            <div className='p-3 rounded-full bg-[#BBF7D0] text-[#16A34A]'>
                                <MdOutlineSecurity className='w-[19.341947555541992] h-[18.47823143005371]' />
                            </div>
                            <div>
                                <p className='text-[#364153] text-[18px] font-semibold'>Secure Shopping</p>
                                <p className='text-[#4A5565] text-[16px] font-medium'>Your data and payments are completely secure</p>
                            </div>
                        </div>
                    </div>


                    <div className='p-3'>
                        <div className='flex items-center gap-2'>
                            <div>
                                <img src={imgelogo?.src} className='w-12 h-12' alt="logo" />
                            </div>
                            <div>
                                <p className='text-[#364153] font-medium text-[16px]'>Sarah Johnson</p>
                                <div className='text-[#FFDF20] flex '>
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                </div>
                            </div>
                        </div>
                        <p className='text-[#4A5565] font-medium text-[16px] italic'>"FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend!"</p>

                    </div>






                </div>

                <div className='mb-4 w-full rounded-2xl border-x border-b p-3 shadow-xl lg:w-1/2'>
                    <div className='text-center py-3'>
                        <h3 className='text-[#364153] font-semibold text-[30px]'>Create Your Account</h3>
                        <p className='text-[#364153] font-medium text-[16px]'>Start your fresh journey with us today</p>
                    </div>

                    <div className='my-4 flex flex-col gap-2 sm:flex-row'>
                        <div className='flex w-full items-center gap-1.5 rounded-xl border border-[#D1D5DC] py-1 transition-all duration-150 hover:bg-gray-300 sm:w-1/2'>
                            <Button className='w-full cursor-pointer py-1.5 text-[16px] font-semibold text-[#101828]'>
                                <FcGoogle height={20} width={16} />
                                Google
                            </Button>

                        </div>
                        <div className='flex w-full items-center gap-1.5 rounded-xl border border-[#D1D5DC] py-1 transition-all duration-150 hover:bg-gray-300 sm:w-1/2'>
                            <Button className='w-full cursor-pointer py-1.5 text-[16px] font-semibold text-[#101828]'>
                                <FaFacebookF color='blue' height={20} width={16} />
                                Facebook
                            </Button>

                        </div>


                    </div>

                    <div className='text-center mb-4'>
                        <p className="relative text-center text-gray-500 before:absolute before:left-0 before:top-1/2 before:h-px before:w-[40%] before:-translate-y-1/2 before:bg-gray-300 before:content-[''] after:absolute after:right-0 after:top-1/2 after:h-px after:w-[40%] after:-translate-y-1/2 after:bg-gray-300 after:content-[''] sm:before:w-[45%] sm:after:w-[45%]">
                        <span className="relative  px-4 z-10">or</span>
                    </p>
                    </div>

                    <div>
                        <FormComponent />
                    </div>

                    

                    <div className='text-center my-6 '>
                        <p className='font-medium text-[16px] text-[#364153]'>Already have an account? <Link href={"/signup"} className='text-[#15803D] ms-2'>  Sign In</Link></p>
                    </div>


                </div>








            </div>




        </>
    )
}
