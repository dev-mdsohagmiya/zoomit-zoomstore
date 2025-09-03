"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Don't show navbar on auth pages and admin pages
  const authPages = ["/login", "/register", "/reset-password"];
  const isAdminPage = pathname.startsWith("/admin");
  const shouldShowNavbar = !authPages.includes(pathname) && !isAdminPage;

  if (!shouldShowNavbar) {
    return null;
  }

  return <Navbar />;
}
