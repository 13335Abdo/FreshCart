import { GerUserOrders } from '@/CallingAPIs/AllProdects'
import Allcat from '../_components/Allcat'
import UserOrders from '../_components/UserOrders'
import Link from 'next/link'
import { PackageSearch } from 'lucide-react'


export default async function page() {


  const usrProdects = await GerUserOrders()




  return (
    <>
      <div>


        <div>

          <Allcat />
          
        </div>
        <div>



          {usrProdects && usrProdects.length > 0 ? (
            usrProdects.map((item) => <UserOrders key={item._id} item={item} />)
          ) : (
            <div className="mx-auto mt-10 max-w-3xl px-4">
              <div className="rounded-3xl border border-emerald-100 bg-linear-to-b from-white to-emerald-50 p-8 text-center shadow-lg shadow-emerald-100/60 sm:p-12">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
                  <PackageSearch className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">No orders yet</h2>
                <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 sm:text-base">
                  You have not placed any orders. Start shopping and your order history will appear here.
                </p>

                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link
                    href="/"
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                  >
                    Explore Products
                  </Link>
                  <Link
                    href="/cart"
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-emerald-200 bg-white px-6 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50"
                  >
                    Go to Cart
                  </Link>
                </div>
              </div>
            </div>
          )}




        </div>


      </div>



    </>
  )
}
