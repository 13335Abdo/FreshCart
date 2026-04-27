"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface RouteChromeProps {
  children: ReactNode;
}

export default function RouteChrome({ children }: RouteChromeProps) {
  const pathname = usePathname();
  const isSearchPage = pathname === "/search";

  return (
    <>
      {!isSearchPage && <Navbar />}
      {children}
      {!isSearchPage && <Footer />}
    </>
  );
}
