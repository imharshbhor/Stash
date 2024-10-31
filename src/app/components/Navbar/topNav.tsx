"use client";

import Link from "next/link";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "../ThemeProvider/ThemeToggleBtn";

export default function TopNav() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between p-6 shadow-sm backdrop-blur-lg dark:bg-black/70 dark:text-white sm:px-36">
      <Link href="/" className="text-2xl font-bold hover:text-gray-300">
        Stash
      </Link>
      <div className="flex flex-row gap-3">
        <ThemeToggle />
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
