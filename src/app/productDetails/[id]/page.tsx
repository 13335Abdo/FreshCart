import CountComponent from "@/app/_components/CountComponent";
import Design from "@/app/_components/Design";
import MySwiper from "@/app/_components/MySwiper";
import { TapsProjectDetails } from "@/app/_components/TapsProjectDetails";
import TitleSections, { MatchProdects } from "@/app/_components/TitleSections";
import { GerAllProdects, GetReviewsForProduct, GetSpacificProdect } from "@/CallingAPIs/AllProdects";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const prodect = await GetSpacificProdect(id);

  const prodectٌReview = await GetReviewsForProduct(id);

  const matced = await GerAllProdects();
  const AllImages = prodect?.images;

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Main Product Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">

          {/* Swiper — full width on mobile, 1/3 on desktop */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-24 lg:h-fit">
            <MySwiper isProductDetails={true} listOfImages={AllImages} />
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-2/3 flex flex-col gap-4">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="font-medium text-[12px] text-[#15803D] bg-[#F0FDF4] px-3 py-1.5 rounded-2xl">
                {prodect?.category.name}
              </span>
              <span className="font-medium text-[12px] text-[#364153] bg-[#F3F4F6] px-3 py-1.5 rounded-2xl">
                {prodect?.brand.name}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-bold text-2xl sm:text-3xl text-[#101828] leading-snug">
              {prodect?.title}
            </h3>

            {/* Ratings */}
            <div className="flex items-center gap-2">
              <p className="text-[#4A5565] font-medium text-[14px]">{prodect?.ratingsAverage}</p>
              <p className="text-[#4A5565] font-medium text-[14px]">
                ({prodect?.ratingsQuantity} reviews)
              </p>
            </div>

            {/* Price */}
            <p className="font-bold text-2xl sm:text-3xl text-[#101828]">{prodect?.price} EGP</p>

            {/* Stock */}
            <span className="flex items-center gap-1.5 bg-[#F0FDF4] rounded-3xl px-3 py-1 w-fit">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm font-medium text-green-700">In Stock</p>
            </span>

            <div className="h-px w-full bg-[#F3F4F6]" />

            {/* Description */}
            <p className="font-medium text-[15px] text-[#4A5565] leading-relaxed">
              {prodect?.description}
            </p>

            {/* Quantity + Actions */}
            <p className="text-[#364153] font-medium text-[14px]">Quantity</p>
            <CountComponent
              productId={id}
              prodect={prodect?.quantity ?? 0}
              price={prodect?.price ?? 0}
            />

            <div className="h-px w-full bg-[#F3F4F6]" />

            {/* Trust badges */}
            <Design isProjectdetailsPage={false} />
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8">
          <TapsProjectDetails prodectٌReview={prodectٌReview} prodect={prodect}  />
        </div>

        {/* Matched Products */}
        <div className="mt-10">
          <TitleSections featured="Matched" products="Products" />
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            <MatchProdects prodect={matced} spacific={prodect} />
          </div>
        </div>
      </div>
    </div>
  );
}