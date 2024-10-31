import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

import { auth } from "@clerk/nextjs/server"

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "32MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({  }) => {
      // This code runs on your server before upload
      const user = auth();

      // If you throw, the user will not be able to upload
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      if (!(await user).userId) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: (await user).userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload

      // Code to post image data to the database
      try {
        const response = await fetch('http://localhost:3000/api/images', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imgId: file.key,
            userId: metadata.userId,
            title: file.name,
            url: file.url,
            createdAt: new Date(),
          }),
        });

        if (!response.ok) {
          console.error('Failed to save image data to the database');
        }
      } catch (error) {
        console.error('Failed to fetch the API',error);
      }

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
