
import { BiSupport } from "react-icons/bi";
import { GiReturnArrow } from "react-icons/gi";
import { MdLocalShipping } from "react-icons/md";
import { RiSecurePaymentLine } from "react-icons/ri";

export default function Design({
    isHomePage = false,
    isProjectdetailsPage = true,
}) {
    return (
        <div
            className={
                isHomePage
                    ? "mt-5 flex flex-wrap gap-4 py-6 px-4 bg-[#F0FDF4]"
                    : "flex flex-wrap gap-4 py-6 px-4 bg-[#F0FDF4]"
            }
        >
            {/* Free Shipping */}
            <div className="flex flex-1 min-w-45 gap-3 items-center">
                <div
                    className={
                        isHomePage
                            ? "p-3 rounded-xl text-[#2B7FFF] bg-[#FEF2F2]"
                            : "p-3 rounded-xl text-[#16A34A] bg-[#DCFCE7]"
                    }
                >
                    <MdLocalShipping className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-[#101828] font-medium text-[14px]">Free Shipping</p>
                    <p className="text-[#6A7282] font-medium text-[12px]">
                        On orders over 500 EGP
                    </p>
                </div>
            </div>

            {/* Easy Returns */}
            <div className="flex flex-1 min-w-45 gap-3 items-center">
                <div
                    className={
                        isHomePage
                            ? "p-3 rounded-xl text-[#FF6900] bg-[#F3F4F6]"
                            : "p-3 rounded-xl text-[#16A34A] bg-[#DCFCE7]"
                    }
                >
                    <GiReturnArrow className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-[#101828] font-medium text-[14px]">Easy Returns</p>
                    <p className="text-[#6A7282] font-medium text-[12px]">
                        14-day return policy
                    </p>
                </div>
            </div>

            {/* Secure Payment */}
            <div className="flex flex-1 min-w-45 gap-3 items-center">
                <div className="p-3 rounded-xl text-[#16A34A] bg-[#DCFCE7]">
                    <RiSecurePaymentLine className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-[#101828] font-medium text-[14px]">Secure Payment</p>
                    <p className="text-[#6A7282] font-medium text-[12px]">
                        100% secure checkout
                    </p>
                </div>
            </div>

            {/* 24/7 Support - only when isProjectdetailsPage is true */}
            {isProjectdetailsPage && (
                <div className="flex flex-1 min-w-45 gap-3 items-center">
                    <div
                        className={
                            isHomePage
                                ? "p-3 rounded-xl text-[#AD46FF] bg-[#F9FAFB]"
                                : "p-3 rounded-xl text-[#16A34A] bg-[#DCFCE7]"
                        }
                    >
                        <BiSupport className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[#101828] font-medium text-[14px]">24/7 Support</p>
                        <p className="text-[#6A7282] font-medium text-[12px]">
                            Contact us anytime
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}