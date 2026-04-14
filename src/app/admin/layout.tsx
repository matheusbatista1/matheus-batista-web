import type { ReactNode } from "react";
import { Poppins } from "next/font/google";
import "../globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

type Props = {
  children: ReactNode;
};

export default function AdminRootLayout({ children }: Props) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`} data-theme="dark">
      <body className="h-full bg-[#0a0a0a] font-sans text-[#f5f5f7]">
        {children}
      </body>
    </html>
  );
}
