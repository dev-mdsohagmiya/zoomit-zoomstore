"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Don't show navbar on auth pages
  const authPages = ["/login", "/register", "/reset-password"];
  const shouldShowNavbar = !authPages.includes(pathname);

  if (!shouldShowNavbar) {
    return null;
  }

  return <Navbar />;
}
