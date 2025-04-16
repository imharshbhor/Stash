"use client";

import Link from "next/link";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { ThemeToggle } from "../ThemeProvider/ThemeToggleBtn";
import SparklesText from "~/components/ui/sparkles-text";
import ShimmerButton from "~/components/ui/shimmer-button";

export default function TopNav() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between p-6 shadow-sm backdrop-blur-lg dark:bg-black/70 sm:px-10 md:px-32">
      <Link href="/" className="font-bold hover:text-gray-300">
        <SparklesText
          text="Stash"
          className="text-3xl text-primary"
          colors={{ first: "red", second: "blue" }}
          sparklesCount={5}
        />
      </Link>
      <div className="flex items-center gap-4">
      <ThemeToggle />
      <SignedOut>
        <SignInButton mode="modal">
          <ShimmerButton className="text-white">Sign In</ShimmerButton>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      </div>
    </nav>
  );
}
