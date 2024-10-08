import { getCalcTools } from "./calculatorSelection";
import { getColorTools } from "./colorSelection";
import { getConversionsTools } from "./conversionsSelection";
import { getPdfTools } from "./pdfSelection";

export const getSitemap = (t: any) => [
  ...getPdfTools(t),    // PDF tools
  ...getCalcTools(t),   // Calculation tools
  ...getColorTools(t),  // Color tools
  ...getConversionsTools(t)  // Conversion tools
];