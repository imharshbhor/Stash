/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import Image from "next/legacy/image";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ImageList from "./ImageList";
import ImageModal from "./ImageModal";
import { type ImageType } from "~/lib/image";
import { UploadButton } from "~/utils/uploadthing";
import empty from "~/assets/empty2.png";
import Particles from "~/components/ui/particles";
import { useTheme } from "../ThemeProvider/ThemeProvider";
import ShimmerButton from "~/components/ui/shimmer-button";

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [images, setImages] = useState<ImageType[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const response = await fetch("/api/images");
        const fetchedImages: ImageType[] = await response.json();
        setImages(fetchedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    loadImages().catch(console.error);
  }, []);

  const openDialog = (image: ImageType) => {
    setSelectedImage(image);
  };

  const closeDialog = () => {
    setSelectedImage(null);
  };

  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  return (
    <main className="relative h-screen items-center overflow-hidden p-5 pt-24">
      <Particles
        className="absolute inset-0"
        quantity={500}
        ease={1000}
        staticity={1000}
        color={color}
        refresh
      />
      {images.length === 0 ? (
        <div className="flex h-[70vh] flex-col items-center justify-center">
          <Image
            width={400}
            height={400}
            src={empty}
            quality={100}
            alt="Empty gallery"
          />
          <h2 className="mb-4 text-2xl font-semibold">No images yet</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Upload some images to get started!
          </p>
        </div>
      ) : (
        <ImageList images={images} onImageClick={openDialog} />
      )}
      <UploadButton
        className="fixed bottom-2 left-0 right-0 z-50 m-5 flex flex-row justify-center"
        endpoint="imageUploader"
        appearance={{
          allowedContent: {
            display: "none",
          },
          button:"ut-ready:bg-blue-500 ut-ready:hover:bg-blue-600 ut-ready:hover:scale-110 ut-ready:transition-all ut-ready:ease-in-out ut-ready:hover:font-semibold ut-uploading:cursor-not-allowed rounded-xl bg-red-500 bg-none after:bg-blue-700"
        }}
        content={{
          button({ ready }) {
            if (ready) return <div>Upload stuff</div>;
            return "Getting ready...";
          },
        }}
        onClientUploadComplete={(res) => {
          console.log("Files uploaded: ", res);

          const loadImages = async () => {
            try {
              const response = await fetch("/api/images");
              const fetchedImages: ImageType[] = await response.json();
              setImages(fetchedImages);
            } catch (error) {
              console.error("Error fetching images:", error);
            }
          };
          loadImages().catch(console.error);
        }}
        onUploadError={(error: Error) => {
          console.log(`ERROR! ${error.message}`);
        }}
      />
      <AnimatePresence>
        {selectedImage && (
          <ImageModal image={selectedImage} onClose={closeDialog} />
        )}
      </AnimatePresence>
    </main>
  );
}
