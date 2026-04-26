"use client"
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { valuesOFLoginin } from '@/types/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { LucideLogIn } from 'lucide-react'
import { signIn } from "next-auth/react"
import Link from 'next/link'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as z from "zod"



export default function FormLoginComponent() {
  const [isLoading, setisLoading] = useState(false)


 // const rout = useRouter()

  async function handeldata(values: valuesOFLoginin) {

    setisLoading(true)

    signIn("credentials", { ...values, callbackUrl: "/", redirect: true })

    //   const final = await Login(values);
    //   if (final) {
    //     setisLoading(false)
    //     rout.push("/")

    //   } else {
    //     setisLoading(false)
    //   }


  }

  const signupscema = z.object(
    {
      email: z.email("Enter your mail"),
      password: z.string()
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, "Password must include at least one uppercase, one lowercase, one digit, and one special character.")
        .min(8, "Password must be at least 8 characters long"),
    }
  )

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    }, resolver: zodResolver(signupscema)
  })

  return (
    <>
      <form onSubmit={form.handleSubmit(handeldata)} action="">


        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email*</FieldLabel>
              <Input
                className='
          p-2! mb-3 w-full rounded-md border bg-white px-4 py-2 text-sm shadow-sm transition-all 
          focus:outline-none focus:ring-2 h-10.5 focus:ring-transparent border-gray-200! focus:border-green-400!'
                type='text'
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Enter your email"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel className='flex justify-between items-center' htmlFor={field.name}>Password* <Link className='text-[#16A34A]' href={"/forget-password"}>Forget paswword?</Link></FieldLabel>
              <Input
                className='
          p-2! mb-3 w-full rounded-md border bg-white px-4 py-2 text-sm shadow-sm transition-all 
          focus:outline-none focus:ring-2 h-10.5 focus:ring-transparent border-gray-200! focus:border-green-400!'
                type='password'
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="enter password here"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />


        <Button disabled={isLoading} className={`w-full disabled:#15803D bg-[#16A34A] font-semibold text-white text-[16px] py-5 hover:bg-[#15803D] cursor-pointer`}>
          {isLoading ? <Spinner /> : ""}
          <LucideLogIn
            className="me-2" /> Login
        </Button>

      </form>




    </>
  )
}
