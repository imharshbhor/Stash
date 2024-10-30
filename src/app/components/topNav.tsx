"use client";

import Link from "next/link";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function TopNav() {
  return (
    <nav className="fixed left-0 right-0 top-0 flex items-center justify-between bg-black/50 p-6 px-36 text-white shadow-md backdrop-blur-sm">
      <Link href="/" className="text-2xl font-bold hover:text-gray-300">
        T3Gallery
      </Link>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
  );
}
