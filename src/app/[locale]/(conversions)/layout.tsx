import { Suspense } from "react";
import Loading from "./loading";
import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next";

// Define the props for the layout
interface ConversionsLayoutProps {
  children: React.ReactNode;
  params: { conversionType?: string }; // Optional param for dynamic title
}

// Create an async function to generate metadata for the conversions layout
export async function generateMetadata({
  params: { conversionType }
}: {
  params: { conversionType?: string };
}): Promise<Metadata> {
  const title = conversionType
    ? `${conversionType} - Conversions - Convert Plus`
    : "Conversions - Convert Plus";

  return constructMetadata({
    title, // Dynamic title
    description:
      "Easily convert between various formats including units, data, and more. Convert Plus offers fast and easy-to-use conversion tools for all your needs.",
    image: "/favicon.ico", // Set the path to your icon or image
    icons: "/favicon.ico",
    noIndex: false, // Set noIndex to true if you don't want this page to be indexed
  });
}

// The main layout component for conversions pages
export default function ConversionsLayout({ children, params }: ConversionsLayoutProps) {
  return (
    <main>
      {/* Use Suspense for lazy loading */}
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </main>
  );
}
