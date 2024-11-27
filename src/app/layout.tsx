import "~/styles/globals.css";
import "@uploadthing/react/styles.css";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { type Metadata } from "next";
import Navbar from "./_components/Navbar";
import { ThemeProvider } from "./_components/theme-provider";
import Footer from "./_components/Footer";

export const metadata: Metadata = {
  title: "FYNC - gallery",
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
    <html lang="en" className={`${inter.className}`}>
      <body className="min-h-screen w-full">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Navbar />
          {children}
          {modal}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
