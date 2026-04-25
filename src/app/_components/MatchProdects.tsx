import { ProdectType } from '@/types/types';
import CardDesign from './CardDesign';

interface ProdectTypetype {
  prodect: ProdectType[] | null ;
  spacific: ProdectType | null ;
}

export default function MatchProdects({ prodect, spacific }: ProdectTypetype) {
  // استخدام slice للحصول على أول 5 عناصر فقط
  
  const filteredProdects = prodect?.filter((item) => item.category.name === spacific?.category.name)  // تصفية العناصر المطابقة
    .slice(0, 5);  // أخذ أول 5 عناصر فقط

  return (
    <>
      {filteredProdects?.map((item, index) => (
        <CardDesign key={index} prodect={item} />
      ))}
    </>
  );
}