"use client";
import { ChangePassword } from "@/CallingAPIs/AllProdects";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Eye, EyeOff, Lock, ShieldCheck } from "lucide-react";

interface Valueseee {
    currentPassword: string;
    password: string;
    rePassword: string;
}

const shcima = z
    .object({
        currentPassword: z.string().min(1, "Current password is required"),
        password: z
            .string()
            .regex(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                "Must contain: uppercase, lowercase, number, special char & min 8 chars"
            ),
        rePassword: z.string(),
    })
    .refine((data) => data.password === data.rePassword, {
        message: "Passwords do not match",
        path: ["rePassword"],
    });

export default function ChangePasswordPage() {
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm({
        defaultValues: {
            currentPassword: "",
            password: "",
            rePassword: "",
        },
        resolver: zodResolver(shcima),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = form;

    async function handledata(values: Valueseee) {
        setIsSubmitting(true);
        try {
            const changePass = await ChangePassword(
                values.currentPassword,
                values.password,
                values.rePassword
            );
            if (changePass && !changePass.error) {
                toast.success("Password changed successfully! Redirecting to login...", {
                    richColors: true,
                    position: "top-center",
                    duration: 3000,
                });
                setTimeout(() => {
                    signOut({ redirect: true, callbackUrl: "/login" });
                }, 2000);
                reset();
            } else {
                toast.error(changePass?.message || "Failed to change password", {
                    richColors: true,
                    position: "top-center",
                });
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.", {
                richColors: true,
                position: "top-center",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-lg">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-8 text-center">
                        <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-full mb-4">
                            <ShieldCheck className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Change Password</h1>
                        <p className="text-green-100 text-sm mt-1">
                            Secure your account with a strong password
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(handledata)} className="p-6 sm:p-8 space-y-6">
                        {/* Current Password */}
                        <Controller
                            name="currentPassword"
                            control={control}
                            render={({ field }) => (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Current Password <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <input
                                            type={showCurrent ? "text" : "password"}
                                            {...field}
                                            className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-gray-50"
                                            placeholder="Enter current password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrent(!showCurrent)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    {errors.currentPassword && (
                                        <p className="mt-1 text-xs text-red-500">{errors.currentPassword.message}</p>
                                    )}
                                </div>
                            )}
                        />

                        {/* New Password */}
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        New Password <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <input
                                            type={showNew ? "text" : "password"}
                                            {...field}
                                            className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-gray-50"
                                            placeholder="Enter new password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNew(!showNew)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
                                    )}
                                    <p className="mt-1 text-xs text-gray-400">
                                        At least 8 chars, one uppercase, one lowercase, one number, one special character.
                                    </p>
                                </div>
                            )}
                        />

                        {/* Confirm Password */}
                        <Controller
                            name="rePassword"
                            control={control}
                            render={({ field }) => (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                                        Confirm New Password <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <input
                                            type={showConfirm ? "text" : "password"}
                                            {...field}
                                            className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-gray-50"
                                            placeholder="Confirm new password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirm(!showConfirm)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    {errors.rePassword && (
                                        <p className="mt-1 text-xs text-red-500">{errors.rePassword.message}</p>
                                    )}
                                </div>
                            )}
                        />

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full cursor-pointer bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Updating...
                                </div>
                            ) : (
                                "Change Password"
                            )}
                        </button>

                        {/* Additional info */}
                        <p className="text-center text-xs text-gray-400 pt-2">
                            After successful change, you will be logged out and redirected to login.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}