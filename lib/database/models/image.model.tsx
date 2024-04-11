import { model, models, Schema, Document } from "mongoose";

export interface ImageModel extends Document {
  title: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: Date;
  updatedAt: Date;
  modificationType: string;
  modificationUrl: string;
  secureUrl: string;
  publicId: string;
  config: object;
  width?: number;
  height?: number;
  aspectRatio?: string;
  color?: string;
  prompt?: string;
}

const ImageSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  modificationType: { type: String, required: true },
  modificationUrl: { type: URL, required: true },
  secureUrl: { type: URL, required: true },
  publicId: { type: String, required: true },
  config: { type: Object },
  width: { type: Number },
  height: { type: Number },
  aspectRatio: { type: String },
  color: { type: String },
  prompt: { type: String },
});

const Image = models?.Image || model("Image", ImageSchema);

export default Image;
