
import { GerAllCategorys, GerAllProdects } from "@/CallingAPIs/AllProdects";
import getMyToken from "@/lib/getMyToken";
import image from "../assets/19b048dcec278f9d9c89514b670e0d9f8909f6dc.png";
import CardDesign from "./_components/CardDesign";
import CatDesign from "./_components/CatDesign";
import Design from "./_components/Design";
import MySwiper from "./_components/MySwiper";
import TitleSections from "./_components/TitleSections";

export default async function Home() {


  


  const listOfImage=[
    image.src,
    image.src,
    image.src
  ]

  const prodect = await GerAllProdects()
  const categories = await GerAllCategorys()



  const Featured = "Featured"
  const Products = "Products"
  const ShopBy = "Shop By"
  const Category = "Category"

  return (
    <>
      <MySwiper listOfImages={listOfImage} />
      <Design isHomePage={true} />
      <TitleSections featured={ShopBy} products={Category} />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 text-center">

          {categories?.map((item) => <CatDesign key={item._id} cats={item} />)}

        </div>
      </div>




      <TitleSections featured={Featured} products={Products} />



      <div className="mx-4 my-10 grid grid-cols-1 gap-6 sm:mx-6 sm:grid-cols-2 md:mx-10 md:grid-cols-3 lg:mx-16 lg:grid-cols-4 xl:mx-20 xl:grid-cols-5">

        {prodect && prodect.map((item) => <CardDesign key={item._id} prodect={item} />)}

      </div>



    </>
  );
}
