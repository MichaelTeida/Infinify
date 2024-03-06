"use server";

import { revalidatePath } from "next/cache";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

// types
type Action = () => Promise<any>;
type UserParams = { [key: string]: any };

const handleDatabaseAction = async (action: Action) => {
  try {
    await connectToDatabase();
    const result = await action();
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    handleError(error);
  }
};

export const createUser = (user: UserParams) =>
  handleDatabaseAction(() => User.create(user));

export const getUserById = (userId: string) =>
  handleDatabaseAction(() => {
    const user = User.findOne({ clerkId: userId });
    if (!user) throw new Error("User not found");
    return user;
  });

export const updateUser = (clerkId: string, user: UserParams) =>
  handleDatabaseAction(() => {
    const updatedUser = User.findOneAndUpdate({ clerkId }, user, { new: true });
    if (!updatedUser) throw new Error("User update failed");
    return updatedUser;
  });

export const deleteUser = (clerkId: string) =>
  handleDatabaseAction(async () => {
    const userToDelete = await User.findOne({ clerkId });
    if (!userToDelete) throw new Error("User not found");
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");
    return deletedUser || null;
  });

export const updateCredits = (userId: string, creditFee: number) =>
  handleDatabaseAction(() => {
    const updatedUserCredits = User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee } },
      { new: true },
    );
    if (!updatedUserCredits) throw new Error("User credits update failed");
    return updatedUserCredits;
  });
