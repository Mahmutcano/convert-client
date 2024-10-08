import { Suspense } from "react";
import Loading from "../loading";
import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next";

// Define the props for the layout
interface ImageToolLayoutProps {
  children: React.ReactNode;
  params: { imageToolType?: string }; // Optional param for dynamic title
}

// Create an async function to generate metadata for the image tool layout
export async function generateMetadata({
  params: { imageToolType }
}: {
  params: { imageToolType?: string };
}): Promise<Metadata> {
  const title = imageToolType
    ? `${imageToolType} - Image Convert - Convert Plus`
    : "Image Convert - Convert Plus";

  return constructMetadata({
    title, // Dynamic title
    description:
      "Convert and manipulate images effortlessly with Convert Plus. Tools for image resizing, conversion, and editing made simple and effective.",
    image: "/favicon.ico", // Set the path to your icon or image
    icons: "/favicon.ico",
    noIndex: false, // Set noIndex to true if you don't want this page to be indexed
  });
}

// The main layout component for image tool pages (Image manipulation and conversion)
export default function ImageToolLayout({ children, params }: ImageToolLayoutProps) {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </main>
  );
}
