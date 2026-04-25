
import logo from "../../assets/a.shrink-0.png"
import { IoIosMail, IoMdCall } from 'react-icons/io'
import { FaLocationDot } from 'react-icons/fa6'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { CiCreditCard1 } from 'react-icons/ci'
import Design from './Design'

export default function Footer() {




    return (
        <>
        <Design />
            <div className='grid gap-8 bg-[#101828] px-6 py-7 md:grid-cols-2 lg:grid-cols-6 lg:px-10'>

                <div className='py-5 md:col-span-2 lg:col-span-2'>
                    <img src={logo.src} alt="logo" className='bg-white p-1.5 rounded-xl' />


                    <p className='my-8 text-gray-500'>FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.</p>

                    <div className='flex gap-3 items-center my-3'>
                        <div className='text-green-600'>
                            <IoMdCall />

                        </div>

                        <p className='text-gray-500 hover:text-green-600 cursor-pointer'>+1 (800) 123-4567</p>
                    </div>
                    <div className='flex gap-3 items-center my-3'>
                        <div className='text-green-600'>
                            <IoIosMail />


                        </div>

                        <p className='text-gray-500 hover:text-green-600 cursor-pointer'>
                            support@freshcart.com
                        </p>
                    </div>
                    <div className='flex gap-3 items-center my-3'>
                        <div className='text-green-600'>
                            <FaLocationDot />

                        </div>

                        <p className='text-gray-500'>
                            123 Commerce Street, New York, NY 10001
                        </p>
                    </div>

                    <div className='flex gap-5 text-xl text-gray-500 items-center mt-10'>
                        <div className='p-3 bg-[#1E2939] rounded-4xl hover:bg-green-500 hover:text-white transition-all cursor-pointer duration-150'>
                            <FaTwitter />

                        </div>
                        <div className='p-3 bg-[#1E2939] rounded-4xl hover:bg-green-500 hover:text-white cursor-pointer duration-150'>

                            <FaInstagram />
                        </div>
                        <div className='p-3 bg-[#1E2939] rounded-4xl hover:bg-green-500 hover:text-white cursor-pointer duration-150'>

                            <FaYoutube />
                        </div>
                        <div className='p-3 bg-[#1E2939] rounded-4xl hover:bg-green-500 hover:text-white cursor-pointer duration-150'>

                            <FaFacebook />
                        </div>

                    </div>

                </div>
                <div className='grid font-semibold text-sm text-gray-500 lg:col-span-1'>

                    <h3 className='font-bold text-white text-xl'>shop</h3>
                    <div>
                        <p className='hover:text-green-600 cursor-pointer'>All Products</p>
                    </div>

                    <div>
                        <p className='hover:text-green-600 cursor-pointer'>Categories</p>
                    </div>

                    <div>
                        <p className='hover:text-green-600 cursor-pointer'>Brands</p>
                    </div>
                    <div>
                        <p className='hover:text-green-600 cursor-pointer'>Electronics</p>

                    </div>
                    <div>
                        <p className='hover:text-green-600 cursor-pointer'>Men's Fashion</p>

                    </div>

                    <div>
                        <p className='hover:text-green-600 cursor-pointer'>Women's Fashion</p>

                    </div>

                </div>
                <div className='grid font-semibold text-sm text-gray-500 lg:col-span-1'>

                    <h3 className='font-bold text-white text-xl'>Account</h3>

                    <div>
                        <p className='hover:text-green-600 cursor-pointer'>My Account</p>
                    </div>

                    <div>
                        <p className='hover:text-green-600 cursor-pointer'>Order History</p>
                    </div>

                    <div>
                        <p className='hover:text-green-600 cursor-pointer'>Wishlist</p>
                    </div>
                    <div>
                        <p className='hover:text-green-600 cursor-pointer'>Shopping Cart</p>

                    </div>
                    <div>
                        <p className='hover:text-green-600 cursor-pointer'>Sign In
                        </p>

                    </div>

                    <div>
                        <p className='hover:text-green-600 cursor-pointer'>Create Account</p>

                    </div>

                </div>
                <div className='grid font-semibold text-sm text-gray-500 lg:col-span-1'>
                    <h3 className='font-bold text-white text-xl'>Support</h3>

                    <div>
                        <p className='hover:text-green-600 cursor-pointer'>Contact Us</p>
                    </div>

                    <div>
                        <p className='hover:text-green-600 cursor-pointer'>Help Center</p>
                    </div>

                    <div>
                        <p className='hover:text-green-600 cursor-pointer'>Shipping Info</p>
                    </div>
                    <div>
                        <p className='hover:text-green-600 cursor-pointer'>Returns & Refunds</p>

                    </div>
                    <div>
                        <p className='hover:text-green-600 cursor-pointer'>Track Order</p>

                    </div>
                </div>
                <div className='grid font-semibold text-sm text-gray-500 lg:col-span-1'>
                    <h3 className='font-bold text-white text-xl'>Legal</h3>

                    <div>
                        <p className='hover:text-green-600 cursor-pointer'>Privacy Policy</p>
                    </div>

                    <div>
                        <p className='hover:text-green-600 cursor-pointer'>Terms of Service</p>
                    </div>

                    <div>
                        <p className='hover:text-green-600 cursor-pointer'>Cookie Policy</p>
                    </div>

                </div>
            </div>

            <div className='h-px bg-gray-500'></div>

            <div className='flex flex-col gap-3 bg-[#101828] px-6 py-5 md:flex-row md:items-center md:justify-between lg:px-10'>
                <p className='text-gray-500 font-semibold'>© 2026 FreshCart. All rights reserved.</p>
                <div className='flex flex-wrap items-center gap-2 text-gray-500 font-semibold'>
                    <CiCreditCard1 />
                    <span>Visa</span>
                    <CiCreditCard1 />
                    <span>Mastercard</span>
                    <CiCreditCard1 />
                    <span>PayPal
                    </span>

                </div>
            </div>








        </>
    )
}
