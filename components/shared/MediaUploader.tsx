"use client";
import { useToast } from "@/hooks/use-toast";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import AddIcon from "@mui/icons-material/Add";
import { dataUrl, getImageSize } from "@/lib/utils";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

type MediaUploaderProps = {
  onValueChange: (value: string) => void;
  setImage: React.Dispatch<any>;
  image: string;
  publicId: any;
  type: string;
};

const MediaUploader = ({
  onValueChange,
  setImage,
  publicId,
  image,
  type,
}: MediaUploaderProps) => {
  const { toast } = useToast();

  const onUploadSuccessHandler = (result: any) => {
    toast({
      title: "Successfully uploaded",
      description: "1 token was used",
      duration: 4000,
      className: "media-success-toast",
    });

    setImage((prevState: any) => ({
      ...prevState,
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureUrl: result?.info?.secure_url,
    }));

    onValueChange(result?.info?.public_id);
  };
  const onUploadErrorHandler = () => {
    toast({
      title: "An error occurred during the upload",
      description: "Please try again later",
      duration: 4000,
      className: "media-error-toast",
    });
  };

  return (
    <CldUploadWidget
      uploadPreset="infinify_preset"
      options={{ multiple: false, resourceType: "image" }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => (
        <div className="flex flex-col gap-4">
          <h3 className="media-header-text">Original</h3>
          {publicId ? (
            <>
              <div className="media-cld-container_cldImage cursor-pointer">
                <CldImage
                  width={getImageSize(type, image, "width")}
                  height={getImageSize(type, image, "height")}
                  src={publicId}
                  alt={image}
                  sizes={"(max-width: 767px) 90vw, 45vw"}
                  placeholder={dataUrl as PlaceholderValue}
                  className="media-cld_cldImage"
                />
              </div>
            </>
          ) : (
            <div
              onClick={() => open()}
              className="media-cld_container cursor-pointer"
            >
              <div className="media-cld_icon-box">
                <AddIcon className="image-add_icon" />
              </div>
              <p className="media-cld_text">Click to upload image</p>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default MediaUploader;
