"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function HslToHexConverter() {
  const [hslValue, setHslValue] = useState("0, 0%, 0%");
  const [hexValue, setHexValue] = useState("#000000");

  // HSL to Hex Conversion
  const handleHslChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setHslValue(value);
    const [h, s, l] = value.split(",").map((val) => parseFloat(val.trim().replace("%", "")));
    convertHslToHex(h, s, l);
  };

  const convertHslToHex = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 3) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    const hex = `#${Math.round(r * 255).toString(16).padStart(2, '0')}${Math.round(g * 255).toString(16).padStart(2, '0')}${Math.round(b * 255).toString(16).padStart(2, '0')}`;
    setHexValue(hex);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hexValue);
    toast("Hex Value copied!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
      <div className="bg-card p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">HSL to Hex Converter</h1>

        {/* HSL Input */}
        <div className="flex items-center mb-4 space-x-4">
          <label htmlFor="hsl-input" className="text-sm font-medium">
            HSL
          </label>
          <input
            type="text"
            id="hsl-input"
            value={hslValue}
            onChange={handleHslChange}
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
            style={{ backgroundColor: hexValue }}
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
