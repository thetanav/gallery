import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Navbar from "./_components/Navbar";

export const metadata: Metadata = {
  title: "flatu",
  description: "app for no user",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="w-full min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
