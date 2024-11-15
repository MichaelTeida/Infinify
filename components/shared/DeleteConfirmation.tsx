"use client";

import { useTransition } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteImage } from "@/lib/actions/image.actions";

import { Button } from "../ui/button";

export const DeleteConfirmation = ({ imageId }: { imageId: string }) => {
  const [isLoading, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="w-full rounded-full">
        <Button
          type="button"
          className="submit-button-alert-mobile md:submit-button-alert"
        >
          Remove image
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="pt-7">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center font-bold text-[18px] md:text-[24px] text-gray-800">
            Do you want to delete this image?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center pt-2 pb-3">
            This image will be permanently deleted and cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="modal-button-second-alert">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="submit-button-alert-mobile md:submit-button-alert"
            onClick={() =>
              startTransition(async () => {
                await deleteImage(imageId);
              })
            }
          >
            {isLoading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
