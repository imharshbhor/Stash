import mongoose, { Schema, Document } from 'mongoose';

export interface IImage extends Document {
    imgId: string,
    userId: string,
    title: string;
    url: string;
    createdAt: Date;
}

const ImageSchema: Schema = new Schema({
    imgId: { type: String },
    userId: { type: String },
    title: { type: String, required: true },
    url: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Image || mongoose.model<IImage>('Image', ImageSchema);
