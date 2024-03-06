import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Function for merging CSS classes
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

// Function for creating an SVG image
const createSvg = (width: number, height: number) => `
<svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#7986AC" offset="20%" />
      <stop stop-color="#68769e" offset="50%" />
      <stop stop-color="#7986AC" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="#7986AC" />
  <rect id="r" width="${width}" height="${height}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${width}" to="${width}" dur="1s" repeatCount="indefinite"  />
</svg>`;

// Function for converting a string to Base64 format
const encodeToBase64 = (input: string) =>
  typeof window === "undefined"
    ? Buffer.from(input).toString("base64")
    : window.btoa(input);

// Creating an SVG image as a placeholder and converting it to Base64 format
export const dataUrl = `data:image/svg+xml;base64,${encodeToBase64(
  createSvg(1000, 1000),
)}`;
