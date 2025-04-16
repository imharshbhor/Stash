import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Image from '../../../models/images';
import { getAuth } from '@clerk/nextjs/server';

export async function GET(request: Request) {
  await connectToDatabase();
  try {
    const { userId } = getAuth(request);
    const images = await Image.find({ userId });
    return NextResponse.json(images, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to load images', error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await connectToDatabase();
  try {
    const body = await request.json();
    const newImage = new Image(body);
    const savedImage = await newImage.save();
    return NextResponse.json(savedImage, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to save image', error }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { fileKeys } = await request.json();
    await fetch("https://api.uploadthing.com/v6/deleteFiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Uploadthing-Api-Key": process.env.UPLOADTHING_API_KEY ? process.env.UPLOADTHING_API_KEY : ""
        },
        body: JSON.stringify({
          fileKeys: fileKeys
        })
      })
        .then(response => response.json())
        .then(data => console.log("Deleted:", data))
        .catch(error => console.error("Error deleting file:", error));

    await Image.deleteMany({ imgId: { $in: fileKeys } });

    return NextResponse.json({ message: 'Files deleted successfully' }, { status: 200 });
  } catch (error) {
    // console.log(error)
    return NextResponse.json({ message: 'Failed to delete files', error }, { status: 500 });
  }
}
