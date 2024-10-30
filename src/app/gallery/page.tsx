"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Define the ImageType interface
interface ImageType {
  id: string;
  title: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

// Set dynamic rendering strategy
export const dynamic = "force-dynamic";

export default function HomePage() {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const [images, setImages] = useState<ImageType[]>([]);

  // Fetch images on component mount
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
    <main className="min-h-screen bg-black p-5 pt-20 text-white">
      <div className="flex flex-wrap justify-center gap-4">
        {images.map((image) => (
          <div className="group relative" key={image.id}>
            <span className="absolute left-2 top-2 rounded bg-black bg-opacity-50 p-1 text-sm text-white">
              {image.title}
            </span>
            <Image
              src={image.url}
              alt={image.title}
              width={400}
              height={400}
              className="rounded-lg shadow-inner hover:border-2"
              onClick={() => openDialog(image)}
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative">
            <button
              onClick={closeDialog}
              className="absolute right-3 top-2 text-white"
            >
              ✖
            </button>
            <Image
              src={selectedImage.url}
              alt={selectedImage.name}
              width={800}
              height={800}
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </main>
  );
}
