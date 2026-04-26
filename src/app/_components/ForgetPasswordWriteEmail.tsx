"use client"
import { sendEmailForgetPass } from '@/CallingAPIs/AllProdects'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { zodResolver } from '@hookform/resolvers/zod'
import { LucideLogIn } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as z from "zod"

interface ValueTT{
    email:string
}

interface ForgetPasswordWriteEmailProps {
    setResetEmail: Dispatch<SetStateAction<string>>
    setIshidden: Dispatch<SetStateAction<boolean>>
    setIshiddenCode: Dispatch<SetStateAction<boolean>>
}

export default function ForgetPasswordWriteEmail({setResetEmail , setIshidden ,setIshiddenCode}: ForgetPasswordWriteEmailProps) {
    const [isLoading, setisLoading] = useState(false)



    async function handeldata(values: ValueTT) {
        setisLoading(true)

        console.log("values", values);

        const sendmsg = await sendEmailForgetPass(values.email)

        if (sendmsg?.statusMsg=="success") {

            setResetEmail(values.email)

            setisLoading(false)

            setIshidden(false)
            

            setIshiddenCode(true)
            
            
        }else{
            setisLoading(false)

        }

        console.log("sendmsg",sendmsg);
        


    }

    const signupscema = z.object(
        {
            email: z.string().email("Enter your mail"),
        }
    )

    const form = useForm({
        defaultValues: {
            email: "",
        }, resolver: zodResolver(signupscema)
    })

    return (
        <>
            <form onSubmit={form.handleSubmit(handeldata)} action="" className='space-y-4'>
                <div className='mb-1'>
                    <h2 className='text-xl font-semibold text-[#1E2939] sm:text-2xl'>Forgot password</h2>
                    <p className='mt-1 text-sm text-[#6A7282]'>Enter your account email and we will send a reset code.</p>
                </div>


                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Email address*</FieldLabel>
                            <Input
                                className='
          mb-1 h-11 w-full rounded-lg border border-gray-200! bg-white px-4 text-sm shadow-sm transition-all 
          focus:outline-none focus:ring-2 focus:ring-transparent focus:border-green-400!'
                                type='email'
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter your email address"
                                autoComplete="off"
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />



                <Button disabled={isLoading} className={`h-11 w-full cursor-pointer bg-[#16A34A] py-2 text-[15px] font-semibold text-white hover:bg-[#15803D] disabled:opacity-80`}>
                    {isLoading ? <Spinner /> : ""}
                    <LucideLogIn
                        className="me-2" /> Verify email
                </Button>

            </form>




        </>
    )
}
