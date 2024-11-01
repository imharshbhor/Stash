import React from "react";

export default function Backdrop() {
  return (
    <div className="absolute inset-0 mx-10 flex items-center justify-center">
      <div className="h-[9rem] w-[25em] rounded-full bg-red-500 opacity-20 blur-3xl sm:h-[17rem] sm:w-[17rem]"></div>
      <div className="h-[13rem] w-[27rem] rounded-full bg-blue-500 opacity-20 blur-3xl sm:h-[30rem] sm:w-[30rem]"></div>
    </div>
  );
}
