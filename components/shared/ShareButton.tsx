"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ShareIcon from "@mui/icons-material/Share";
import XIcon from "@mui/icons-material/X";
import MailIcon from "@mui/icons-material/Mail";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const ShareButton = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Check out my image modified by Infinify: ${currentUrl}`;
  const title = "Modified image by Infinify";

  const handleXShare = () => {
    window.open(
      `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      "_blank",
      "width=600,height=400",
    );
    setShowDropdown(false);
  };

  const handleEmailShare = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText)}`;
    setShowDropdown(false);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: shareText,
          url: currentUrl,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setShowDropdown(!showDropdown)}
        variant="ghost"
        size="icon"
        className="flex items-center gap-2"
      >
        <ShareIcon />
      </Button>

      {showDropdown && (
        <>
          <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20 border">
            <button
              onClick={handleXShare}
              className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
            >
              <span className="align-middle mr-2">
                <XIcon />
              </span>
              share on X
            </button>

            <button
              onClick={handleEmailShare}
              className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
            >
              <span className="align-middle mr-2">
                <MailIcon />
              </span>
              share via Email
            </button>
            <button
              onClick={handleNativeShare}
              className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left md:hidden"
            >
              <span className="align-middle mr-2">
                <ArrowDownwardIcon />
              </span>
              more
            </button>
          </div>

          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowDropdown(false)}
          />
        </>
      )}
    </div>
  );
};

export default ShareButton;
