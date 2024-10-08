"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function Component() {
  const [rgbValue, setRgbValue] = useState("0, 0, 0");
  const [hexValue, setHexValue] = useState("#000000");

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hex = event.target.value;
    setHexValue(hex);
    convertHexToRgb(hex);
  };

  const convertHexToRgb = (hex: string) => {
    // HEX değerini RGB'ye çevir
    let r, g, b;
    if (hex.length === 7) {
      r = parseInt(hex.slice(1, 3), 16);
      g = parseInt(hex.slice(3, 5), 16);
      b = parseInt(hex.slice(5, 7), 16);
    } else {
      return setRgbValue("Invalid hex code");
    }
    setRgbValue(`${r}, ${g}, ${b}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hexValue);
    toast("HEX Value copied!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
      <div className="bg-card p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">RGB to Hex Converter</h1>

        {/* RGB Output */}
        <div className="flex items-center mb-4 space-x-4">
          <label htmlFor="rgb-output" className="text-sm font-medium">
            RGB
          </label>
          <input
            type="color"
            id="color-input"
            value={hexValue}
            onChange={handleColorChange}
            className="w-12 h-12 p-0 border-none cursor-pointer rounded bg-transparent"
          />
          <input
            type="text"
            id="rgb-output"
            value={rgbValue}
            readOnly
            className="px-4 py-2 rounded-md border border-input bg-input text-input-foreground focus:outline-none focus:ring-2 focus:ring-primary w-full"
          />
        </div>

        {/* HEX Output */}
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
