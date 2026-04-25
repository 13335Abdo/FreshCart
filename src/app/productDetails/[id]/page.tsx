import CountComponent from "@/app/_components/CountComponent";
import Design from "@/app/_components/Design";
import MatchProdects from "@/app/_components/MatchProdects";
import MySwiper from "@/app/_components/MySwiper";
import { TapsProjectDetails } from "@/app/_components/TapsProjectDetails";
import TitleSections from "@/app/_components/TitleSections";
import { GerAllProdects, GetSpacificProdect } from "@/CallingAPIs/AllProdects";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: PageProps) {

  const Products = "Products"
  const Featured = "Matced"
  const { id } = await params;

  const prodect = await GetSpacificProdect(id);
  const matced = await GerAllProdects()
  const AllImages = prodect?.images

  return (
    <>


      <div className="flex gap-5 my-10 mx-10">
        <div className="w-1/4 sticky inset-0 h-fit">
          <MySwiper isProductDetails={true} listOfImages={AllImages} />
        </div>
        <div className="w-3/4 p-5">
          <span className="font-medium text-[12px] text-[#15803D] bg-[#F0FDF4] p-2 rounded-2xl">{prodect?.category.name}</span>
          <span className="ms-5 font-medium text-[12px] text-[#364153] bg-[#F3F4F6] p-2 rounded-2xl">{prodect?.brand.name}</span>
          <h3 className="mt-5 font-bold text-3xl text-[#101828]">{prodect?.title}</h3>
          <div className="flex items-center gap-2 mt-5">


            <p className="text-[#4A5565] font-medium text-[14px]">{prodect?.ratingsAverage}</p>
            <p className="text-[#4A5565] font-medium text-[14px]">({prodect?.ratingsQuantity} reviews)</p>
          </div>


          <p className="mt-5 font-bold text-3xl text-[#101828]">{prodect?.price} EGP</p>
          <span className="flex items-center gap-1.5 bg-[#F0FDF4] rounded-3xl px-2 w-fit mt-5">
            <div className="w-2 h-2 bg-green-500 rounded-full "></div>
            <p>in Stock</p>
          </span>
          <div className="h-0.5 w-full bg-[#F3F4F6] mt-5"></div>

          <p className="mt-5 font-medium text-[16px] text-[#4A5565]">{prodect?.description}</p>
          <p className="text-[#364153] font-medium text-[14px] mt-5">Quantity</p>




          <CountComponent productId={id} prodect={prodect?.quantity ?? 0} price={prodect?.price ?? 0} />


          <div className="h-0.5 w-full bg-[#F3F4F6] mt-5"></div>


          <Design isProjectdetailsPage={false} />






        </div>

      </div>


      <div className="mx-10">

        
        <TapsProjectDetails prodect={prodect} />
      
      
      </div>

      <div className="mx-10">
        <TitleSections featured={Featured} products={Products} />

      </div>


      <div className="mx-10 grid grid-cols-5 gap-3 items-center my-10">

        <MatchProdects prodect={matced} spacific={prodect} />
      
      </div>


    </>
  );
}