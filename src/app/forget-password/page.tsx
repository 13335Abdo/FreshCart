"use client"
import Link from 'next/link'
import { BiSupport } from 'react-icons/bi'
import { FaTruck } from 'react-icons/fa'
import { RiSecurePaymentLine } from 'react-icons/ri'
import imagelogoo from "../../assets/Screenshot 2026-04-26 110529.png"
import ForgetPasswordWriteEmail from '../_components/ForgetPasswordWriteEmail'
import ForgetPasswordWriteCode from '../_components/ForgetPasswordWriteCode'
import ForgetPasswordWriteNewPass from '../_components/ForgetPasswordWriteNewPass'
import { useState } from 'react'
import { sendEmailForgetPass } from '@/CallingAPIs/AllProdects'
import { toast } from 'sonner'

export default function page() {

  

  const [resetEmail, setResetEmail] = useState("")

  const [Ishidden, setIshidden] = useState(true)


  const [IshiddenCode, setIshiddenCode] = useState(false)


  const [Ishiddenpass, setIshiddenpass] = useState(false)


  async function handleResendCode(){

     const sendmsg = await sendEmailForgetPass(resetEmail)
    
            if (sendmsg?.statusMsg=="success") {

              toast.success("code Sent",{richColors:true , position:"top-center"})

            }else{
                
    
            }



    
  }

  return (
    <>
      <div className='mx-auto flex w-11/12 flex-col gap-6 py-6 lg:w-10/12 lg:flex-row lg:items-start'>
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






{Ishidden &&

        <div className='my-2 w-full max-w-xl rounded-2xl border-x border-b p-4 shadow-xl sm:p-6 lg:my-10 lg:w-1/2'>

          <div>
            <ForgetPasswordWriteEmail setIshiddenCode={setIshiddenCode} setIshidden={setIshidden} setResetEmail={setResetEmail} />
          </div>
          <div>
            <div className='mx-auto mt-3 h-0.5 w-[90%] bg-[#F3F4F6]'></div>


            <div className='my-5 text-center'>
              <p className='text-[16px] font-semibold text-[#4A5565]' >i remembered my password? <Link className='text-[#16A34A]' href={"/login"}>go to login page</Link></p>

            </div>

          </div>

        </div>
 }

{IshiddenCode&&

        <div className='my-2 w-full max-w-xl rounded-2xl border-x border-b p-4 shadow-xl sm:p-6 lg:my-10 lg:w-1/2'>

         

          <div>
            <ForgetPasswordWriteCode setIshiddenCode={setIshiddenCode} setIshiddenpass={setIshiddenpass} />
          </div>
          <div>
            <div className='mx-auto mt-3 h-0.5 w-[90%] bg-[#F3F4F6]'></div>


            <div className='my-5 text-center'>
              
              <p className='text-[16px] font-semibold text-[#4A5565]' >i don't have code in my email. <button type="button" onClick={handleResendCode} className='text-[#16A34A] cursor-pointer'>resend</button></p>

            </div>


          </div>





        </div>

}


{Ishiddenpass&&



        <div className='my-2 w-full max-w-xl rounded-2xl border-x border-b p-4 shadow-xl sm:p-6 lg:my-10 lg:w-1/2'>

         

          <div>
            <ForgetPasswordWriteNewPass resetEmail={resetEmail} />
          </div>
          <div>
            <div className='mx-auto mt-3 h-0.5 w-[90%] bg-[#F3F4F6]'></div>


            <div className='my-5 text-center'>
              <p className='text-[16px] font-semibold text-[#4A5565]' >have a nice experiance </p>

            </div>


          </div>





        </div>


}








      </div>

    </>
  )
}
