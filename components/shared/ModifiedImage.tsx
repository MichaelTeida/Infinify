"use client";

import React, { useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";

import { CldImage, getCldImageUrl } from "next-cloudinary";
import { dataUrl, debounce, download, getImageSize } from "@/lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import SyncIcon from "@mui/icons-material/Sync";
import { useToast } from "@/hooks/use-toast";

const ModifiedImage = ({
  image,
  title,
  type,
  isModifying,
  setIsModifying,
  modificationConfig,
  hasDownload = image?.publicId && modificationConfig && !isModifying,
}: ModifiedImageProps) => {
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    if (isDownloading) {
      toast({
        title: "Please wait",
        description: "You can only download once every 5 seconds.",
        duration: 3500,
        className: "media-error-toast",
      });
      return;
    }

    setIsDownloading(true);

    download(
      getCldImageUrl({
        width: image?.width,
        height: image?.height,
        src: image?.publicId,
        ...modificationConfig,
      }),
      title,
    );

    setTimeout(() => {
      setIsDownloading(false);
    }, 5000);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center;">
        <h3 className="media-header-text">Modified</h3>

        {hasDownload && (
          <button
            onClick={downloadHandler}
            className="flex items-center md:px-5 gap-2 font-semibold text-dark-500"
          >
            <DownloadIcon className="image-download_icon" /> Download
          </button>
        )}
      </div>
      {image?.publicId && modificationConfig ? (
        <div>
          <div className="media-cld-container_cldImage">
            <div className="relative">
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
                  }, 7000)();
                }}
                {...modificationConfig}
              />
              {isModifying && (
                <div className="modifying-layer">
                  <SyncIcon className="animate-spin duration-700 rotate-180 image-syncIcon_icon" />
                </div>
              )}
            </div>
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
