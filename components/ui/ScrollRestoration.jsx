"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    // Only scroll to top when route actually changes, not on state changes
    // Use a small delay to ensure the page has rendered
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);

    // Also prevent browser's default scroll restoration
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    return () => clearTimeout(timer);
  }, [pathname]);

  // Additional effect to handle page load
  useEffect(() => {
    // Ensure page starts at top on initial load with smooth behavior
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Disable scroll restoration globally
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  return null;
}
