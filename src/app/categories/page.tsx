import { GerAllCategorys } from "@/CallingAPIs/AllProdects"
import CatDesign from "../_components/CatDesign"

export default async function page() {
  
  const categories = await GerAllCategorys()
  return (
    <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center">

          {categories?.map((item) => <CatDesign key={item._id} cats={item} />)}

        </div>
      </div>
  )
}
