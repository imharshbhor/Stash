import "~/styles/globals.css";
import "@uploadthing/react/styles.css";

import { ClerkProvider } from "@clerk/nextjs";

import { Inter } from "next/font/google";
import { type Metadata } from "next";
import TopNav from "./components/Navbar/topNav";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "./components/ThemeProvider/ThemeProvider";

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
    <html lang="en">
      <ThemeProvider>
        <ClerkProvider appearance={{ baseTheme: dark }}>
          <body className={inter.className}>
            <TopNav />
            {children}
          </body>
        </ClerkProvider>
      </ThemeProvider>
    </html>
  );
}
