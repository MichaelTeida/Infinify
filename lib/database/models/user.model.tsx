import { model, models, Schema } from "mongoose";

export interface User extends Document {
  clerkId: string;
  userName: string;
  email: string;
  photo: string;
  firstName?: string;
  lastName?: string;
  planId?: number;
  tokenBalance?: number;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  photo: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  planId: { type: Number, default: 1 },
  tokenBalance: { type: Number, default: 2 },
});

const User = models?.User || model("User", UserSchema);

export default User;
