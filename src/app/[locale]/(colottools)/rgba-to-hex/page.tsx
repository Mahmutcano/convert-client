"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function RgbaToHex() {
  const [rgbaValue, setRgbaValue] = useState("rgba(0, 0, 0, 1)");
  const [hexValue, setHexValue] = useState("#000000");

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hex = event.target.value;
    setHexValue(hex);
    convertHexToRgba(hex);  // For color picker to work correctly
  };

  const handleRgbaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rgba = event.target.value;
    setRgbaValue(rgba);
    const rgbaValues = rgba.match(/\d+/g)?.map(Number);
    if (rgbaValues && rgbaValues.length === 4) {
      const [r, g, b, a] = rgbaValues;
      convertRgbaToHex(r, g, b, a / 255);
    }
  };

  const convertRgbaToHex = (r: number, g: number, b: number, a: number) => {
    const hexR = r.toString(16).padStart(2, "0");
    const hexG = g.toString(16).padStart(2, "0");
    const hexB = b.toString(16).padStart(2, "0");
    const hexA = Math.round(a * 255).toString(16).padStart(2, "0");
    setHexValue(`#${hexR}${hexG}${hexB}${hexA}`);
  };

  const convertHexToRgba = (hex: string) => {
    let r, g, b, a = 1;
    if (hex.length === 7 || hex.length === 9) {
      r = parseInt(hex.slice(1, 3), 16);
      g = parseInt(hex.slice(3, 5), 16);
      b = parseInt(hex.slice(5, 7), 16);
      if (hex.length === 9) {
        a = parseInt(hex.slice(7, 9), 16) / 255;
      }
      setRgbaValue(`rgba(${r}, ${g}, ${b}, ${a})`);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hexValue);
    toast("Hex Value copied!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
      <div className="bg-card p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">RGBA to Hex Converter</h1>

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

        {/* RGBA Input */}
        <div className="flex items-center mb-4 space-x-4">
          <label htmlFor="rgba-input" className="text-sm font-medium">
            RGBA
          </label>
          <input
            type="text"
            id="rgba-input"
            value={rgbaValue}
            onChange={handleRgbaChange}
            placeholder="e.g., rgba(255, 0, 0, 1)"
            className="px-4 py-2 rounded-md border border-input bg-input text-input-foreground focus:outline-none focus:ring-2 focus:ring-primary w-full"
          />
        </div>

        {/* Hex Output */}
        <div className="flex items-center mb-4 space-x-4">
          <label htmlFor="hex-output" className="text-sm font-medium">
            Hex
          </label>
          <input
            type="text"
            id="hex-output"
            value={hexValue}
            readOnly
            className="px-4 py-2 rounded-md border border-input bg-input text-input-foreground focus:outline-none focus:ring-2 focus:ring-primary w-full"
          />
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md shadow hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Copy Hex Value
        </button>
      </div>
    </div>
  );
}
