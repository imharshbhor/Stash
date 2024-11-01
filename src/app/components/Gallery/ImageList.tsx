"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { type ImageType } from "~/lib/image";
import BlurFade from "~/components/ui/blur-fade";

interface ImageListProps {
  images: ImageType[];
  onImageClick: (image: ImageType) => void;
}

export default function ImageList({ images, onImageClick }: ImageListProps) {
  return (
    <section id="photos">
      <div className="columns-2 gap-4 space-y-4 md:columns-4 mt-4">
        {images.map((image, index) => (
          <BlurFade key={image.id || index} delay={0.25 + index * 0.05} inView>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative cursor-pointer overflow-hidden rounded-xl shadow"
              onClick={() => onImageClick(image)}
            >
              <Image
                src={image.url}
                alt={image.title}
                width={232}
                height={290} // Adjust these dimensions based on your layout needs
                className="h-auto w-full rounded-xl object-cover transition-transform duration-300 hover:scale-110"
                priority={index < 4}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/5 p-1 px-2 text-sm text-white backdrop-blur-3xl">
                {image.title.split(".")[0]}
              </div>
            </motion.div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
