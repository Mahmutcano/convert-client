"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from 'next-intl';

export default function RandomNumberGenerator() {
    const t = useTranslations('CalcTools');
    const [minValue, setMinValue] = useState<number>(0);
    const [maxValue, setMaxValue] = useState<number>(100);
    const [randomNumber, setRandomNumber] = useState<number | null>(null);

    const generateRandomNumber = () => {
        const random = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
        setRandomNumber(random);
    };

    const handleInputChange = (setValue: React.Dispatch<React.SetStateAction<number>>, value: string) => {
        let sanitizedValue = value.replace(/\D/g, ""); // Only allow digits
        setValue(Number(sanitizedValue) || 0); // Default to 0 if empty
    };

    return (
        <Card className="w-full h-screen flex flex-col justify-center items-center py-24 md:py-24 lg:py-24">
            <CardHeader>
                <CardTitle className="flex justify-center">{t('randomNumberGeneratorTitle')}</CardTitle>
                <CardDescription className="flex justify-center">{t('randomNumberGeneratorDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    {/* Min Value */}
                    <div className="space-y-2">
                        <Label htmlFor="minValue">{t('minValue')}</Label>
                        <Input
                            id="minValue"
                            type="text"
                            value={minValue.toString()}
                            onChange={(e) => handleInputChange(setMinValue, e.target.value)}
                        />
                    </div>

                    {/* Max Value */}
                    <div className="space-y-2">
                        <Label htmlFor="maxValue">{t('maxValue')}</Label>
                        <Input
                            id="maxValue"
                            type="text"
                            value={maxValue.toString()}
                            onChange={(e) => handleInputChange(setMaxValue, e.target.value)}
                        />
                    </div>

                    {/* Generate Button */}
                    <div className="space-y-2 sm:col-span-2">
                        <button
                            onClick={generateRandomNumber}
                            className="py-2 px-4 bg-primary text-white rounded-md">
                            {t('generate')}
                        </button>
                    </div>

                    {/* Result */}
                    <div className="space-y-2 sm:col-span-2">
                        <h3 className="text-lg font-semibold">{t('result')}</h3>
                        <div className="p-4 bg-primary/10 rounded-lg">
                            <p className="text-2xl font-bold">{randomNumber !== null ? randomNumber : "-"}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
