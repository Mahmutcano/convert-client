import { CodeIcon } from 'lucide-react';

export const getColorTools = (t: any) => [
  // Color Tools
  // { title: t('color'), description: t('colorDescription'), link: "/color-pallete" },
  { title: t('gradientGenerator'), description: t('gradientGeneratorDescription'), link: "/gradient-color" },
  { title: t('hexToRgb'), description: t('hexToRgbDescription'), link: "/hex-to-rgb" },
  { title: t('rgbToHex'), description: t('rgbToHexDescription'), link: "/rgb-to-hex" },
  { title: t('colorGenerator'), description: t('colorGeneratorDescription'), link: "/color-generator" },
  { title: t('hexToHsl'), description: t('hexToHslDescription'), link: "/hex-to-hsl" },
  { title: t('hslToHex'), description: t('hslToHexDescription'), link: "/hsl-to-hex" },
  { title: t('hexToHsla'), description: t('hexToHslaDescription'), link: "/hex-to-hsla" },
  { title: t('hslaToHex'), description: t('hslaToHexDescription'), link: "/hsla-to-hex" },
  { title: t('hexToRgba'), description: t('hexToRgbaDescription'), link: "/hex-to-rgba" },
  { title: t('rgbaToHex'), description: t('rgbaToHexDescription'), link: "/rgba-to-hex" },
];
