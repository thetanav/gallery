import "~/styles/globals.css";
import "@uploadthing/react/styles.css";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { type Metadata } from "next";
import Navbar from "./_components/Navbar";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "gallery FYNC",
  description: "app for no user",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.className} dark`}>
      <body className="min-h-screen w-full">
        <NextTopLoader showSpinner={false} color="#fff" />
        <Navbar />
        {children}
        {modal}
        <Toaster />
      </body>
    </html>
  );
}
