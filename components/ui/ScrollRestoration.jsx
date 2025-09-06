"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top when route changes
    window.scrollTo(0, 0);

    // Also prevent browser's default scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, [pathname]);

  // Additional effect to handle page load
  useEffect(() => {
    // Ensure page starts at top on initial load
    window.scrollTo(0, 0);

    // Disable scroll restoration globally
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  return null;
}
