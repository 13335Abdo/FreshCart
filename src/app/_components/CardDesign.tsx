import { ProdectType } from "@/types/types";
import Link from "next/link";
import { BsArrowRepeat } from "react-icons/bs";
import {  CiStar } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { PiStarFill, PiStarHalfDuotone } from "react-icons/pi";
import AddToCartBtn from "./AddToCartBtn";
import AddToWithListBtn from "./AddToWithListBtn";

interface ProdectProdectType {
    prodect: ProdectType
}


export default function CardDesign({ prodect }: ProdectProdectType) {

    const words = Math.floor(prodect.ratingsAverage);

    const halfStar = Math.round((prodect.ratingsAverage % 1) * 10);;

    let isHalf = null



    const elements = [];

    for (let i = 0; i < words; i++) {
        elements.push(<div key={i}>{words}</div>);
    }


    let emptyStar = 5 - elements.length

    if (halfStar >= 5) {
        isHalf = "yes"
        emptyStar = 5 - elements.length - 1
    }

    const emptyOne = [];

    for (let j = 0; j < emptyStar; j++) {
        emptyOne.push(<div key={j}>{emptyStar}</div>);
    }



    return (<div className="border p-3 rounded-lg border-[#E5E7EB] hover:shadow-xl hover:-translate-y-2 transition-all duration-500">

        <div className="relative">
            <img className="w-full" src={prodect.imageCover} alt={prodect.title} />
            <div className="absolute top-0 grid gap-3 text-xl right-0">


                <AddToWithListBtn productId={prodect?._id}/>


                <Link href={`/productDetails/${prodect._id}`} className="bg-white p-1 rounded-full hover:text-green-600 font-semibold">

                    <FaRegEye className="cursor-pointer" />
                </Link>
                <div className="bg-white p-1 rounded-full hover:text-green-600 font-semibold">
                    <BsArrowRepeat className="cursor-pointer" />

                </div>
            </div>

        </div>
        <div>
            <p className="text-[#6A7282] text-[12px] font-medium mt-1 cursor-pointer">
                {prodect.category.name}
            </p>
            <p className="text-[#364153] text-[16px] mt-1 cursor-pointer">
                {prodect.title.split(" ", 2).join(" ")}
            </p>
            <div className="flex items-center gap-2">
                <div className="flex">
                    {
                        elements.map((e,index) => <PiStarFill key={index} className="w-5 h-[16] text-yellow-500" />)
                    }
                    {isHalf && <PiStarHalfDuotone className="w-5 h-[16] text-yellow-500" />}
                    {
                        emptyOne.map((e,i) => <CiStar key={i} className="w-5 h-[16] text-yellow-500" />)
                    }
                </div>

                <p className="text-[#6A7282] font-medium text-[12px]">{prodect.ratingsAverage}</p>
                <p className="text-[#6A7282] font-medium text-[12px]">({prodect.ratingsQuantity})</p>
            </div>




            <div className="flex justify-between items-center mt-1">
                {
                    prodect.priceAfterDiscount ?
                    <div className=" flex gap-2 items-center">
                        
                        <p className="text-[18px] text-[#16A34A]! font-bold">{prodect.priceAfterDiscount} EGP</p>
                        <p className="text-[14px] text-[#6A7282] line-through font-medium">{prodect.price} EGP</p>

                    </div>
                        :
                        <p className="text-[18px] font-bold">{prodect.price} EGP</p>

                }

                <AddToCartBtn productId={prodect?._id} />


            </div>

        </div>





    </div>)
}