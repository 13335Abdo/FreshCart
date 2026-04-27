import { GerAllProdects } from "@/CallingAPIs/AllProdects";
import SearchProductsClient from "./SearchProductsClient";

export default async function page() {
  const allProducts = (await GerAllProdects()) ?? [];

  return <SearchProductsClient allProducts={allProducts} />;
}
