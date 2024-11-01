"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Minimize } from "lucide-react";
import { type ImageType } from "~/lib/image";

interface ImageModalProps {
  image: ImageType;
  onClose: () => void;
}

export default function ImageModal({ image, onClose }: ImageModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-3xl p-3 sm:p-0"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 text-white"
        >
          <Minimize className="transition-transform duration-500 ease-in-out hover:scale-90" />
        </button>
        <Image
          src={image.url}
          alt={image.title}
          width={1200}
          height={1200}
          className="rounded-lg"
          style={{ width: "auto", height: "auto" }}
        />
      </motion.div>
    </motion.div>
  );
}
