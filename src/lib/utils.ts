import { type ClassValue, clsx } from "clsx"
import { Metadata } from "next"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function constructMetadata({
  title = "Convert Plus - tools for everyone",
  description = "Convert, compress, edit, and analyze with ease. Tools for PDFs, text, images, code, web, finance, electricity, math, and ecology.",
  image = "/favicon.ico",
  icons = "/favicon.ico",
  noIndex = false
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@Mahmutcano"
    },
    icons,
    metadataBase: new URL('http://localhost:3000'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  }
}

// Export themeColor separately as part of viewport
export const viewport = {
  themeColor: "#FFF"
}
