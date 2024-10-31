"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { type ImageType } from "~/lib/image";

interface ImageListProps {
  images: ImageType[];
  onImageClick: (image: ImageType) => void;
}

export default function ImageList({ images, onImageClick }: ImageListProps) {
  return (
    <div className="grid gap-4 p-4 md:grid-cols-3 lg:grid-cols-4">
      {images.map((image, index) => (
        <motion.div
          key={image.id || index}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative aspect-square cursor-pointer overflow-hidden rounded-lg"
          onClick={() => onImageClick(image)}
        >
          <Image
            src={image.url}
            alt={image.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-110"
            priority={index < 4}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-center text-white">
            {image.title.split(".")[0]}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
