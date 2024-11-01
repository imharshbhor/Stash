"use client";

import Link from "next/link";

import {
  SignIn,
  SignInButton,
  SignInWithMetamaskButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { ThemeToggle } from "../ThemeProvider/ThemeToggleBtn";
import SparklesText from "~/components/ui/sparkles-text";
import PulsatingButton from "~/components/ui/pulsating-button";
import { RainbowButton } from "~/components/ui/rainbow-button";
import ShimmerButton from "~/components/ui/shimmer-button";

export default function TopNav() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between p-6 shadow-sm backdrop-blur-lg dark:bg-black/70 dark:text-white sm:px-10 md:px-36">
      <Link href="/" className="font-bold hover:text-gray-300">
        <SparklesText
          text="Stash"
          className="text-3xl"
          colors={{ first: "red", second: "blue" }}
          sparklesCount={5}
        />
      </Link>
      <ThemeToggle />
      <SignedOut>
        <SignInButton mode="modal">
          <ShimmerButton className="text-white">Sign In</ShimmerButton>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
  );
}
