"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function HslaToHex() {
  const [hslaValue, setHslaValue] = useState("hsla(0, 0%, 0%, 1)");
  const [hexValue, setHexValue] = useState("#000000");

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hex = event.target.value;
    setHexValue(hex);
  };

  const handleHslaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hsla = event.target.value;
    setHslaValue(hsla);
    const hslaValues = hsla.match(/\d+/g)?.map(Number);
    if (hslaValues && hslaValues.length === 4) {
      const [h, s, l, a] = hslaValues;
      convertHslaToHex(h, s / 100, l / 100, a / 255);
    }
  };

  const convertHslaToHex = (h: number, s: number, l: number, a: number) => {
    h /= 360;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
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

    const hexR = Math.round(r * 255).toString(16).padStart(2, "0");
    const hexG = Math.round(g * 255).toString(16).padStart(2, "0");
    const hexB = Math.round(b * 255).toString(16).padStart(2, "0");
    const hexA = Math.round(a * 255).toString(16).padStart(2, "0");

    setHexValue(`#${hexR}${hexG}${hexB}${hexA}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hexValue);
    toast("Hex Value copied!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
      <div className="bg-card p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">HSLA to Hex Converter</h1>

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

        {/* HSLA Input */}
        <div className="flex items-center mb-4 space-x-4">
          <label htmlFor="hsla-input" className="text-sm font-medium">
            HSLA
          </label>
          <input
            type="text"
            id="hsla-input"
            value={hslaValue}
            onChange={handleHslaChange}
            placeholder="e.g., hsla(240, 100%, 50%, 1)"
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
