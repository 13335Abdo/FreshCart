import { brands } from '@/types/types'
import { FaArrowRightLong } from 'react-icons/fa6'

export default function BrandsDesign({ response , isCallAllCat = false }:{response:brands,isCallAllCat:boolean}) {
    return (
        <div className='w-50 h-72 group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl bg-white shadow-md rounded-2xl p-3 flex flex-col justify-between'>
            {/* حاوية الصورة */}
            <div className='w-full h-48 bg-[#F9FAFB] rounded-xl flex justify-center items-center overflow-hidden p-3'>
                <img
                    src={response.image}
                    alt={response.name || "brand logo"}
                    className='max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105'
                />
            </div>

            {/* قسم النص */}
            <div className='flex flex-col items-center justify-center gap-1 text-center'>
                <p className={`font-semibold text-[14px] transition-colors duration-300 ${isCallAllCat
                        ? 'text-[#101828] group-hover:text-[#16A34A]'
                        : 'text-[#101828] group-hover:text-[#7F22FE]'
                    }`}>
                    {response.name}
                </p>
                <p className={`font-medium text-[13px] flex items-center gap-2 transition-all duration-300 opacity-0 group-hover:opacity-100 ${isCallAllCat ? 'text-[#16A34A]' : 'text-[#7F22FE]'
                    }`}>
                    {isCallAllCat ? 'View Subcategories' : 'View Products'}
                    <FaArrowRightLong className='text-xs transition-transform duration-300 group-hover:translate-x-1' />
                </p>
            </div>
        </div>
    )
}