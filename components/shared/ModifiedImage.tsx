"use client";

import React from "react";
import DownloadIcon from "@mui/icons-material/Download";

import { CldImage } from "next-cloudinary";
import { dataUrl, debounce, getImageSize } from "@/lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import SyncIcon from "@mui/icons-material/Sync";

const ModifiedImage = ({
  image,
  title,
  type,
  isModifying,
  setIsModifying,
  modificationConfig,
  hasDownload = false,
}: ModifiedImageProps) => {
  const downloadHandler = () => {};

  return (
    <div className="flex flex-col gap-4">
      <h3 className="media-header-text">Modified</h3>

      {hasDownload && (
        <button onClick={() => downloadHandler} className="submit-button">
          <DownloadIcon className="image-download_icon" /> Download
        </button>
      )}

      {image?.publicId && modificationConfig ? (
        <div className="relative">
          <div className="media-cld-container_cldImage">
            <CldImage
              width={getImageSize(type, image, "width")}
              height={getImageSize(type, image, "height")}
              src={image?.publicId}
              alt={image.title}
              sizes={"(max-width: 767px) 90vw, 45vw"}
              placeholder={dataUrl as PlaceholderValue}
              className="media-cld_cldImage"
              onLoad={() => {
                setIsModifying && setIsModifying(false);
              }}
              onError={() => {
                debounce(() => {
                  setIsModifying && setIsModifying(false);
                }, 7000);
              }}
              {...modificationConfig}
            />
            {isModifying && (
              <div>
                <SyncIcon className="animate-spin image-syncIcon_icon" />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="h-full w-full media-cld_container">
          <div className="media-cld_text"> Modified image</div>
        </div>
      )}
    </div>
  );
};

export default ModifiedImage;
