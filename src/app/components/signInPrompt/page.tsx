import React from "react";
import TypingAnimation from "~/components/ui/typing-animation";

export default function signInPrompt() {
  return (
    <div className="flex h-screen flex-row items-center justify-center">
      <TypingAnimation
        className="text-1xl sm:text-4xl font-bold"
        text="Please Sign In to Upload Stuff."
        duration={100}
      />
    </div>
  );
}
