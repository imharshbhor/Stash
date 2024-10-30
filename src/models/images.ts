import mongoose, { Schema, Document } from 'mongoose';

export interface IImage extends Document {
  title: string;
  description?: string;
  url: string;
  createdAt: Date;
}

const ImageSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Image || mongoose.model<IImage>('Image', ImageSchema);
