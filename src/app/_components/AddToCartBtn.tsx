"use client"
import { addTocartBtn } from '@/CallingAPIs/AllProdects'
import { Spinner } from '@/components/ui/spinner'
import { useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { p } from '../_Redux/NoOfCartItemsSlice'
import { AppDispatch } from '../_Redux/configStore'

export default function AddToCartBtn({ productId, isproductDetails = false }: { productId: string, isproductDetails?: boolean }) {
    const dispath = useDispatch<AppDispatch>()

    const [IsLoading, setIsLoading] = useState(false)


    async function handleAddTocartBtn() {
        setIsLoading(true)

        const addToCart = await addTocartBtn(productId)
        if (addToCart?.status == "success") {
            setIsLoading(false)
            toast.success(addToCart?.message, { position: "top-center", richColors: true })

        } else {
            setIsLoading(false)
            toast.error(addToCart?.message, { position: "top-center", richColors: true })
        }
        dispath(p())


    }

    return (<>
        {
            isproductDetails ?
                <div className="w-1/2">
                    <button onClick={handleAddTocartBtn} className="w-full bg-green-600 hover:bg-green-700 cursor-pointer py-2.5 rounded-xl font-medium text-[16px] text-white flex justify-center items-center"> {IsLoading ? <Spinner className="text-2xl text-center" /> : <span>Add to Cart</span> }  </button>
                </div>
                :
                <button onClick={handleAddTocartBtn}
                    className=
                    "inline-flex items-center justify-center gap-2 p-3 cursor-pointer rounded-full bg-green-600 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"

                >
                    {IsLoading ? <Spinner className="text-sm" /> : <FaPlus className="text-sm" />}
                </button>

        }
    </>

    )
}
