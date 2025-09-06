import { Inter, Poppins, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "../components/ui/NavbarWrapper.jsx";
import FooterWrapper from "../components/ui/FooterWrapper.jsx";
import ToastProvider from "../components/providers/ToastProvider";
import { CartProvider } from "../lib/hooks/useCartState";
import ScrollRestoration from "../components/ui/ScrollRestoration";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata = {
  title: "ZoomStore",
  description: "ZoomStore - Modern e-commerce UI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jakarta.className} antialiased`}>
        <CartProvider>
          <ToastProvider />
          <ScrollRestoration />
          <NavbarWrapper />
          {children}
          <FooterWrapper />
        </CartProvider>
      </body>
    </html>
  );
}
