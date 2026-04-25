"use client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Spinner } from "@/components/ui/spinner";
import { storeTpe } from "@/types/types";
import {
    BadgeCheckIcon,
    HeadphonesIcon,
    HeartIcon,
    LogOutIcon,
    MenuIcon,
    SearchIcon,
    ShoppingCartIcon,
    XIcon
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../../assets/7be87acff8878d0ff905ef9dcd5bf7d2fd7a6c6f.png";
import logo from "../../assets/a.shrink-0.png";
import { AppDispatch } from "../_Redux/configStore";
import { p } from "../_Redux/NoOfCartItemsSlice";
import { y } from "../_Redux/NoOfWithListItems";

const components: { title: string; href: string }[] = [
    { title: "All categories", href: "/categories" },
];

export default function Navbar() {
    const dispatch = useDispatch<AppDispatch>();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const noOfcart = useSelector((store: storeTpe) => store.changeNoOFCartItem.noOfcart);
    const noOfWithList = useSelector((store: storeTpe) => store.changeNoOFWithListItem.noOfWithList);
    const isLoading = useSelector((store: storeTpe) => store.changeNoOFCartItem.isLoading);
    const rounder = useSelector((store: storeTpe) => store.changeNoOFWithListItem.isLoading);

    const session = useSession();
    const isLoggedIn = !!session.data;

    useEffect(() => {
        if (session.status !== "authenticated") return;
        dispatch(p());
        dispatch(y());
    }, [dispatch, session.status]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) setMobileOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function handleLogout() {
        signOut({ redirect: true, callbackUrl: "/login" });
    }

    return (
        <>
            <header
                className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled
                        ? "bg-white shadow-md"
                        : "bg-white/90 backdrop-blur-md shadow-sm"
                    }`}
            >
                <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4 lg:px-6">

                    {/* Logo */}
                    <Link href="/" className="flex shrink-0 items-center">
                        <img src={logo.src} alt="FreshCart" className="h-8 w-auto" />
                    </Link>

                    {/* Desktop Search */}
                    <div className="relative hidden flex-1 md:flex" style={{ maxWidth: "400px" }}>
                        <input
                            type="text"
                            placeholder="Search products, brands..."
                            className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-5 pr-11 text-sm transition focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                        <button className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-green-500 p-1.5 text-white transition hover:bg-green-600">
                            <SearchIcon size={15} />
                        </button>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:block">
                        <NavigationMenu>
                            <NavigationMenuList className="flex items-center gap-0.5">

                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link href="/" className="text-sm font-medium text-gray-700 hover:text-green-600">
                                            Home
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="text-sm font-medium text-gray-700 hover:text-green-600">
                                        Categories
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="w-44 bg-white p-2 shadow-lg rounded-xl">
                                            {components.map((item, idx) => (
                                                <NavigationMenuLink asChild key={idx}>
                                                    <Link
                                                        href={item.href}
                                                        className="block rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-600"
                                                    >
                                                        {item.title}
                                                    </Link>
                                                </NavigationMenuLink>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link href="/brands" className="text-sm font-medium text-gray-700 hover:text-green-600">
                                            Brands
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link href="/support" className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-green-600">
                                            <HeadphonesIcon size={16} />
                                            <span>Support</span>
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>

                                {isLoggedIn ? (
                                    <>
                                        <NavigationMenuItem>
                                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                                <Link href="/allorders" className="text-sm font-medium text-gray-700 hover:text-green-600">
                                                    Shop
                                                </Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>

                                        {/* Wishlist */}
                                        <NavigationMenuItem>
                                            <NavigationMenuLink asChild>
                                                <Link href="/wishlist" className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition hover:bg-red-50 hover:text-red-500">
                                                    <HeartIcon size={19} />
                                                    <span className="absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                                                        {rounder ? <Spinner className="text-[8px]" /> : noOfWithList}
                                                    </span>
                                                </Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>

                                        {/* Cart */}
                                        <NavigationMenuItem>
                                            <NavigationMenuLink asChild>
                                                <Link href="/cart" className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition hover:bg-green-50 hover:text-green-600">
                                                    <ShoppingCartIcon size={19} />
                                                    <span className="absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold text-white">
                                                        {isLoading ? <Spinner className="text-[8px]" /> : noOfcart}
                                                    </span>
                                                </Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>

                                        {/* Avatar Dropdown */}
                                        <NavigationMenuItem>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-9 w-9 rounded-full p-0">
                                                        <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-green-200 transition hover:ring-green-400">
                                                            <AvatarImage src={avatar.src} alt="avatar" />
                                                            <AvatarFallback className="bg-green-100 text-green-700 text-xs font-semibold">U</AvatarFallback>
                                                        </Avatar>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="mt-3 w-52 rounded-xl bg-white p-1.5 shadow-xl" align="end">
                                                    <DropdownMenuGroup>
                                                        <DropdownMenuItem className="cursor-pointer rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                                            <BadgeCheckIcon className="mr-2 h-4 w-4 text-green-500" />
                                                            <span>Account</span>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuGroup>
                                                    <div className="my-1 h-px bg-gray-100" />
                                                    <button
                                                        onClick={handleLogout}
                                                        className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-500 transition hover:bg-red-50"
                                                    >
                                                        <LogOutIcon className="h-4 w-4" />
                                                        <span>Sign Out</span>
                                                    </button>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </NavigationMenuItem>
                                    </>
                                ) : (
                                    <>
                                        <NavigationMenuItem>
                                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                                <Link href="/login" className="text-sm font-semibold text-green-600 hover:text-green-700">
                                                    Login
                                                </Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                        <NavigationMenuItem>
                                            <NavigationMenuLink asChild>
                                                <Link
                                                    href="/signin"
                                                    className="inline-flex h-9 items-center justify-center rounded-full bg-green-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
                                                >
                                                    Sign Up
                                                </Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    </>
                                )}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </nav>

                    {/* Mobile Right Side */}
                    <div className="flex items-center gap-2 lg:hidden">
                        {isLoggedIn && (
                            <>
                                <Link href="/wishlist" className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-600 hover:bg-red-50 hover:text-red-500">
                                    <HeartIcon size={19} />
                                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                                        {rounder ? <Spinner className="text-[8px]" /> : noOfWithList}
                                    </span>
                                </Link>
                                <Link href="/cart" className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-600 hover:bg-green-50 hover:text-green-600">
                                    <ShoppingCartIcon size={19} />
                                    <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[9px] font-bold text-white">
                                        {isLoading ? <Spinner className="text-[8px]" /> : noOfcart}
                                    </span>
                                </Link>
                            </>
                        )}
                        <button
                            onClick={() => setMobileOpen((v) => !v)}
                            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-700 transition hover:bg-green-50"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <XIcon size={22} /> : <MenuIcon size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Search bar (below header) */}
                <div className="border-t border-gray-100 px-4 py-2 md:hidden">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search products, brands..."
                            className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-5 pr-11 text-sm transition focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                        <button className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full bg-green-500 p-1.5 text-white transition hover:bg-green-600">
                            <SearchIcon size={15} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                        onClick={() => setMobileOpen(false)}
                    />

                    {/* Drawer Panel */}
                    <div className="absolute right-0 top-0 h-full w-72 overflow-y-auto bg-white shadow-2xl">
                        {/* Drawer Header */}
                        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                            <img src={logo.src} alt="FreshCart" className="h-7 w-auto" />
                            <button
                                onClick={() => setMobileOpen(false)}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
                            >
                                <XIcon size={18} />
                            </button>
                        </div>

                        <div className="px-5 py-4 space-y-1">
                            {/* Nav Links */}
                            {[
                                { href: "/", label: "Home" },
                                { href: "/categories", label: "All Categories" },
                                { href: "/brands", label: "Brands" },
                                { href: "/support", label: "Support" },
                                ...(isLoggedIn ? [{ href: "/allorders", label: "Shop" }] : []),
                            ].map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-600"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        {/* Auth Section */}
                        <div className="border-t border-gray-100 px-5 py-4">
                            {isLoggedIn ? (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3">
                                        <Avatar className="h-9 w-9 ring-2 ring-green-200">
                                            <AvatarImage src={avatar.src} alt="avatar" />
                                            <AvatarFallback className="bg-green-100 text-green-700 text-xs font-semibold">U</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-800">My Account</p>
                                            <p className="text-xs text-gray-500">{session.data?.user?.email}</p>
                                        </div>
                                    </div>
                                    <Link
                                        href="/account"
                                        onClick={() => setMobileOpen(false)}
                                        className="flex w-full items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                    >
                                        <BadgeCheckIcon size={16} className="text-green-500" />
                                        Account Settings
                                    </Link>
                                    <button
                                        onClick={() => { handleLogout(); setMobileOpen(false); }}
                                        className="flex w-full items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-100"
                                    >
                                        <LogOutIcon size={16} />
                                        Sign Out
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    <Link
                                        href="/login"
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center justify-center rounded-xl border border-green-200 py-2.5 text-sm font-semibold text-green-600 transition hover:bg-green-50"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/signin"
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center justify-center rounded-xl bg-green-600 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}