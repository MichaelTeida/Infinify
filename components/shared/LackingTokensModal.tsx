"use client";

import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const LackingTokensModal = () => {
  const router = useRouter();

  // @ts-ignore
  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent className="pt-7">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center font-bold text-[18px] md:text-[24px] text-gray-800">
            Hold on! Your token balance has reached zero.
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center pt-2 pb-3">
            Don&apos;t worry - you can continue using our platform by purchasing
            additional tokens.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="modal-button-second"
            onClick={() => router.push("/profile")}
          >
            Maybe later
          </AlertDialogCancel>
          <AlertDialogAction
            className="modal-button"
            onClick={() => router.push("/tokens")}
          >
            Get tokens
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
