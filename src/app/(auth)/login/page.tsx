
import FormLoginComponent from '@/app/_components/FormLoginComponent'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { BiSupport } from 'react-icons/bi'
import { FaFacebookF, FaTruck } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { RiSecurePaymentLine } from 'react-icons/ri'
import imagelogoo from "../../../assets/381609d78c4d97f9277837bc4bdf05035b888463.png"

export default function page() {
  return (
    <>
      <div className='mx-auto flex w-11/12 flex-col gap-6 py-6 lg:w-10/12 lg:flex-row lg:items-center'>
        <div className='w-full text-center lg:w-1/2'>
          <img src={imagelogoo.src} className='mx-auto h-auto w-full max-w-xl rounded-2xl shadow-xl' alt="fruit cart img" />
          <h3 className='mt-5 text-2xl font-bold text-[#1E2939] sm:text-3xl'>FreshCart - Your One-Stop Shop for Fresh
            Products</h3>
          <p className='mt-3 text-base font-medium text-[#4A5565] sm:text-[18px]'>Join thousands of happy customers who trust FreshCart for their dailygrocery needs</p>
          <div className='mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3'>
            <div className='flex items-center gap-2 justify-center sm:justify-start'>
              <FaTruck className='text-[#16A34A]' />
              <p className='text-[#6A7282] font-medium text-[14px]'>Free Delivery</p>
            </div>
            <div className='flex items-center gap-2 justify-center sm:justify-start'>
              <RiSecurePaymentLine className='text-[#16A34A]' />
              <p className='text-[#6A7282] font-medium text-[14px]'>
                Secure Payment
              </p>
            </div>
            <div className='flex items-center gap-2 justify-center sm:justify-start'>
              <BiSupport className='text-[#16A34A]' />
              <p className='text-[#6A7282] font-medium text-[14px]'>
                24/7 Support
              </p>
            </div>


          </div>

        </div>




        <div className='my-2 w-full rounded-2xl border-x border-b p-4 shadow-xl sm:p-5 lg:my-10 lg:w-1/2'>

          <div className='text-center'>
            <h2 className='text-2xl font-bold text-[#1E2939] sm:text-3xl'><span className='text-[#16A34A]'>Fresh</span>Cart</h2>
            <p className='mt-3 text-xl font-bold text-[#1E2939] sm:text-2xl'>Welcome Back!</p>
            <p className='font-medium text-[#4A5565] text-[16px] mt-2'>Sign in to continue your fresh shopping experience</p>
            <div className='my-8'>
              <div className='mt-3 py-2 rounded-2xl hover:border-green-300 transition-all duration-300 hover:bg-[#F0FDF4] border-2 cursor-pointer'>
                <Button className='w-full cursor-pointer py-1.5 text-[16px] font-semibold text-[#101828]'>
                  <FcGoogle height={20} width={16} />
                  Google
                </Button>

              </div>
              <div className='mt-3 py-2 rounded-2xl hover:border-green-300 transition-all duration-300 hover:bg-[#F0FDF4] border-2 cursor-pointer'>
                <Button className='w-full cursor-pointer py-1.5 text-[16px] font-semibold text-[#101828]'>
                  <FaFacebookF color='blue' height={20} width={16} />
                  Facebook
                </Button>

              </div>

            </div>
            <div className='text-center mb-4'>
              <p className="relative text-center text-gray-500 before:absolute before:left-0 before:top-1/2 before:h-px before:w-[18%] before:-translate-y-1/2 before:bg-gray-300 before:content-[''] after:absolute after:right-0 after:top-1/2 after:h-px after:w-[18%] after:-translate-y-1/2 after:bg-gray-300 after:content-[''] sm:before:w-[26%] sm:after:w-[26%]">
                <span className="relative  px-4 z-10">OR CONTINUE WITH EMAIL</span>
              </p>
            </div>
          </div>

          <div>
            <FormLoginComponent />
          </div>
          <div>
            <div className='mx-auto mt-3 h-0.5 w-[90%] bg-[#F3F4F6]'></div>


            <div className='my-5 text-center'>
              <p className='text-[16px] font-semibold text-[#4A5565]' >New to FreshCart? <Link className='text-[#16A34A]' href={"/signup"}>Create an account</Link></p>

            </div>


          </div>





        </div>
      </div>

    </>
  )
}
