import { Inter } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "../components/ui/NavbarWrapper.jsx";
import Footer from "../components/ui/Footer.jsx";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "ZoomStore",
  description: "ZoomStore - Modern e-commerce UI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <NavbarWrapper />
        {children}
        <Footer />
      </body>
    </html>
  );
}
