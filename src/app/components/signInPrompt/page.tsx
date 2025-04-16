'use client'

import React, { useEffect, useState } from "react";
import TypingAnimation from "~/components/ui/typing-animation";
import { useTheme } from "../ThemeProvider/ThemeProvider";
import Particles from "~/components/ui/particles";

export default function SignInPrompt() {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);
  return (
    <div className="flex h-screen flex-row items-center justify-center">
      <Particles
        className="absolute inset-0"
        quantity={500}
        ease={1000}
        staticity={1000}
        color={color}
        refresh
      />
      <TypingAnimation
        className="text-1xl font-bold sm:text-4xl text-primary"
        text="Please Sign In to Upload Stuff."
        duration={100}
      />
    </div>
  );
}
