import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Image from '../../../models/images';

export async function GET() {
  await connectToDatabase();
  try {
    const images = await Image.find({});
    return NextResponse.json(images, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to load images',error }, { status: 500 });
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
    return NextResponse.json({ message: 'Failed to save image',error }, { status: 400 });
  }
}
