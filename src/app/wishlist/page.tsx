"use client"
import { DeleteItemFromWiyhList } from "@/CallingAPIs/AllProdects";
import { storeTpe } from "@/types/types";
import { Heart, LoaderCircle, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import AddToCartBtn from "../_components/AddToCartBtn";
import { AppDispatch } from "../_Redux/configStore";
import { y } from "../_Redux/NoOfWithListItems";

export default function page() {
  const patch = useDispatch<AppDispatch>()

  const [isDeleting, setisDeleting] = useState<string | null>(null)


  const Wishprodect = useSelector((stor: storeTpe) => stor.changeNoOFWithListItem.allItemsInWithList)
  const wishlistCount = useSelector((stor: storeTpe) => stor.changeNoOFWithListItem.noOfWithList)


  async function handleDelete(productId: string) {
    setisDeleting(productId)

    const deleting = await DeleteItemFromWiyhList(productId)

    if (deleting.status == "success") {

      patch(y())
      
      toast.success(deleting.message, { position: "top-center", richColors: true })


    } else {


      toast.error(deleting.message, { position: "top-center", richColors: true })

    }

  }









  return (
    <section className="bg-[#fcfdfb] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-col gap-6 rounded-[28px] border border-[#eef2ec] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-2 text-sm font-medium text-[#6A7282] sm:flex-row sm:items-center">
            <Link className="transition hover:text-[#16A34A]" href="/home">
              Home
            </Link>
            <span className="hidden sm:inline">/</span>
            <span className="text-[#101828]">Wishlist</span>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FEF2F2] text-red-500">
                <Heart className="h-7 w-7 fill-current" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-[#101828]">
                  My Wishlist
                </h1>
                <p className="text-sm font-medium text-[#6A7282] sm:text-base">
                  saved for later.
                </p>
              </div>
            </div>

            <Link
              className="inline-flex w-full items-center justify-center rounded-xl border border-[#fecaca] px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-[#fff5f5] sm:w-auto"
              href="/shop"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {wishlistCount === 0 ? (
          <div className="rounded-[28px] border border-dashed border-[#d8e3d6] bg-white px-6 py-14 text-center shadow-sm sm:px-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#f1f8f1] text-[#16A34A]">
              <ShoppingBag className="h-8 w-8" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-[#101828]">
              Your wishlist is empty
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#6A7282] sm:text-base">
              Save products you love so they are easy to find later. Once you are ready,
              you can move them straight into your cart.
            </p>
            <Link
              href="/shop"
              className="mt-8 inline-flex items-center justify-center rounded-xl bg-[#16A34A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#15803D]"
            >
              Discover Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {Wishprodect.map((product) => {
              // const isDeleting = deletingId === product.id;
              return (
                <article
                  key={product._id}
                  className="rounded-[28px] border border-[#edf2ea] bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-center">
                    <Link
                      href={`/prodectDetails/${product._id}`}
                      className="flex items-center gap-4"
                    >
                      <div className="h-24 w-24 overflow-hidden rounded-2xl bg-[#f8faf8]">
                        <img
                          src={product.imageCover}
                          alt={product.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="inline-flex w-fit items-center rounded-full bg-[#F0FDF4] px-3 py-1 text-xs font-semibold text-[#15803D]">
                          {product.category?.name ?? "Featured"}
                        </div>
                        <h2 className="max-w-xl text-lg font-semibold text-[#101828] transition hover:text-[#16A34A]">
                          {product.title}
                        </h2>
                        <p className="text-sm text-[#6A7282]">
                          Keep it saved for later or move it to your cart when you are ready.
                        </p>
                      </div>
                    </Link>

                    <div className="md:ml-auto md:min-w-65">
                      <div className="mb-4 flex items-center justify-between md:justify-end md:gap-6">
                        <div className="text-left md:text-right">
                          <p className="text-sm font-medium text-[#6A7282]">Price</p>
                          <p className="text-xl font-bold text-[#101828]">
                            {
                              product.priceAfterDiscount ?
                                <div className=" flex gap-2 items-center">

                                  <p className="text-[18px] text-[#16A34A]! font-bold">{product.priceAfterDiscount} EGP</p>
                                  <p className="text-[14px] text-[#6A7282] line-through font-medium">{product.price} EGP</p>

                                </div>
                                :
                                <p className="text-[18px] font-bold">{product.price} EGP</p>

                            }
                          </p>
                        </div>
                        <div className="rounded-full bg-[#F0FDF4] px-3 py-1 text-xs font-semibold text-[#15803D]">
                          In stock
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                        <AddToCartBtn productId={product._id} />
                        <button
                          type="button"
                          onClick={() => handleDelete(product._id)}
                          // disabled={isDeleting}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#fecaca] px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-[#fff5f5] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
                        >
                          {isDeleting == product._id ? (
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                          <span>{isDeleting == product._id ? "Removing..." : "Remove"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
