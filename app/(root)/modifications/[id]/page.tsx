import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/shared/Header";
import ModifiedImage from "@/components/shared/ModifiedImage";
import { Button } from "@/components/ui/button";
import { getImageById } from "@/lib/actions/image.actions";
import { getImageSize } from "@/lib/utils";
import React from "react";

const ImageDetails = async ({ params: { id } }: SearchParamProps) => {
  const { userId } = auth();
  const image = await getImageById(id);

  return (
    <>
      <Header title={image.title} />

      <section className="mt-4 flex flex-wrap gap-4">
        <div className="p-14-medium md:p-16-medium flex gap-2">
          <p className="text-dark-600">Modification Type:</p>
          <p className="capitalize text-purple-400">{image.modificationType}</p>
        </div>

        {image.prompt && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2 ">
              <p className="text-dark-600">Prompt:</p>
              <p className="capitalize text-purple-400">{image.prompt}</p>
            </div>
          </>
        )}

        {image.color && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2">
              <p className="text-dark-600">Color:</p>
              <p className="capitalize text-purple-400">{image.color}</p>
            </div>
          </>
        )}

        {image.aspectRatio && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2">
              <p className="text-dark-600">Aspect Ratio:</p>
              <p className="capitalize text-purple-400">{image.aspectRatio}</p>
            </div>
          </>
        )}
      </section>

      <section className="mt-8">
        <div className="media-upload-field">
          <div className="flex flex-col gap-4">
            <h3 className="media-header-text">Original</h3>
            <div className="media-cld-container_cldImage">
              <Image
                width={getImageSize(image.modificationType, image, "width")}
                height={getImageSize(image.modificationType, image, "height")}
                src={image.secureUrl}
                alt="image"
                className="modification-original_image"
              />
            </div>
          </div>

          <ModifiedImage
            image={image}
            type={image.modificationType}
            title={image.title}
            isModifying={false}
            modificationConfig={image.config}
            hasDownload={true}
          />
        </div>

        {userId === image.author.clerkId && (
          <div className="mt-4 space-y-4">
            <Button asChild type="button" className="submit-button capitalize">
              <Link href={`/modifications/${image._id}/update`}>
                Update Image
              </Link>
            </Button>
          </div>
        )}
      </section>
    </>
  );
};

export default ImageDetails;
