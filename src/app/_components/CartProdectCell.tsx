"use client"
import { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import { CallUpdateApi, DeleteItemFromCart } from '@/CallingAPIs/AllProdects';
import { useDispatch, useSelector } from 'react-redux';
import { storeTpe } from '@/types/types';
import { p } from '../_Redux/NoOfCartItemsSlice';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { AppDispatch } from '../_Redux/configStore';

export default function CartProdectCell() {
    const dispatch = useDispatch<AppDispatch>()
    const [IsLoading, setIsLoading] = useState<string | null>(null)

    async function handleDeleteCard(productId: string) {
        setIsLoading(productId)
        const res = await DeleteItemFromCart(productId);
        if (res?.status === "success") {
            dispatch(p());
            toast.success(res.message, { position: "top-center", richColors: true });
        } else {
            toast.error(res?.message || "Delete failed");
        }
        setIsLoading(null)
    }

    async function handleUpdateAPI(id: string, count: number) {
        const res = await CallUpdateApi(id, count)
        if (res?.status === "success") {
            dispatch(p());
            toast.success(res.message, { position: "top-center", richColors: true });
        } else {
            toast.error(res?.message || "Update failed");
        }
    }

    const ProductsInCart = useSelector((store: storeTpe) => store.changeNoOFCartItem.allProdects)

    return (
        <>
            {ProductsInCart?.map(item => (
                <div
                    key={item._id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center transition-shadow hover:shadow-md"
                >
                    {/* Product Image */}
                    <div className="w-full sm:w-28 h-28 shrink-0 bg-[#F9FAFB] rounded-xl flex justify-center items-center overflow-hidden">
                        <img
                            className="w-24 h-24 object-contain"
                            src={item.product.imageCover}
                            alt={item.product.title}
                        />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col gap-2 min-w-0">
                        <h3 className="text-[#101828] font-semibold text-[16px] sm:text-[18px] truncate">
                            {item.product.category.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[#15803D] bg-[#F0FDF4] rounded-lg px-2 py-0.5 font-medium text-[11px] sm:text-[12px]">
                                {item.product.category.slug}
                            </span>
                            <span className="text-[#6A7282] text-[12px] font-medium">SKU: 5CA0AD</span>
                        </div>
                        <p className="text-[#16A34A] text-[16px] sm:text-[18px] font-bold">{item?.price} EGP</p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-1">
                            <button
                                onClick={() => item.count > 1 && handleUpdateAPI(item.product._id, item.count - 1)}
                                disabled={item.count <= 1}
                                className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center font-bold text-lg"
                            >
                                −
                            </button>
                            <span className="w-9 text-center font-semibold text-[#101828] text-[15px]">
                                {item.count}
                            </span>
                            <button
                                onClick={() => item.count < item.product.quantity && handleUpdateAPI(item.product._id, item.count + 1)}
                                disabled={item.count >= item.product.quantity}
                                className="w-8 h-8 rounded-full bg-[#16A34A] text-white hover:bg-[#15803D] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center font-bold text-lg"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Total + Delete */}
                    <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-3 w-full sm:w-auto sm:min-w-[110px] mt-2 sm:mt-0">
                        <div className="flex items-end gap-1.5">
                            <p className="text-[#101828] font-bold text-[20px] leading-none">
                                {item.count * item.price}
                            </p>
                            <div className="text-[#99A1AF] text-[11px] font-medium leading-tight mb-0.5">
                                <p>Total</p>
                                <p>EGP</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleDeleteCard(item.product._id)}
                            className="p-2.5 rounded-xl cursor-pointer bg-[#FFF1F2] text-[#FB2C36] hover:bg-[#FB2C36] hover:text-white transition-colors"
                        >
                            {IsLoading === item.product._id ? <Spinner className="w-4 h-4" /> : <FaTrashAlt className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}