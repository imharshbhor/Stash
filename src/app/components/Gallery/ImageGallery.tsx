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
import { Upload, UploadCloud, UploadCloudIcon, UploadIcon } from "lucide-react";
import { useToast } from "../../../hooks/use-toast";

export default function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [images, setImages] = useState<ImageType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Added state to track loading
  const { toast } = useToast();

  const loadImages = async () => {
    setIsLoading(true); // Set loading to true when starting to fetch images
    try {
      const response = await fetch("/api/images");
      const fetchedImages: ImageType[] = await response.json();
      setImages(fetchedImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setIsLoading(false); // Set loading to false when done fetching images
    }
  };

  useEffect(() => {
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

  const handleUploadComplete = (res) => {
    console.log("Files uploaded: ", res);
    loadImages().catch(console.error);
    toast({
      title: "Upload Success",
      description: "Your images have been successfully uploaded.",
      variant: "success",
    });
  };

  return (
    <main className="relative h-screen items-center overflow-hidden p-5 pt-24">
      <Particles
        className="absolute inset-0"
        quantity={400}
        ease={1000}
        staticity={1000}
        color={color}
        refresh
      />
      {isLoading ? (
        <div className="flex h-[70vh] space-y-2 flex-col items-center justify-center">
          <div className="loader"></div>
          <p>Loading images...</p>
        </div>
      ) : images.length === 0 ? (
        <div className="flex h-[70vh] flex-col items-center justify-center">
          <Image
            loading="eager"
            width={400}
            height={400}
            src={empty}
            quality={100}
            alt="Empty gallery"
          />
          <h2 className="mb-1 text-2xl font-semibold text-primary mt-[-35px]">Empty Gallery...</h2>
          <p className="text-primary/70">
            Upload some images!
          </p>
        </div>
      ) : (
        <ImageList images={images} onImageClick={openDialog} loadImages={() => loadImages()} />
      )}
      <UploadButton
        className="fixed bottom-6 left-0 right-0 z-50 m-5 flex flex-row justify-center"
        endpoint="imageUploader"
        appearance={{
          button: "ut-button ut-ready:bg-blue-600 ut-ready:hover:scale-105 ut-ready:transition-all ut-ready:ease-in-out ut-uploading:cursor-not-allowed rounded-xl bg-red-500 bg-none after:bg-blue-700",
        }}
        content={{
          button({ ready, isUploading }) {
            return ready ? (
              <div className="flex items-center gap-2">Upload stuff<UploadCloudIcon size={18}/></div>
            ) : isUploading ? (
              <div className="flex items-center gap-2"><div className="p-1 loader"></div><span>Uploading...</span></div>
            ) : null;
          },
        }}
        onClientUploadComplete={handleUploadComplete}
        onUploadError={(error: Error) => {
          console.log(`ERROR! ${error.message}`);
          toast({
            title: "Upload Error",
            description: `An error occurred during upload: ${error.message}`,
            variant: "destructive",
          });
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
