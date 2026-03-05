import type { Metadata } from "next";
import { Poppins, Noto_Sans } from "next/font/google";
import "./globals.css";
import { CustomCursor, Ribbons } from "@/components/ui";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Incial — We Build Brands",
  description:
    "Incial is a creative digital agency building brands, experiences, and products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${poppins.variable} ${notoSans.variable} font-sans antialiased`}
        style={{ cursor: "none" }}
      >
        <Ribbons
          colors={["#60A5FA"]} // Single color = single trail line
          baseThickness={8} // Reduced from 18 to make it thinner
          pointCount={35}
        />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
