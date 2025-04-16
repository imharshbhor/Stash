"use client";

import Image from "next/legacy/image";
import { type ImageType } from "~/lib/image";
import BlurFade from "~/components/ui/blur-fade";
import { Menu } from "@headlessui/react";
import { EllipsisVertical, LucideTrash, Trash, Trash2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "../../../hooks/use-toast";

interface ImageListProps {
  images: ImageType[];
  onImageClick: (image: ImageType) => void;
  loadImages: () => void;
}

export default function ImageList({ images, onImageClick, loadImages }: ImageListProps) {
  const [deleting, setDeleting] = useState<string | null>(null);
  const { toast } = useToast(); // Changed variable name to match the new import

  const deleteImage = async (imgId: string) => {
    try {
      setDeleting(imgId);
      const res = await fetch("/api/images", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileKeys: [imgId] }),
      });

      if (!res.ok) throw new Error("Failed to delete image");

      toast({
        variant:"success",
        title: "Image Deleted.",
        description: new Date().toLocaleString(),});

    } catch (err) {
        toast({
            variant:"destructive",
            title: "Failed to delete image.",
            description: new Date().toLocaleString(),});
      console.error("Error deleting image:", err);
    } finally {
      setDeleting(null);
      loadImages();
    }
  };

  return (
    <section id="photos">
      <div className="mt-4 columns-2 gap-4 md:columns-4 [&>*]:mb-4">
        {images.map((image, index) => {
          const width = index % 4 === 0 ? 800 : index % 3 === 0 ? 900 : index % 2 === 0 ? 300 : 500;
          const height = index % 4 === 0 ? 800 : index % 3 === 0 ? 500 : index % 2 === 0 ? 300 : 200;

          return (
            <BlurFade key={image.imgId || index} delay={0.25 + index * 0.05} inView>
              <div className="relative cursor-pointer overflow-hidden rounded-xl shadow transition-transform duration-300 hover:scale-105">
                <div onClick={() => onImageClick(image)}>
                  <Image
                    src={image.url}
                    alt={image.title}
                    width={width}
                    height={height}
                    layout="responsive"
                    objectFit="cover"
                    quality={100}
                    className="rounded-xl"
                    priority={index < 4}
                  />
                </div>

                {/* Overlay title */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/5 p-1 px-2 text-sm text-white backdrop-blur-3xl">
                  {image.title.split(".")[0]}
                </div>

                {/* Three-dot menu */}
                <Menu as="div" className="absolute top-2 right-2 z-10">
                  <Menu.Button className="p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white transition">
                    <EllipsisVertical className="h-4 w-4" />
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 mt-2 origin-top-right rounded-md bg-background shadow-lg ring-1 ring-black/5 focus:outline-none z-20">
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? "bg-red-100 text-red-600" : "text-red-500"
                            } group flex gap-1 w-full items-center rounded-md px-2 py-2 text-sm`}
                            onClick={() => deleteImage(image.imgId)}
                            disabled={deleting === image.imgId}
                          >
                            <span>Delete</span>
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Menu>
              </div>
            </BlurFade>
          );
        })}
      </div>
    </section>
  );
}
