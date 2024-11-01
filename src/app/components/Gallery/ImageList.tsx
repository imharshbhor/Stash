"use client";
import Image from "next/legacy/image";
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
      <div className="mt-4 columns-2 gap-4 md:columns-4 [&>*]:mb-4">
        {images.map((image, index) => {
          // Calculate responsive dimensions based on index
          const width =
            index % 4 === 0
              ? 800
              : index % 3 === 0
                ? 900
                : index % 2 === 0
                  ? 300
                  : 500;
          const height =
            index % 4 === 0
              ? 800
              : index % 3 === 0
                ? 500
                : index % 2 === 0
                  ? 300
                  : 200;
          return (
            <BlurFade
              key={image.imgId || index}
              delay={0.25 + index * 0.05}
              inView
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative cursor-pointer overflow-hidden rounded-xl shadow"
                onClick={() => onImageClick(image)}
              >
                <div className="relative">
                  <Image
                    src={image.url}
                    alt={image.title}
                    width={width}
                    height={height}
                    layout="responsive"
                    objectFit="cover"
                    quality={100}
                    className="rounded-xl transition-transform duration-300 hover:scale-110"
                    priority={index < 4}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/5 p-1 px-2 text-sm text-white backdrop-blur-3xl">
                  {image.title.split(".")[0]}
                </div>
              </motion.div>
            </BlurFade>
          );
        })}
      </div>
    </section>
  );
}
