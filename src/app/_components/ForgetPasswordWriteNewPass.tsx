"use client"
import { ResetPassword } from '@/CallingAPIs/AllProdects'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2, LockKeyhole, LucideLogIn, ShieldCheck } from 'lucide-react'
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

        const sendmsg = await ResetPassword(resetEmail , values.rePassword)

        if (sendmsg) {

            setisLoading(false)

            router.push("/login")

            toast.success("password updated",{richColors:true , position:"top-center"})


        } else {
            setisLoading(false)

            toast.error("unexpected erroe",{richColors:true , position:"top-center"})

        }

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
            <form onSubmit={form.handleSubmit(handeldata)} action="" className='mx-auto max-w-xl space-y-5 rounded-3xl border border-emerald-100 bg-white/95 p-5 shadow-xl shadow-emerald-100/40 sm:p-7'>
                <div className='rounded-2xl bg-linear-to-br from-emerald-50 via-white to-green-50 p-4 sm:p-5'>
                    <div className='mb-3 flex items-center gap-3'>
                        <div className='rounded-xl bg-emerald-600 p-2 text-white shadow-md'>
                            <LockKeyhole className='h-5 w-5' />
                        </div>
                        <div>
                            <h2 className='text-xl font-bold text-slate-800 sm:text-2xl'>Create new password</h2>
                            <p className='mt-1 text-sm text-slate-500'>Secure your account with a strong new password.</p>
                        </div>
                    </div>

                    <div className='grid gap-2 text-xs text-slate-600 sm:grid-cols-2'>
                        <p className='flex items-center gap-2 rounded-lg border border-emerald-100 bg-white px-3 py-2'>
                            <ShieldCheck className='h-4 w-4 text-emerald-600' />
                            At least 8 characters
                        </p>
                        <p className='flex items-center gap-2 rounded-lg border border-emerald-100 bg-white px-3 py-2'>
                            <CheckCircle2 className='h-4 w-4 text-emerald-600' />
                            Upper/lowercase, number and symbol
                        </p>
                    </div>
                </div>


                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>New Password*</FieldLabel>
                            <Input
                                className='mb-1 h-11 w-full rounded-xl border border-gray-200! bg-white px-4 text-sm shadow-sm transition-all focus:border-emerald-400! focus:shadow focus:shadow-emerald-100'
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
                                className='mb-1 h-11 w-full rounded-xl border border-gray-200! bg-white px-4 text-sm shadow-sm transition-all focus:border-emerald-400! focus:shadow focus:shadow-emerald-100'
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
                        className="me-2" /> Update Password
                </Button>

                <p className='text-center text-xs text-slate-500'>
                    After updating, you will be redirected to login.
                </p>

            </form>




        </>
    )
}
