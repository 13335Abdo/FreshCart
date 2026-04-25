"use client"
import { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import { CallUpdateApi, DeleteItemFromCart, GetAllProdectsInCartUser } from '@/CallingAPIs/AllProdects';
import { useDispatch, useSelector } from 'react-redux';
import {  storeTpe } from '@/types/types';
import { p } from '../_Redux/NoOfCartItemsSlice';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { AppDispatch } from '../_Redux/configStore';
//import { cartLineProduct, type CartLineItem } from '@/types';
export default function CartProdectCell() {

    const dispatch = useDispatch<AppDispatch>()

    const [IsLoading, setIsLoading] = useState<string | null>(null)



    async function handleDeleteCard(productId: string) {

        setIsLoading(productId)

        const res = await DeleteItemFromCart(productId);
        if (res?.status === "success") {
            dispatch(p()); // يعيد جلب المنتجات من API ويحدث Redux

            toast.success(res.message, { position: "top-center", richColors: true });
        } else {
            toast.error(res?.message || "Delete failed");

        }
    }

    async function handleUpdateAPI(id: string, count: number) {

        const res = await CallUpdateApi(id, count)

        if (res?.status === "success") {

            dispatch(p());

            toast.success(res.message, { position: "top-center", richColors: true });
        } else {
            toast.error(res?.message || "Delete failed");

        }
    }


    const ProductsInCart = useSelector((store: storeTpe) => store.changeNoOFCartItem.allProdects)

    const allProductsInCart = ProductsInCart





    return (
        <>
            {allProductsInCart?.map(item => (
                <div key={item._id} className="bg-white p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center rounded-2xl shadow-md relative">

                    {/* قسم الصورة */}
                    <div className="w-full sm:w-32 h-auto sm:h-32 p-3 bg-[#F9FAFB] rounded-xl flex justify-center items-center">
                        <img className="w-24 h-24 sm:w-full sm:h-full object-contain" src={item.product.imageCover} alt={item.product.title} />
                    </div>

                    {/* قسم التفاصيل الأساسية */}
                    <div className="flex-1 flex flex-col gap-2 w-full sm:w-auto">
                        <h3 className="text-[18px] text-[#101828] font-semibold">{item.product.category.name}</h3>
                        <div className="flex flex-wrap items-center gap-3">
                            <p className="text-[#15803D] bg-[#F0FDF4] rounded-xl px-2 py-1 font-medium text-[12px]">{item.product.category.slug}</p>
                            <p className="text-[#6A7282] text-[12px] font-medium">SKU: 5CA0AD</p>
                        </div>
                        <div>
                            <p className="text-[#16A34A] text-[18px] font-bold">{item?.price} EGP</p>
                        </div>
                        <div className="mt-1">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        if (item.count > 1) {
                                            handleUpdateAPI(item.product._id, item.count - 1)
                                        }
                                    }}
                                    disabled={item.count <= 1}
                                    className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                                >
                                    -
                                </button>
                                <span className="w-10 text-center font-semibold text-[#101828]">{item.count}</span>
                                <button
                                    onClick={() => {
                                        if (item.count < item.product.quantity) {
                                            handleUpdateAPI(item.product._id, item.count + 1)

                                        }
                                    }}
                                    disabled={item.count >= item.product.quantity}
                                    className="w-8 h-8 rounded-full bg-[#16A34A] text-white hover:bg-[#15803D] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* قسم السعر الإجمالي + زر الحذف (بدون absolute) */}
                    <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-end gap-3 w-full sm:w-auto mt-4 sm:mt-0 sm:min-w-32.5">
                        <div className="flex items-center gap-2">
                            <p className="text-[#101828] font-bold text-[20px]">{item.count * item.price}</p>
                            <div className="text-[#99A1AF] text-[12px] font-medium">
                                <p>Total</p>
                                <p>EGP</p>
                            </div>
                        </div>
                        <button onClick={() => handleDeleteCard(item.product._id)} className="text-[#FB2C36] p-3 rounded-2xl cursor-pointer bg-[#FFC9C9] hover:text-white hover:bg-[#FB2C36] transition-colors">
                            {IsLoading === item.product._id ? <Spinner /> : <FaTrashAlt />}
                        </button>
                    </div>

                </div>
            ))}





        </>
    )
}
