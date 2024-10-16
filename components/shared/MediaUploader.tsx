import { useToast } from "@/hooks/use-toast";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";

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
            <>IMAGE</>
          ) : (
            <div onClick={() => open()} className="media-cta_container">
              <div className="media-cta_icon-box">
                <AddIcon className="image-add_icon" />
              </div>
              <p className="media-cta_text">Click to upload image</p>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default MediaUploader;
