"use client";
import { createCardOrder, createCashOrder } from "@/CallingAPIs/AllProdects";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { InputGroupTextarea } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { storeTpe } from "@/types/types";
import { Description, Input, Radio, RadioGroup } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { BsCash } from "react-icons/bs";
import { FaCreditCard } from "react-icons/fa6";
import { IoHomeSharp } from "react-icons/io5";
import { RiInformation2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import * as z from "zod";
import { p } from "../_Redux/NoOfCartItemsSlice";
import { AppDispatch } from "../_Redux/configStore";

export interface ValueType {
    postalCode?:string,
    city:string,
    phone:string,
    details:string,

}

const schema = z.object({
    postalCode: z.string().optional(),
    details: z.string().min(10, "should be above 10 characters"),
    phone: z.string().regex(/^01[0125][0-9]{8}$/),
    city: z.string().min(3, "should be above 3 characters"),
    paymentMethodSchema: z.enum(["cash", "card"]),
});

type PaymentFormData = z.infer<typeof schema>;

export default function PaymentComponent() {

    const router = useRouter()
    const patch = useDispatch<AppDispatch>()

    const id = useSelector((store:storeTpe)=>store.changeNoOFCartItem.cartId)

    async function handeldata(values:ValueType) {
        const secondvalues = {
            shippingAddress: {
                details: values.details,
                phone: values.phone,
                city: values.city,
                postalCode: values.postalCode
            }
        }

        if (paymentMethod == "cash") {
            
            
            const cash = await createCashOrder(secondvalues,id)
            
            if (cash == "success") {

                patch(p())
                
                toast.success("order created",{richColors:true , position:"top-center"})
                
                router.push("/allorders")



                
            }
            
        }else if (paymentMethod == "card") {


            const card = await createCardOrder(secondvalues,id)

            
            if (card.status == "success") {

                window.open(card.session.url,"_blank")
                
                patch(p())
                
                toast.success("order created",{richColors:true , position:"top-center"})
                
                



                
            }
            
        }




    }

    const addOns = [
        {
            description: "Pay when your order arrives at your doorstep",
            icon: BsCash,
            title: "Cash on Delivery",
            value: "cash" as const,
        },
        {
            description: "Secure payment with Credit/Debit Card via Stripe",
            icon: FaCreditCard,
            title: "Pay Online",
            value: "card" as const,
        },
    ];

    const form = useForm<PaymentFormData>({
        defaultValues: {
            postalCode: undefined,
            details: "",
            phone: "",
            city: "",
        },
        resolver: zodResolver(schema),
    });

    const paymentMethod = form.watch("paymentMethodSchema");

    return (
        <form onSubmit={form.handleSubmit(handeldata)}>
            {/* Shipping Address */}
            <div className="border-2 border-[#F3F4F6] rounded-2xl">
                <div className="bg-linear-to-r from-[#16A34A] to-[#15803D] p-3 rounded-t-2xl">
                    <p className="text-white font-medium text-[18px] flex gap-2 items-center">
                        <span><IoHomeSharp /></span>Shipping Address
                    </p>
                    <p className="text-[#DCFCE7] font-medium text-[14px]">
                        Where should we deliver your order?
                    </p>
                </div>
                <div className="p-4">
                    <div className="flex p-4 gap-3 items-center bg-[#DCFCE7] rounded-2xl my-3">
                        <div className="p-2 rounded-full bg-[#DCFCE7]">
                            <RiInformation2Line className="text-[#155DFC]" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-[#193CB8] font-medium text-[14px]">Delivery Information</p>
                            <p className="text-[#155DFC] font-medium text-[12px]">
                                Please ensure your address is accurate for smooth delivery
                            </p>
                        </div>
                    </div>

                    <Controller
                        name="phone"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Phone*</FieldLabel>
                                <Input
                                    className="p-2! mb-3 w-full rounded-md border bg-white px-4 py-2 text-sm shadow-sm transition-all focus:outline-none focus:ring-2 h-10.5 focus:ring-transparent border-gray-200! focus:border-green-400!"
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your phone"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name="city"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>City *</FieldLabel>
                                <Input
                                    className="p-2! mb-3 w-full rounded-md border bg-white px-4 py-2 text-sm shadow-sm transition-all focus:outline-none focus:ring-2 h-10.5 focus:ring-transparent border-gray-200! focus:border-green-400!"
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your Address city"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name="details"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Address details *</FieldLabel>
                                <InputGroupTextarea
                                    className="p-2! mb-3 w-full rounded-md border bg-white px-4 py-2 text-sm shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-transparent border-gray-200! focus:border-green-400!"
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your Address details"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name="postalCode"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Postal Code (optional)</FieldLabel>
                                <Input
                                    className="p-2! mb-3 w-full rounded-md border bg-white px-4 py-2 text-sm shadow-sm transition-all focus:outline-none focus:ring-2 h-10.5 focus:ring-transparent border-gray-200! focus:border-green-400!"
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your postal code"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </div>
            </div>

            {/* Payment Method */}
            <div className="border-2 border-[#F3F4F6] rounded-2xl mt-5">
                <div className="bg-linear-to-r from-[#16A34A] to-[#15803D] p-3 rounded-t-2xl">
                    <p className="text-white font-medium text-[18px] flex gap-2 items-center">
                        <span><FaCreditCard /></span>Payment Method
                    </p>
                    <p className="text-[#DCFCE7] font-medium text-[14px]">
                        Choose how you'd like to pay
                    </p>
                </div>
                <div className="p-4">
                    <div className="flex w-full flex-col items-center gap-6 px-4 py-6">
                        <section className="flex w-full min-w-[320px] flex-col gap-4">
                            <Controller
                                name="paymentMethodSchema"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <RadioGroup
                                            value={field.value}
                                            onChange={(v) => field.onChange(v as PaymentFormData["paymentMethodSchema"])}
                                            className="flex w-full flex-col gap-2 cursor-pointer"
                                        >
                                            {addOns.map((addon) => (
                                                <Radio
                                                    key={addon.value}
                                                    value={addon.value}
                                                    className={clsx(
                                                        "group relative flex-col gap-4 rounded-3xl px-5 py-4 transition-all border-2 cursor-pointer",
                                                        paymentMethod === addon.value
                                                            ? "bg-green-50 border-green-500"
                                                            : "bg-white border-[#E5E7EB]",
                                                    )}
                                                >
                                                    <Radio.Control className="absolute top-3 right-4 size-5 rounded-full before:rounded-full cursor-pointer">
                                                        <Radio.Indicator />
                                                    </Radio.Control>
                                                    <Radio.Content className="flex flex-row items-start justify-start gap-4 cursor-pointer">
                                                        <addon.icon
                                                            className={clsx(
                                                                "size-5 transition-colors",
                                                                paymentMethod === addon.value
                                                                    ? "text-green-600"
                                                                    : "text-gray-400"
                                                            )}
                                                        />
                                                        <div className="flex flex-col gap-1">
                                                            <Label className="cursor-pointer">{addon.title}</Label>
                                                            <Description className="cursor-pointer">{addon.description}</Description>
                                                        </div>
                                                    </Radio.Content>
                                                </Radio>
                                            ))}
                                        </RadioGroup>
                                        {fieldState.invalid && (
                                            <FieldError className="text-red-500 mt-2" errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </section>

                        <div className="flex w-full min-w-[320px] flex-col gap-3 sm:flex-row">
                            <Button
                                disabled={paymentMethod !== "cash"}
                                className="flex-1 disabled:cursor-not-allowed! cursor-pointer rounded-xl bg-linear-to-r from-[#16A34A] to-[#15803D] py-6 text-[16px] font-semibold text-white disabled:opacity-40"
                            >
                                <BsCash className="mr-2 size-5" />
                                Pay with cash
                            </Button>
                            <Button
                                disabled={paymentMethod !== "card"}
                                className="flex-1 disabled:cursor-not-allowed! cursor-pointer rounded-xl bg-linear-to-r from-[#16A34A] to-[#15803D] py-6 text-[16px] font-semibold text-white disabled:opacity-40"
                            >
                                <FaCreditCard className="mr-2 size-5" />
                                Pay with card
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}