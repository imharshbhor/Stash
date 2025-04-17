"use client";

import { type ImageType } from "~/lib/image";
import BlurFade from "~/components/ui/blur-fade";
import Image from "next/image";
import { useState } from "react";
import { useToast } from "../../../hooks/use-toast";
import { Checkbox } from "~/components/ui/checkbox"; // Import Checkbox from comp/ui
import { Trash } from "lucide-react";

interface ImageListProps {
    images: ImageType[];
    onImageClick: (image: ImageType) => void;
    loadImages: () => void;
}

export default function ImageList({ images, onImageClick, loadImages }: ImageListProps) {
    const [deleting, setDeleting] = useState(false);
    const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
    const { toast } = useToast();

    const toggleSelect = (imgId: string) => {
        setSelectedImages(prev => {
            const newSet = new Set(prev);
            if (newSet.has(imgId)) {
                newSet.delete(imgId);
            } else {
                newSet.add(imgId);
            }
            return newSet;
        });
    };

    const toggleSelectAll = () => {
        if (selectedImages.size === images.length) {
            setSelectedImages(new Set());
        } else {
            setSelectedImages(new Set(images.map(img => img.imgId)));
        }
    };

    const deleteSelectedImages = async () => {
        if (selectedImages.size === 0) return;

        try {
            setDeleting(true);
            const res = await fetch("/api/images", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fileKeys: Array.from(selectedImages) }),
            });

            if (!res.ok) throw new Error("Failed to delete images");

            toast({
                variant: "success",
                title: "Images Deleted.",
                description: new Date().toLocaleString(),
            });

            setSelectedImages(new Set());
            loadImages();
        } catch (err) {
            toast({
                variant: "destructive",
                title: "Failed to delete images.",
                description: new Date().toLocaleString(),
            });
            console.error("Error deleting images:", err);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <section id="photos">
            <div className="mb-4 flex items-center justify-end gap-4 h-10 mr-2">
                <button
                    onClick={deleteSelectedImages}
                    disabled={deleting || selectedImages.size === 0}
                    className="flex z-10 justify-center items-center gap-2 px-4 py-2 font-semibold text-red-500 text-sm rounded-md disabled:hidden"
                >
                    <Trash size={16} /> Delete
                </button>
                <label className="flex items-center gap-2 cursor-pointer z-10">
                    <Checkbox
                        checked={selectedImages.size === images.length}
                        onCheckedChange={toggleSelectAll}
                        className="h-4 w-4 border border-balck"
                    />
                    <span className="text-sm">Select All</span>
                </label>
            </div>

            <div className="columns-2 gap-4 md:columns-4 [&>*]:mb-4">
                {images.map((image, index) => {
                    const isSelected = selectedImages.has(image.imgId);
                    return (
                        <BlurFade key={image.imgId || index} delay={0.25 + index * 0.05} inView>
                            <div className="relative group cursor-pointer overflow-hidden rounded-xl shadow">
                                {/* Checkbox */}
                                <Checkbox
                                    checked={isSelected}
                                    onCheckedChange={() => toggleSelect(image.imgId)}
                                    className="absolute top-2 left-2 z-10 h-4 w-4 bg-white rounded"
                                />

                                {/* Image */}
                                <div onClick={() => onImageClick(image)}>
                                    <div className="relative w-full overflow-hidden rounded-xl">
                                        <Image
                                            src={image.url}
                                            alt={image.title}
                                            width={400}
                                            height={600}
                                            sizes="(max-width: 768px) 100vw, 25vw"
                                            className="rounded-xl object-cover"
                                            priority={index === 0}
                                            placeholder="empty"
                                        />
                                    </div>
                                </div>

                                {/* Title Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1 px-2 text-sm text-white backdrop-blur-3xl">
                                    {image.title.split(".")[0]}
                                </div>
                            </div>
                        </BlurFade>
                    );
                })}
            </div>
            {deleting && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="loader"></div>
                </div>
            )}
        </section>
    );
}
