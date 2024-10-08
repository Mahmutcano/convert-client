"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

export default function Component() {
  const [angle, setAngle] = useState<number>(45);
  const [colors, setColors] = useState<string[]>(["#6366f1", "#ec4899"]);

  const gradient = `linear-gradient(${angle}deg, ${colors.join(", ")})`;

  const handleAddColor = () => {
    setColors([...colors, "#ffffff"]); // Yeni bir renk eklemek için varsayılan beyaz renk
  };

  const handleRemoveColor = (index: number) => {
    const newColors = colors.filter((_, i) => i !== index);
    setColors(newColors);
  };

  const handleColorChange = (index: number, value: string) => {
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`background: ${gradient};`);
    toast("CSS kopyalandı!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-4 md:px-0">
      <div className="max-w-3xl w-full px-4 py-24 space-y-6 text-center">
        <h1 className="text-4xl font-bold">Gradient Generator</h1>
        <p className="text-muted-foreground">
          Create beautiful gradient backgrounds for your projects.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="max-h-60 overflow-y-auto space-y-4 border border-gray-300 p-4 rounded-lg">
              {colors.map((color, index) => (
                <div className="flex items-center justify-between gap-4" key={index}>
                  <div className="flex-grow">
                    <label
                      htmlFor={`color${index}`}
                      className="block mb-2 text-sm font-medium text-muted-foreground"
                    >
                      Color {index + 1}
                    </label>
                    <Input
                      id={`color${index}`}
                      type="color"
                      value={color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="mt-6"
                    onClick={() => handleRemoveColor(index)}
                    disabled={colors.length <= 2}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full" onClick={handleAddColor}>
              + Add Color
            </Button>
            <div className="mt-4">
              <label
                htmlFor="angle"
                className="block mb-2 text-sm font-medium text-muted-foreground"
              >
                Angle
              </label>
              <Slider
                defaultValue={[angle]}
                max={360}
                step={1}
                onValueChange={(value) => setAngle(value[0])}
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div
              className="w-full h-72 rounded-lg"
              style={{ background: gradient }}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <pre className="text-sm text-muted-foreground">{`background: ${gradient};`}</pre>
          </div>
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <CopyIcon className="w-4 h-4 mr-2" />
            Copy CSS
          </Button>
        </div>
      </div>
    </div>
  );
}

function CopyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}
