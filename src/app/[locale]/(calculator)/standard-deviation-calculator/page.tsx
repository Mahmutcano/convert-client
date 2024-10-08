"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from 'next-intl';

export default function StandardDeviationCalculator() {
    const t = useTranslations('CalcTools');
    const [data, setData] = useState<string>(""); // Raw data input as string
    const [result, setResult] = useState<number | null>(null);

    const calculateStandardDeviation = () => {
        const values = data.split(',').map((val) => parseFloat(val.trim())).filter((val) => !isNaN(val)); // Parse the input
        if (values.length > 0) {
            const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
            const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;
            const stdDeviation = Math.sqrt(variance);
            setResult(parseFloat(stdDeviation.toFixed(2))); // Set the result rounded to 2 decimals
        } else {
            setResult(null); // Handle case when input is invalid
        }
    };

    const handleInputChange = (value: string) => {
        setData(value.replace(/[^0-9.,]/g, "")); // Only allow numbers, commas, and periods
    };

    return (
        <Card className="w-full h-screen flex flex-col justify-center items-center py-24 md:py-24 lg:py-24">
            <CardHeader>
                <CardTitle className="flex justify-center">{t('standardDeviationCalculatorTitle')}</CardTitle>
                <CardDescription className="flex justify-center">{t('standardDeviationCalculatorDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-1">
                    <div className="space-y-2">
                        <Label htmlFor="dataInput">{t('data')}</Label>
                        <Input
                            id="dataInput"
                            type="text"
                            value={data}
                            onChange={(e) => handleInputChange(e.target.value)}
                            placeholder={t('enterData')}
                        />
                    </div>
                    <div className="space-y-2">
                        <button
                            onClick={calculateStandardDeviation}
                            className="py-2 px-4 bg-primary text-white rounded-md">
                            {t('calculate')}
                        </button>
                    </div>
                    {result !== null && (
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">{t('result')}</h3>
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <p className="text-2xl font-bold">{result}</p>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
