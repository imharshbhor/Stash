"use client";

import Image from "next/legacy/image";
import { Minimize } from "lucide-react";
import { type ImageType } from "~/lib/image";

interface ImageModalProps {
  image: ImageType;
  onClose: () => void;
}

export default function ImageModal({ image, onClose }: ImageModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      onClick={onClose}
    >
      <div
        className="relative h-screen w-screen"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-full w-full">
          <Image
            src={image.url}
            alt={image.title}
            layout="fill"
            objectFit="contain"
            className="h-full w-full"
            quality={100}
            priority
          />
          <button
            onClick={onClose}
            className="absolute right-3 top-3 z-10 rounded-2xl bg-black/20 p-3 text-white transition-colors duration-500 ease-in-out hover:bg-black/10"
          >
            <Minimize className="transition-transform duration-500 ease-in-out hover:scale-90" />
          </button>
        </div>
      </div>
    </div>
  );
}
