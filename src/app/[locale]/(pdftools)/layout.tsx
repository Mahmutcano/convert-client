import { Suspense } from "react";
import Loading from "./loading";
import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next";

// Define the props for the layout
interface PdfToolLayoutProps {
  children: React.ReactNode;
  params: { pdfToolType?: string }; // Optional param for dynamic title
}

// Create an async function to generate metadata for the PDF tool layout
export async function generateMetadata({
  params: { pdfToolType }
}: {
  params: { pdfToolType?: string };
}): Promise<Metadata> {
  const title = pdfToolType
    ? `${pdfToolType} - PDF Tools - Convert Plus`
    : "PDF Tools - Convert Plus";

  return constructMetadata({
    title, // Dynamic title
    description:
      "Convert and manipulate PDF files easily with Convert Plus. Tools for merging, splitting, compressing, converting, and editing PDFs.",
    image: "/favicon.ico", // Set the path to your icon or image
    icons: "/favicon.ico",
    noIndex: false, // Set noIndex to true if you don't want this page to be indexed
  });
}

// The main layout component for PDF tool pages (PDF manipulation and conversion)
export default function PdfToolLayout({ children, params }: PdfToolLayoutProps) {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </main>
  );
}
