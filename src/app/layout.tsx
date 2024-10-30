import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";

import { Inter } from "next/font/google";
import { type Metadata } from "next";
import TopNav from "./components/topNav";
import { dark } from "@clerk/themes";

export const metadata: Metadata = {
  title: "Stash",
  description: "A simple image gallery built with the T3 Stack",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body className={inter.className}>
          <TopNav />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
