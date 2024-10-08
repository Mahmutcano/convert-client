import { FileTextIcon, FileImageIcon } from 'lucide-react';

export const getPdfTools = (t: any) => [
  { title: t('wordToPdfTitle'), description: t('wordToPdfDescription'), link: "/word-to-pdf" },
  { title: t('pdfToWordTitle'), description: t('pdfToWordDescription'), link: "/pdf-to-word" },
  { title: t('excelToPdfTitle'), description: t('excelToPdfDescription'), link: "/excel-to-pdf" },
  { title: t('pdfToExcelTitle'), description: t('pdfToExcelDescription'), link: "/pdf-to-excel" },
  { title: t('pptToPdfTitle'), description: t('pptToPdfDescription'), link: "/powerpoint-to-pdf" },
  { title: t('pdfToPptTitle'), description: t('pdfToPptDescription'), link: "/pdf-to-powerpoint" },
  { title: t('txtToPdfTitle'), description: t('txtToPdfDescription'), link: "/txt-to-pdf" },
  { title: t('pdfToTxtTitle'), description: t('pdfToTxtDescription'), link: "/pdf-to-txt" },
  { title: t('htmlToPdfTitle'), description: t('htmlToPdfDescription'), link: "/html-to-pdf" },
  { title: t('compressPdfTitle'), description: t('compressPdfDescription'), link: "/compress-pdf" },
  { title: t('splitPdfTitle'), description: t('splitPdfDescription'), link: "/split-pdf" },  // Split PDF
  { title: t('mergePdfTitle'), description: t('mergePdfDescription'), link: "/merge-pdf" },  // Merge PDF
];
