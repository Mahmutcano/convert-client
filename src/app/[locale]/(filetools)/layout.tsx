import { Suspense } from "react";
import Loading from "./loading";
import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next";

// Define the props for the layout
interface FileToolLayoutProps {
  children: React.ReactNode;
  params: { fileToolType?: string }; // Optional param for dynamic title
}

// Create an async function to generate metadata for the file tool layout
export async function generateMetadata({
  params: { fileToolType }
}: {
  params: { fileToolType?: string };
}): Promise<Metadata> {
  const title = fileToolType
    ? `${fileToolType} - Video & Audio Convert - Convert Plus`
    : "Video & Audio Convert - Convert Plus";

  return constructMetadata({
    title, // Dynamic title
    description:
      "Easily convert and edit video and audio files with Convert Plus. Fast, user-friendly tools for all your video and audio conversion needs.",
    image: "/favicon.ico", // Set the path to your icon or image
    icons: "/favicon.ico",
    noIndex: false, // Set noIndex to true if you don't want this page to be indexed
  });
}

// The main layout component for file tool pages (Video & Audio conversion)
export default function FileToolLayout({ children, params }: FileToolLayoutProps) {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </main>
  );
}
