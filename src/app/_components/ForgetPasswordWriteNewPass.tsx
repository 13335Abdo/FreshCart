"use client"
import { ResetPassword } from '@/CallingAPIs/AllProdects'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { zodResolver } from '@hookform/resolvers/zod'
import { LucideLogIn } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from "zod"

interface Valuett{
    rePassword:string,
    password:string

}



export default function ForgetPasswordWriteNewPass({resetEmail} : {resetEmail:string}) {
    const router = useRouter()
    const [isLoading, setisLoading] = useState(false)



    async function handeldata(values: Valuett) {

        setisLoading(true)

        console.log("values", values);

        const sendmsg = await ResetPassword(resetEmail , values.rePassword)

        if (sendmsg) {

            setisLoading(false)

            router.push("/login")

            toast.success("password updated",{richColors:true , position:"top-center"})


        } else {
            setisLoading(false)

            toast.error("unexpected erroe",{richColors:true , position:"top-center"})

        }

        console.log("sendmsg", sendmsg);




    }

    const signupscema = z.object(
        {
            password: z.string()
                .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "Password must include at least one uppercase, one lowercase, one digit, and one special character.")
                .min(8, "Password must be at least 8 characters long"),
            rePassword: z.string()
                .min(8, "RePassword must be at least 8 characters long"),
        }
    )

    const form = useForm({
        defaultValues: {
            password: "",
            rePassword: "",
        }, resolver: zodResolver(signupscema)
    })

    return (
        <>
            <form onSubmit={form.handleSubmit(handeldata)} action="" className='space-y-4'>
                <div className='mb-1'>
                    <h2 className='text-xl font-semibold text-[#1E2939] sm:text-2xl'>Create new password</h2>
                    <p className='mt-1 text-sm text-[#6A7282]'>Choose a strong password you have not used before.</p>
                </div>


                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>New Password*</FieldLabel>
                            <Input
                                className='
          mb-1 h-11 w-full rounded-lg border border-gray-200! bg-white px-4 text-sm shadow-sm transition-all 
          focus:outline-none focus:ring-2 focus:ring-transparent focus:border-green-400!'
                                type='password'
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter your new password"
                                autoComplete="off"
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="rePassword"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Repeat new password*</FieldLabel>
                            <Input
                                className='
          mb-1 h-11 w-full rounded-lg border border-gray-200! bg-white px-4 text-sm shadow-sm transition-all 
          focus:outline-none focus:ring-2 focus:ring-transparent focus:border-green-400!'
                                type='password'
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Repeat your new password"
                                autoComplete="off"
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />



                <Button disabled={isLoading} className={`h-11 w-full cursor-pointer bg-[#16A34A] py-2 text-[15px] font-semibold text-white hover:bg-[#15803D] disabled:opacity-80`}>
                    {isLoading ? <Spinner /> : ""}
                    <LucideLogIn
                        className="me-2" /> Update password
                </Button>

            </form>




        </>
    )
}
