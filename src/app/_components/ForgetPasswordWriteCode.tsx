"use client"
import { CodeOfForgetPass } from '@/CallingAPIs/AllProdects'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { zodResolver } from '@hookform/resolvers/zod'
import { LucideLogIn } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as z from "zod"

interface Valuett {
  code: string
}

interface ForgetPasswordWriteCodeProps {
  setIshiddenpass: Dispatch<SetStateAction<boolean>>
  setIshiddenCode: Dispatch<SetStateAction<boolean>>
}


export default function ForgetPasswordWriteCode({ setIshiddenpass, setIshiddenCode }: ForgetPasswordWriteCodeProps) {



  const [isLoading, setisLoading] = useState(false)



  async function handeldata(values: Valuett) {



    setisLoading(true)

    const sendmsg = await CodeOfForgetPass(values.code)

    if (sendmsg?.status == "Success") {

      setisLoading(false)

      setIshiddenpass(true)

      setIshiddenCode(false)


    } else {
      setisLoading(false)

    }
  }

  const signupscema = z.object(
    {
      code: z.string().length(6, "Code must be 6 digits"),
    }
  )

  const form = useForm({
    defaultValues: {
      code: "",
    }, resolver: zodResolver(signupscema)
  })

  return (
    <>
      <form onSubmit={form.handleSubmit(handeldata)} action="" className='space-y-4'>
        <div className='mb-1'>
          <h2 className='text-xl font-semibold text-[#1E2939] sm:text-2xl'>Verify reset code</h2>
          <p className='mt-1 text-sm text-[#6A7282]'>Check your email inbox and enter the 6-digit code.</p>
        </div>


        <Controller
          name="code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Reset code*</FieldLabel>
              <Input
                className='
          mb-1 h-11 w-full rounded-lg border border-gray-200! bg-white px-4 text-sm shadow-sm transition-all
          focus:outline-none focus:ring-2 focus:ring-transparent focus:border-green-400!'
                type='text'
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Enter the reset code"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />



        <Button disabled={isLoading} className={`h-11 w-full cursor-pointer bg-[#16A34A] py-2 text-[15px] font-semibold text-white hover:bg-[#15803D] disabled:opacity-80`}>
          {isLoading ? <Spinner /> : ""}
          <LucideLogIn
            className="me-2" /> Verify code
        </Button>

      </form>




    </>
  )
}
