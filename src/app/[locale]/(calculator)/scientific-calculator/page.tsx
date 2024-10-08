"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ScientificCalculator() {
  const [display, setDisplay] = useState("0")
  const [memory, setMemory] = useState(0)

  const handleButtonClick = (value: string) => {
    setDisplay((prev) => {
      if (prev === "0" && !isNaN(Number(value))) {
        return value
      }
      return prev + value
    })
  }

  const handleClear = () => {
    setDisplay("0")
  }

  const handleCalculate = () => {
    try {
      // Replace 'sin', 'cos', 'tan' with their Math equivalents
      const expression = display
        .replace(/sin/g, "Math.sin")
        .replace(/cos/g, "Math.cos")
        .replace(/tan/g, "Math.tan")
        .replace(/log/g, "Math.log10")
        .replace(/ln/g, "Math.log")
        .replace(/√/g, "Math.sqrt")
        .replace(/π/g, "Math.PI")
        .replace(/e/g, "Math.E")
      
      // eslint-disable-next-line no-eval
      const result = eval(expression)
      setDisplay(result.toString())
    } catch (error) {
      setDisplay("Error")
    }
  }

  const handleMemoryOperation = (operation: string) => {
    switch (operation) {
      case "M+":
        setMemory(memory + parseFloat(display))
        break
      case "M-":
        setMemory(memory - parseFloat(display))
        break
      case "MR":
        setDisplay(memory.toString())
        break
      case "MC":
        setMemory(0)
        break
    }
  }

  const buttons = [
    "sin", "cos", "tan", "log",
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+",
    "π", "e", "√", "^",
    "(", ")", "M+", "M-",
    "MR", "MC", "C", "←"
  ]

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-lg py-32">
      <Input
        type="text"
        value={display}
        readOnly
        className="w-full mb-4 text-right text-2xl p-2 bg-white"
      />
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((btn) => (
          <Button
            key={btn}
            onClick={() => {
              if (btn === "=") handleCalculate()
              else if (btn === "C") handleClear()
              else if (btn === "←") setDisplay(prev => prev.slice(0, -1) || "0")
              else if (["M+", "M-", "MR", "MC"].includes(btn)) handleMemoryOperation(btn)
              else handleButtonClick(btn)
            }}
            className="p-2 text-lg font-semibold"
            variant={["=", "C", "←"].includes(btn) ? "destructive" : "default"}
          >
            {btn}
          </Button>
        ))}
      </div>
    </div>
  )
}