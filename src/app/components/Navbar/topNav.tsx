"use client";

import Link from "next/link";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "../ThemeProvider/ThemeToggleBtn";

export default function TopNav() {
  return (
    <nav className="fixed left-0 right-0 top-0 flex items-center justify-between p-6 px-36 shadow-sm backdrop-blur-sm dark:bg-black/50 dark:text-white">
      <Link href="/" className="text-2xl font-bold hover:text-gray-300">
        Stash
      </Link>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <div className="flex flex-row gap-3">
        <ThemeToggle />
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
