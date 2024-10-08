"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function HexToHslConverter() {
  const [hexValue, setHexValue] = useState("#000000");
  const [hslValue, setHslValue] = useState("0, 0%, 0%");

  // Hex to HSL Conversion
  const handleHexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setHexValue(value);
    convertHexToHsl(value);
  };

  const convertHexToHsl = (hex: string) => {
    // Convert hex to RGB first
    let r, g, b;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    } else {
      setHslValue("Invalid hex code");
      return;
    }

    // Convert RGB to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    setHslValue(`${(h * 360).toFixed(1)}, ${(s * 100).toFixed(1)}%, ${(l * 100).toFixed(1)}%`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hslValue);
    toast("HSL Value copied!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
      <div className="bg-card p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Hex to HSL Converter</h1>

        {/* Hex Color Picker */}
        <div className="flex items-center mb-4 space-x-4">
          <label htmlFor="hex-input" className="text-sm font-medium">
            Hex
          </label>
          <input
            type="color"
            id="hex-input"
            value={hexValue}
            onChange={handleHexChange}
            className="w-12 h-12 p-0 border-none cursor-pointer rounded bg-transparent"
          />
          <input
            type="text"
            value={hexValue}
            onChange={handleHexChange}
            className="px-4 py-2 rounded-md border border-input bg-input text-input-foreground focus:outline-none focus:ring-2 focus:ring-primary w-full"
          />
        </div>

        {/* HSL Output */}
        <div className="flex items-center mb-4 space-x-4">
          <label htmlFor="hsl-output" className="text-sm font-medium">
            HSL
          </label>
          <input
            type="text"
            id="hsl-output"
            value={hslValue}
            readOnly
            className="px-4 py-2 rounded-md border border-input bg-input text-input-foreground focus:outline-none focus:ring-2 focus:ring-primary w-full"
            style={{ backgroundColor: `hsl(${hslValue})` }}
          />
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md shadow hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Copy HSL Value
        </button>
      </div>
    </div>
  );
}
