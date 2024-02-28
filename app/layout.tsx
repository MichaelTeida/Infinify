import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Infinify",
  description: "AI-Powered SaaS Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ variables: { colorPrimary: "#e14622" } }}>
      <html lang="en">
        <body
          className={cn("font-spaceGrotesk antialiased", spaceGrotesk.variable)} // cn is to merge a couple of class names together
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
