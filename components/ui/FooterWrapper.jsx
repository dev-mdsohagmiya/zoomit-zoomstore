"use client";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterWrapper() {
  const pathname = usePathname();

  // Don't show footer on auth pages and admin pages
  const authPages = ["/login", "/register", "/reset-password"];
  const isAdminPage = pathname.startsWith("/admin");
  const shouldShowFooter = !authPages.includes(pathname) && !isAdminPage;

  if (!shouldShowFooter) {
    return null;
  }

  return <Footer />;
}
