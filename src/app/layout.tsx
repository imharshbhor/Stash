import "~/styles/globals.css";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "~/app/api/uploadthing/core";

import { Toaster } from "../components/ui/toaster"

import { ClerkProvider } from "@clerk/nextjs";

import { Inter } from "next/font/google";
import { type Metadata } from "next";
import TopNav from "./components/Navbar/topNav";
import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider";

export const metadata: Metadata = {
  title: "Stash",
  description: "A simple image gallery built with the T3 Stack",
//   icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <ClerkProvider>
          <body className={inter.className}>
            {/* <Backdrop /> */}
            <TopNav />
            {children}
            <Toaster />
          </body>
        </ClerkProvider>
      </ThemeProvider>
    </html>
  );
}
