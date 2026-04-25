import { CategoryType } from '@/types/types'
import Image from 'next/image'
interface CatsType {
    cats: CategoryType
}

export default function CatDesign({ cats }: CatsType) {
    return (<>
        <div
            className="group cursor-pointer transition-transform duration-300 hover:scale-105"
        >

            <div className="flex justify-center mb-3">
                <div className='flex justify-center mb-3 w-24 h-24'>

                    <Image
                        width={300}
                        height={300}
                        src={cats.image}
                        alt={"logo"}
                        className="rounded-full object-cover shadow-md border-2 border-transparent group-hover:border-green-500 transition-all"
                    />
                </div>
            </div>
            <div className="rounded-lg py-2 px-3 shadow-sm group-hover:shadow-md transition-all">
                <p className="text-gray-800 font-medium text-sm sm:text-base truncate">
                    {cats.name}
                </p>
            </div>
        </div>

    </>
    )
}
