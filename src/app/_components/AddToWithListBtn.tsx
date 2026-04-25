"use client"
import { addToWithListBtn } from '@/CallingAPIs/AllProdects'
import { Spinner } from '@/components/ui/spinner'
import { useState } from 'react'
import { CiHeart } from 'react-icons/ci'
import { toast } from 'sonner'
import { y } from '../_Redux/NoOfWithListItems'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../_Redux/configStore'
import { FaRegHeart } from 'react-icons/fa6'

export default function AddToWithListBtn({ productId, isproductDetails = false }: { productId: string, isproductDetails?: boolean }) {

    const [IsLoading, setIsLoading] = useState(false)
    const dispath = useDispatch<AppDispatch>()


    async function handleAddToWithListBtn() {


        setIsLoading(true)

        const addToCart = await addToWithListBtn(productId)
        
        if (addToCart?.status == "success") {
            setIsLoading(false)
            toast.success(addToCart?.message, { position: "top-center", richColors: true })

        } else {
            setIsLoading(false)
            toast.error(addToCart?.message, { position: "top-center", richColors: true })
        }
        dispath(y())


    }






    return (
        <>
            {
                isproductDetails ?
                    <button onClick={handleAddToWithListBtn} className="rounded-xl border-[0.5px] hover:text-green-600 duration-150 transition-all  flex items-center cursor-pointer text-[#364153] text-[16px] font-medium gap-2 justify-center p-2 w-[93%]">
                        {IsLoading ? <Spinner className="text-sm" /> : <FaRegHeart  className="cursor-pointer" />}
                        <p>Add to Wishlist</p>
                    </button>
                    :
                    <button onClick={handleAddToWithListBtn} className="bg-white p-1 rounded-full hover:text-red-600 font-semibold disabled:cursor-not-allowed disabled:opacity-60">

                        {IsLoading ? <Spinner className="text-sm" /> : <CiHeart className="cursor-pointer" />}
                    </button>}
        </>
    )
}
