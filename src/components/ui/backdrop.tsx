import React from "react";

export default function Backdrop() {
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute left-10 top-[9rem] h-0 w-0 rotate-[35deg] border-b-[70px] border-l-[100px] border-r-[100px] border-b-blue-500 border-l-transparent border-r-transparent blur-lg before:absolute before:left-[-65px] before:top-[-45px] before:block before:h-0 before:w-0 before:-rotate-[35deg] before:border-b-[80px] before:border-l-[30px] before:border-r-[30px] before:border-b-blue-500 before:border-l-transparent before:border-r-transparent before:content-[''] after:absolute after:left-[-105px] after:top-[3px] after:block after:h-0 after:w-0 after:-rotate-[70deg] after:border-b-[70px] after:border-l-[100px] after:border-r-[100px] after:border-b-blue-500 after:border-l-transparent after:border-r-transparent after:content-['']" />
      <div className="absolute bottom-[4.5rem] right-10 h-0 w-0 rotate-[35deg] border-b-[70px] border-l-[100px] border-r-[100px] border-b-red-500 border-l-transparent border-r-transparent blur-lg before:absolute before:left-[-65px] before:top-[-45px] before:block before:h-0 before:w-0 before:-rotate-[35deg] before:border-b-[80px] before:border-l-[30px] before:border-r-[30px] before:border-b-red-500 before:border-l-transparent before:border-r-transparent before:content-[''] after:absolute after:left-[-105px] after:top-[3px] after:block after:h-0 after:w-0 after:-rotate-[70deg] after:border-b-[70px] after:border-l-[100px] after:border-r-[100px] after:border-b-red-500 after:border-l-transparent after:border-r-transparent after:content-['']" />
    </div>
  );
}
