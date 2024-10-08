"use client";
import React, { useState } from "react";
import { toast } from "sonner";

export default function Component() {
  const [primaryColor, setPrimaryColor] = useState("#438e96");

  const generateShades = (color: string) => {
    const shades = [];
    for (let i = 1; i <= 11; i++) {
      shades.push(adjustColorBrightness(color, i / 12)); // 12'ye bölerek aşırı kararma engellenir
    }
    return shades.reverse(); // En açıktan en koyuya doğru sıralama
  };

  const adjustColorBrightness = (color: string, factor: number) => {
    const hex = color.replace("#", "");
    const r = Math.min(
      255,
      Math.floor(
        parseInt(hex.substring(0, 2), 16) +
        (255 - parseInt(hex.substring(0, 2), 16)) * factor
      )
    );
    const g = Math.min(
      255,
      Math.floor(
        parseInt(hex.substring(2, 4), 16) +
        (255 - parseInt(hex.substring(2, 4), 16)) * factor
      )
    );
    const b = Math.min(
      255,
      Math.floor(
        parseInt(hex.substring(4, 6), 16) +
        (255 - parseInt(hex.substring(4, 6), 16)) * factor
      )
    );

    return `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  };

  const handleCopy = (shade: string) => {
    navigator.clipboard.writeText(shade);
    toast(`Color ${shade} copied!`);
  };

  const handleCopyAll = () => {
    const shades = generateShades(primaryColor);
    const variables = shades
      .map((shade, index) => `--color-${index * 50 + 50}: ${shade};`)
      .join("\n");
    navigator.clipboard.writeText(variables);
    toast("All shades copied as CSS variables!");
  };

  const getTextColor = (shade: string) => {
    const hex = shade.replace("#", "");
    const brightness =
      (parseInt(hex.substring(0, 2), 16) * 299 +
        parseInt(hex.substring(2, 4), 16) * 587 +
        parseInt(hex.substring(4, 6), 16) * 114) /
      1000;
    return brightness > 125 ? "#000000" : "#ffffff";
  };

  const shades = generateShades(primaryColor);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
      <div className="text-center w-full max-w-3xl mt-20">
        <h1 className="text-4xl font-bold">CSS Color Generator</h1>
        <p className="mt-2 text-muted-foreground">
          Enter a hex code or use the color picker to generate color shades
        </p>
      </div>
      <div className="flex flex-col items-center space-y-4 w-full max-w-md">
        <div className="flex items-center p-2 bg-white border rounded-full shadow w-full">
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="w-10 h-10 p-0 border-none cursor-pointer"
          />
          <input
            type="text"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="ml-2 text-lg font-medium border-none outline-none flex-grow"
          />
        </div>
      </div>
      <div className="mt-8 w-full max-w-3xl">
        <h2 className="text-lg font-medium text-center">Generated Shades</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
          {shades.map((shade, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-2 rounded cursor-pointer shadow-md"
              style={{ backgroundColor: shade }}
              onClick={() => handleCopy(shade)}
            >
              <div
                className="text-sm font-medium"
                style={{ color: getTextColor(shade) }}
              >
                {index * 50 + 50}
              </div>
              <div
                className="text-xs"
                style={{ color: getTextColor(shade) }}
              >
                {shade.replace("#", "").toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex mt-8 space-x-4">
        <button
          onClick={handleCopyAll}
          className="text-sm font-medium text-muted-foreground p-2 rounded bg-muted shadow"
        >
          Copy All as CSS Variables
        </button>
      </div>
    </div>
  );
}
