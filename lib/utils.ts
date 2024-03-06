import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleError = (err: unknown) => {
  let errMsg = "Unknown error";
  if (err instanceof Error) {
    errMsg = err.message;
  } else if (typeof err === "string") {
    errMsg = err;
  }
  console.error(errMsg);
  throw new Error(`Error: ${errMsg}`);
};
