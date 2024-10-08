import { FileText, Text, Code, PanelTop, Cable, DraftingCompass } from "lucide-react";

export const getServices = (t: any) => [
  { icon: FileText, title: t('pdf_tools_title'), description: t('pdf_tools_description'), link: "/pdftools" },
  { icon: Text, title: t('video_and_audio_title'), description: t('video_and_audio_description'), link: "/file-convert" },
  { icon: PanelTop, title: t('image_title'), description: t('image_description'), link: "/image-convert" },
  { icon: PanelTop, title: t('calculators_title'), description: t('calculators_description'), link: "/calculator" },
  { icon: Code, title: t('color_tools_title'), description: t('color_tools_description'), link: "/color-tools" },
  { icon: FileText, title: t('conversions_title'), description: t('conversions_description'), link: "/conversions" },
];