import { BiSupport } from "react-icons/bi";
import { GiReturnArrow } from "react-icons/gi";
import { MdLocalShipping } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";

export default function Design({
    isHomePage = false,
    isProjectdetailsPage = true,
}: {
    isHomePage?: boolean;
    isProjectdetailsPage?: boolean;
}) {
    return (
        <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-5 px-4 rounded-xl bg-[#F0FDF4] ${isHomePage ? "mt-5" : ""
                }`}
        >
            {/* Free Shipping */}
            <div className="flex gap-3 items-center">
                <div className={`p-2.5 rounded-xl shrink-0 ${isHomePage ? "text-[#2B7FFF] bg-[#FEF2F2]" : "text-[#16A34A] bg-[#DCFCE7]"
                    }`}>
                    <MdLocalShipping className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-[#101828] font-medium text-[13px] sm:text-[14px]">Free Shipping</p>
                    <p className="text-[#6A7282] font-medium text-[11px] sm:text-[12px]">On orders over 500 EGP</p>
                </div>
            </div>

            {/* Easy Returns */}
            <div className="flex gap-3 items-center">
                <div className={`p-2.5 rounded-xl shrink-0 ${isHomePage ? "text-[#FF6900] bg-[#F3F4F6]" : "text-[#16A34A] bg-[#DCFCE7]"
                    }`}>
                    <GiReturnArrow className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-[#101828] font-medium text-[13px] sm:text-[14px]">Easy Returns</p>
                    <p className="text-[#6A7282] font-medium text-[11px] sm:text-[12px]">14-day return policy</p>
                </div>
            </div>

            {/* Secure Payment */}
            <div className="flex gap-3 items-center">
                <div className="p-2.5 rounded-xl text-[#16A34A] bg-[#DCFCE7] shrink-0">
                    <RiSecurePaymentLine className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-[#101828] font-medium text-[13px] sm:text-[14px]">Secure Payment</p>
                    <p className="text-[#6A7282] font-medium text-[11px] sm:text-[12px]">100% secure checkout</p>
                </div>
            </div>

            {/* 24/7 Support - يظهر فقط إذا isProjectdetailsPage === true */}
            {isProjectdetailsPage && (
                <div className="flex gap-3 items-center">
                    <div className={`p-2.5 rounded-xl shrink-0 ${isHomePage ? "text-[#AD46FF] bg-[#F9FAFB]" : "text-[#16A34A] bg-[#DCFCE7]"
                        }`}>
                        <BiSupport className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[#101828] font-medium text-[13px] sm:text-[14px]">24/7 Support</p>
                        <p className="text-[#6A7282] font-medium text-[11px] sm:text-[12px]">Contact us anytime</p>
                    </div>
                </div>
            )}
        </div>
    );
}