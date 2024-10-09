import { FileTextIcon, VideoIcon, ImageIcon, PaletteIcon, Calculator, Dumbbell } from "lucide-react";

export const getServices = (t: any) => [
  { icon: FileTextIcon, title: t('pdf_tools_title'), description: t('pdf_tools_description'), link: "/pdftools" },
  { icon: VideoIcon, title: t('video_and_audio_title'), description: t('video_and_audio_description'), link: "/file-convert" },
  { icon: ImageIcon, title: t('image_title'), description: t('image_description'), link: "/image-convert" },
  { icon: Calculator, title: t('calculators_title'), description: t('calculators_description'), link: "/calculator" },
  { icon: PaletteIcon, title: t('color_tools_title'), description: t('color_tools_description'), link: "/color-tools" },
  { icon: Dumbbell, title: t('conversions_title'), description: t('conversions_description'), link: "/conversions" },
];