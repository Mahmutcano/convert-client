import { Suspense } from "react";
import Loading from "./loading";
import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next";

// Define the props for the layout
interface WebToolLayoutProps {
  children: React.ReactNode;
  params: { toolType?: string }; // Optional param for dynamic title
}

// Create an async function to generate metadata for the web tool layout
export async function generateMetadata({
  params: { toolType }
}: {
  params: { toolType?: string };
}): Promise<Metadata> {
  const title = toolType
    ? `${toolType} - Color - Convert Plus`
    : "Color - Convert Plus";

  return constructMetadata({
    title, // Dynamic title
    description:
      "Explore a wide range of color tools including converters, editors, and analyzers. Convert Plus makes it easy to work with PDFs, images, videos, and more.",
    image: "/favicon.ico", // Set the path to your icon or image
    icons: "/favicon.ico",
    noIndex: false, // Set noIndex to true if you don't want this page to be indexed
  });
}

// The main layout component for web tool pages
export default function WebToolLayout({ children, params }: WebToolLayoutProps) {
  return (
    <main>
      {/* Use Suspense for lazy loading */}
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </main>
  );
}
