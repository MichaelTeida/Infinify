import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "qs";
import { aspectRatioOptions } from "@/constants";

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
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#FFA500" offset="10%" />
      <stop stop-color="#FF8C00" offset="30%" />
      <stop stop-color="#FFA500" offset="50%" />
      <stop stop-color="#FF8C00" offset="70%" />
      <stop stop-color="#FFA500" offset="90%" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="#FFA500" />
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

// Function for creating a URL with search parameters
export const formUrlQuery = ({
  searchParams,
  key,
  value,
}: FormUrlQueryParams) => {
  // Parsing existing search parameters and adding a new one or updating an existing one
  const params = { ...qs.parse(searchParams.toString()), [key]: value };
  // Returning a new URL with updated search parameters
  return `${window.location.pathname}?${qs.stringify(params, { skipNulls: true })}`;
};

// GET IMAGE SIZE
export type AspectRatioKey = keyof typeof aspectRatioOptions;
export const getImageSize = (
  type: string,
  image: any,
  dimension: "width" | "height",
): number => {
  if (type === "fill") {
    return (
      aspectRatioOptions[image.aspectRatio as AspectRatioKey]?.[dimension] ||
      1000
    );
  }
  return image?.[dimension] || 1000;
};

// DEBOUNCE
export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout | null;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

// DEEP MERGE OBJECTS
export const deepMergeObjects = (obj1: any, obj2: any) => {
  if (obj2 === null || obj2 === undefined) {
    return obj1;
  }

  let output = { ...obj2 };

  for (let key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      if (
        obj1[key] &&
        typeof obj1[key] === "object" &&
        obj2[key] &&
        typeof obj2[key] === "object"
      ) {
        output[key] = deepMergeObjects(obj1[key], obj2[key]);
      } else {
        output[key] = obj1[key];
      }
    }
  }

  return output;
};
