import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility function to truncate text
export function truncateText(text: string, maxLength: number = 50): string {
  if (!text) return "No title";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}
