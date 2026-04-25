interface typeOfTitleSections{

    featured:string,
    products:string,
    issignin?:boolean
    
}

export default function TitleSections({featured , issignin=false , products}:typeOfTitleSections) {
    return (
        <>
        <div className='relative flex items-center'>

            {issignin? "":<div className='h-1.5 w-10 rotate-90 bg-linear-to-r from-[#00BC7D]  to-[#007A55]  absolute left-20 top-19 rounded-xl'></div>}


            {issignin? <h2 className='font-bold text-3xl'>{featured} <span className='text-[#009966]'>{products}</span></h2>: <h2 className='mt-15 mx-24 ps-4 font-bold text-3xl'>{featured} <span className='text-[#009966]'>{products}</span></h2>}
            </div>
        </>
    )
}
