import { Suspense } from "react";
import Loading from "./loading";
import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next";

// Define the props for the layout
interface CalculatorLayoutProps {
  children: React.ReactNode;
  params: { calculatorType?: string }; // Optional param for dynamic title
}

// Create an async function to generate metadata for the calculator layout
export async function generateMetadata({
  params: { calculatorType }
}: {
  params: { calculatorType?: string }
}): Promise<Metadata> {
  const title = calculatorType
    ? `${calculatorType} - Calculator - Convert Plus`
    : "Calculator Tools - Convert Plus";

  return constructMetadata({
    title, // Dynamic title
    description:
      "Explore a wide range of calculator tools for finance, math, health, and more. Convert Plus offers easy-to-use calculators to help you with any task.",
    image: "/favicon.ico", // Set the path to your icon or image
    icons: "/favicon.ico",
    noIndex: false,
  });
}

// The main layout component for the calculator pages
export default function CalculatorLayout({ children, params }: CalculatorLayoutProps) {
  return (
    <main>
      {/* Use Suspense for lazy loading */}
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </main>
  );
}
