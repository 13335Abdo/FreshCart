// ===== TitleSections.tsx =====
interface typeOfTitleSections {
  featured: string;
  products: string;
  issignin?: boolean;
}

export default function TitleSections({ featured, issignin = false, products }: typeOfTitleSections) {
  return (
    <div className="relative flex items-center mt-8 sm:mt-12">
      {!issignin && (
        <div className="h-1.5 w-8 sm:w-10 rotate-90 bg-gradient-to-r from-[#00BC7D] to-[#007A55] absolute left-4 sm:left-20 top-16 sm:top-19 rounded-xl" />
      )}
      {issignin ? (
        <h2 className="font-bold text-2xl sm:text-3xl">
          {featured} <span className="text-[#009966]">{products}</span>
        </h2>
      ) : (
        <h2 className="mt-10 sm:mt-15 mx-8 sm:mx-24 ps-3 sm:ps-4 font-bold text-2xl sm:text-3xl">
          {featured} <span className="text-[#009966]">{products}</span>
        </h2>
      )}
    </div>
  );
}


// ===== MatchProdects.tsx =====
import { ProdectType } from "@/types/types";
import CardDesign from "./CardDesign";

interface ProdectTypetype {
  prodect: ProdectType[] | null;
  spacific: ProdectType | null;
}

export function MatchProdects({ prodect, spacific }: ProdectTypetype) {
  const filteredProdects = prodect
    ?.filter((item) => item.category.name === spacific?.category.name)
    .slice(0, 5);

  return (
    <>
      {filteredProdects?.map((item, index) => (
        <CardDesign key={index} prodect={item} />
      ))}
    </>
  );
}

