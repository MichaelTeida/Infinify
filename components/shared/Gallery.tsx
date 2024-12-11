"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { CldImage } from "next-cloudinary";

import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { modificationTypes } from "@/constants";
import { ImageModel } from "@/lib/database/models/image.model";
import { formUrlQuery } from "@/lib/utils";

import { Button } from "../ui/button";
import React from "react";

export const Gallery = ({
  hasSearch = false,
  images,
  totalPages = 1,
  page,
}: {
  images: ImageModel[];
  totalPages?: number;
  page: number;
  hasSearch?: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // PAGINATION HANDLER
  const onPageChange = (action: string) => {
    let pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1;

    if (pageValue < 1) {
      pageValue = 1;
    } else if (pageValue > totalPages) {
      pageValue = totalPages;
    }

    const newUrl = formUrlQuery({
      searchParams: searchParams.toString(),
      key: "page",
      value: pageValue,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <>
      <h2 className="gallery-title">Recent edits:</h2>
      {hasSearch && <Search />}

      {images.length > 0 ? (
        <ul className="gallery-grid">
          {images.map((image) => (
            <Card image={image} key={image._id} />
          ))}
        </ul>
      ) : (
        <div className="text-center py-6">
          <p className="text-lg font-semibold">Empty list</p>
        </div>
      )}

      <Pagination>
        <PaginationContent className="gallery-pagination">
          <Button
            disabled={Number(page) <= 1}
            className="gallery-pagination-button"
            onClick={() => onPageChange("prev")}
          >
            <PaginationPrevious className="gallery-pagination-button_text" />
          </Button>

          <p className="gallery-pagination-counter">
            {page} / {totalPages}
          </p>

          <Button
            className="gallery-pagination-button"
            onClick={() => onPageChange("next")}
            disabled={Number(page) >= totalPages}
          >
            <PaginationNext className="gallery-pagination-button_text" />
          </Button>
        </PaginationContent>
      </Pagination>
    </>
  );
};

const Card = ({ image }: { image: ImageModel }) => {
  const IconComponent =
    modificationTypes[image.modificationType as keyof typeof modificationTypes]
      ?.icon;

  return (
    <li className="gallery-grid-card">
      <Link href={`/modifications/${image._id}`} className="block">
        <CldImage
          src={image.publicId}
          alt={image.title}
          width={image.width}
          height={image.height}
          {...image.config}
          loading="lazy"
          className="gallery-grid-card_image"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
        />
        <div className="gallery-grid-card_description">
          <p className="gallery-grid-card_description-text">{image.title}</p>
          {IconComponent && <IconComponent className="w-6 h-6" />}
        </div>
      </Link>
    </li>
  );
};
