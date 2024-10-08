"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function HexToHsla() {
  const [hexValue, setHexValue] = useState("#000000");
  const [hslaValue, setHslaValue] = useState("hsla(0, 0%, 0%, 1)");

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hex = event.target.value;
    setHexValue(hex);
    convertHexToHsla(hex);
  };

  const convertHexToHsla = (hex: string) => {
    let r, g, b, a = 1;

    if (hex.length === 7 || hex.length === 9) {
      r = parseInt(hex.slice(1, 3), 16);
      g = parseInt(hex.slice(3, 5), 16);
      b = parseInt(hex.slice(5, 7), 16);
      if (hex.length === 9) {
        a = parseInt(hex.slice(7, 9), 16) / 255;
      }
    } else {
      setHslaValue("Invalid hex code");
      return;
    }

    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
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

    setHslaValue(`hsla(${(h * 360).toFixed(1)}, ${(s * 100).toFixed(1)}%, ${(l * 100).toFixed(1)}%, ${a})`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hslaValue);
    toast("HSLA Value copied!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
      <div className="bg-card p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Hex to HSLA Converter</h1>

        {/* Color Picker */}
        <div className="flex items-center mb-4 space-x-4">
          <label htmlFor="color-input" className="text-sm font-medium">
            Select Color
          </label>
          <input
            type="color"
            id="color-input"
            value={hexValue}
            onChange={handleColorChange}
            className="w-12 h-12 p-0 border-none cursor-pointer rounded bg-transparent"
          />
        </div>

        {/* HSLA Output */}
        <div className="flex items-center mb-4 space-x-4">
          <label htmlFor="hsla-output" className="text-sm font-medium">
            HSLA
          </label>
          <input
            type="text"
            id="hsla-output"
            value={hslaValue}
            readOnly
            className="px-4 py-2 rounded-md border border-input bg-input text-input-foreground focus:outline-none focus:ring-2 focus:ring-primary w-full"
          />
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md shadow hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Copy HSLA Value
        </button>
      </div>
    </div>
  );
}
