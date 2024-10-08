"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function Component() {
  const [hexValue, setHexValue] = useState("#000000");
  const [rgbValue, setRgbValue] = useState("0, 0, 0");

  const handleHexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setHexValue(value);
    convertHexToRgb(value);
  };

  const convertHexToRgb = (hex: string) => {
    let r, g, b;
    if (hex.length === 4) {
      r = "0x" + hex[1] + hex[1];
      g = "0x" + hex[2] + hex[2];
      b = "0x" + hex[3] + hex[3];
    } else if (hex.length === 7) {
      r = "0x" + hex[1] + hex[2];
      g = "0x" + hex[3] + hex[4];
      b = "0x" + hex[5] + hex[6];
    } else {
      setRgbValue("Invalid hex code");
      return;
    }
    r = +r;
    g = +g;
    b = +b;
    setRgbValue(`${r}, ${g}, ${b}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(rgbValue);
    toast("RGB Value copied!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
      <div className="bg-card p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Hex to RGB Converter</h1>

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

        {/* RGB Output */}
        <div className="flex items-center mb-4 space-x-4">
          <label htmlFor="rgb-output" className="text-sm font-medium">
            RGB
          </label>
          <input
            type="text"
            id="rgb-output"
            value={rgbValue}
            readOnly
            className="px-4 py-2 rounded-md border border-input bg-input text-input-foreground focus:outline-none focus:ring-2 focus:ring-primary w-full"
            style={{ backgroundColor: `rgb(${rgbValue})` }}
          />
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md shadow hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Copy RGB Value
        </button>
      </div>
    </div>
  );
}
