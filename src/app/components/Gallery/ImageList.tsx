"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ImageType } from "@/types/image";

interface ImageListProps {
  images: ImageType[];
  onImageClick: (image: ImageType) => void;
}

export default function ImageList({ images, onImageClick }: ImageListProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 py-5">
      {images.map((image, index) => (
        <motion.div
          key={image.imgId || index}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative transition duration-500 ease-in-out"
        >
          <span className="absolute left-2 top-2 z-10 rounded bg-black bg-opacity-50 p-1 text-sm text-white">
            {image.title}
          </span>
          <Image
            src={image.url}
            alt={image.title}
            width={400}
            height={400}
            className="cursor-pointer rounded-lg shadow-inner"
            onClick={() => onImageClick(image)}
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </motion.div>
      ))}
    </div>
  );
}
