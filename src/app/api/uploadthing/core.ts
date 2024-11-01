import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "32MB", maxFileCount: 5 } })
    .middleware(async () => {
      const user = auth();
      if (!(await user).userId) throw new UploadThingError("Unauthorized");

      return { userId: (await user).userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        const apiUrl = process.env.NODE_ENV === 'production'
          ? 'https://stash-six.vercel.app/api/images'
          : 'http://localhost:3000/api/images';

        // Create the image data object directly
        const imageData = {
          imgId: file.key,
          userId: metadata.userId,
          title: file.name,
          url: file.url,
          createdAt: new Date(),
        };

        // Send a single object instead of an array if only one image
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(imageData), // Pass the object directly
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Failed to save image data to the database:', errorText);
        }
      } catch (error) {
        console.error('Failed to fetch the API', error);
      }

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
