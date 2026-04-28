"use client";

import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface RouteChromeProps {
  children: ReactNode;
}

export default function RouteChrome({ children }: RouteChromeProps) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
