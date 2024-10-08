import { FileTextIcon, ImageIcon, VideoIcon, PaletteIcon } from 'lucide-react';

export const getNavComponents = (t: any) => [
    {
        title: t("Navbar.pdf_tools_title", { en: "PDF Tools" }),
        href: "/pdftools",
        icon: FileTextIcon,
        description: t("Navbar.pdf_tools_description", { en: "Tools to manage and manipulate PDF files" }),
    },
    {
        title: t("Navbar.video_audio_tools_title", { en: "Video & Audio Tools" }),
        href: "/file-convert",
        icon: VideoIcon,
        description: t("Navbar.video_audio_tools_description", { en: "Tools to edit and convert video and audio files" }),
    },
    {
        title: t("Navbar.image_tools_title", { en: "Image Tools" }),
        href: "/image-convert",
        icon: ImageIcon,
        description: t("Navbar.image_tools_description", { en: "Tools to manipulate and convert image files" }),
    },
    {
        title: t("Navbar.color_tools_title", { en: "Color Tools" }),
        href: "/color-tools",
        icon: PaletteIcon,
        description: t("Navbar.color_tools_description", { en: "Tools to manage and generate color palettes" }),
    },
];
