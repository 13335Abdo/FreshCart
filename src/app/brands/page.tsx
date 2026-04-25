import { GerAllBrands } from '@/CallingAPIs/AllProdects'
import BrandsDesign from '../_components/BrandsDesign'
import TitleOfAllThing from '../_components/TitleOfAllThing'


export default async function page() {


  const response = await GerAllBrands()

  return (
    <>

    <div>
      <TitleOfAllThing />
    </div>
    <div className='grid grid-cols-1 my-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-[90%] m-auto'>


    {response?.map((items)=><BrandsDesign key={items._id}  response={items} isCallAllCat={false} />)}

    </div>



    </>
  )
}
