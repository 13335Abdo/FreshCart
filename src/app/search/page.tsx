import SearchProductsClient from "./SearchProductsClient";
import { ProdectType } from "@/types/types";

export default async function page() {
    async function GetAllProdects(): Promise<ProdectType[] | null> {
        try {
            let allProducts: ProdectType[] = [];
            let currentPage = 1;
            let totalPages = 1;

            // 1. نجيب الصفحة الأولى ونحدد عدد الصفحات الكلي
            const firstRes = await fetch(
                `https://ecommerce.routemisr.com/api/v1/products?page=${currentPage}`,
                { cache: "force-cache" }
            );
            const firstData = await firstRes.json();

            // التأكد من وجود البيانات
            if (!firstData.data || !firstData.metadata) return null;

            // نضيف منتجات الصفحة الأولى
            allProducts.push(...firstData.data);
            totalPages = firstData.metadata.numberOfPages;

            // 2. نجلب باقي الصفحات (من 2 إلى totalPages)
            for (let page = 2; page <= totalPages; page++) {
                const res = await fetch(
                    `https://ecommerce.routemisr.com/api/v1/products?page=${page}`,
                    { cache: "force-cache" }
                );
                const data = await res.json();
                if (data.data) {
                    allProducts.push(...data.data);
                }
            }

            return allProducts;
        } catch (error) {
            console.error("Error fetching all products:", error);
            return null;
        }
    }
    const allProducts = (await GetAllProdects()) ?? [];

    return <SearchProductsClient allProducts={allProducts} />;
}
