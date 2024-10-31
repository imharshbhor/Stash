/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ImageList from "./ImageList";
import ImageModal from "./ImageModal";
import { type ImageType } from "~/lib/image";
import { UploadButton } from "~/utils/uploadthing";

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

  return (
    <main className="min-h-screen p-5 pt-20 dark:bg-black dark:text-white">
      <ImageList images={images} onImageClick={openDialog} />

      <UploadButton
        endpoint="imageUploader"
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
