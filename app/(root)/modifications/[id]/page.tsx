import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/shared/Header";
import ModifiedImage from "@/components/shared/ModifiedImage";
import { Button } from "@/components/ui/button";
import { getImageById } from "@/lib/actions/image.actions";
import { getImageSize } from "@/lib/utils";
import React from "react";
import ShareButton from "@/components/shared/ShareButton";

const ImageDetails = async ({ params: { id } }: SearchParamProps) => {
  const { userId } = auth();
  const image = await getImageById(id);

  return (
    <>
      <div className="flex justify-between items-center">
        <Header title={"Modification details"} />
        <ShareButton />
      </div>

      <section className="mt-4 flex flex-wrap flex-col md:flex-row gap-2 md:gap-4 media-cld-container_cldImage">
        <div className="flex gap-2">
          <p className="text-dark-600">Title:</p>
          <p className="capitalize text-orange-600">{image.title}</p>
        </div>

        {image.modificationType && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="flex gap-2">
              <p className="text-dark-600">Type:</p>
              <p className="capitalize text-orange-600">
                {image.modificationType}
              </p>
            </div>
          </>
        )}

        {image.createdAt && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="flex gap-2 ">
              <p className="text-dark-600">Created at:</p>
              <p className="capitalize text-orange-600">
                {new Date(image.createdAt).toLocaleDateString()}
              </p>
            </div>
          </>
        )}

        {image.author && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="flex gap-2 ">
              <p className="text-dark-600">Author:</p>
              <p className="text-orange-600">
                {image.author.firstName} {image.author.lastName}
              </p>
            </div>
          </>
        )}

        {image.width && image.height && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="flex gap-2 ">
              <p className="text-dark-600">Size:</p>
              <p className="text-orange-600">
                {image.width}x{image.height} pixels
              </p>
            </div>
          </>
        )}

        {image.prompt && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="flex gap-2 ">
              <p className="text-dark-600">Prompt:</p>
              <p className="capitalize text-orange-600">{image.prompt}</p>
            </div>
          </>
        )}

        {image.color && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="flex gap-2">
              <p className="text-dark-600">Color:</p>
              <p className="capitalize text-orange-600">{image.color}</p>
            </div>
          </>
        )}

        {image.aspectRatio && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="flex gap-2">
              <p className="text-dark-600">Aspect Ratio:</p>
              <p className="capitalize text-orange-600">{image.aspectRatio}</p>
            </div>
          </>
        )}
      </section>

      <section className="mt-8 space-y-8">
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
          <div className="flex flex-col md:flex-row md:justify-end gap-4">
            <Button
              asChild
              type="button"
              className="submit-button-mobile md:submit-button"
            >
              <Link href={`/modifications/${image._id}/update`}>
                Update image
              </Link>
            </Button>
          </div>
        )}
      </section>
    </>
  );
};

export default ImageDetails;
