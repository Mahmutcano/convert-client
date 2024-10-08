"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from 'next-intl';

// Function to remove leading zeros and format the input
const handleFormattedInput = (value: string): string => {
    // Remove any non-digit characters
    let formattedValue = value.replace(/\D/g, '');
    
    // Remove leading zeros
    formattedValue = formattedValue.replace(/^0+/, '');

    return formattedValue === '' ? '0' : formattedValue;
};

export default function PercentageCalculator() {
    const t = useTranslations('CalcTools');
    const [baseValue, setBaseValue] = useState<number>(100);
    const [percentage, setPercentage] = useState<number>(10);
    const [result, setResult] = useState<number>(0);

    const calculatePercentage = () => {
        const calculatedResult = (baseValue * percentage) / 100;
        setResult(calculatedResult);
    };

    const handleBaseValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = handleFormattedInput(e.target.value);
        setBaseValue(Number(formattedValue));
    };

    const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = handleFormattedInput(e.target.value);
        setPercentage(Number(formattedValue));
    };

    return (
        <Card className="w-full h-screen flex flex-col justify-center items-center py-24 md:py-24 lg:py-24">
            <CardHeader>
                <CardTitle className="flex justify-center">{t('percentageCalculatorTitle')}</CardTitle>
                <CardDescription className="flex justify-center">{t('percentageCalculatorDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-1">
                    <div className="space-y-2">
                        <Label htmlFor="baseValue">{t('baseValue')}</Label>
                        <Input
                            id="baseValue"
                            type="text"
                            value={baseValue.toString()}
                            onChange={handleBaseValueChange}
                            placeholder={t('enterBaseValue')}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="percentage">{t('percentage')}</Label>
                        <Input
                            id="percentage"
                            type="text"
                            value={percentage.toString()}
                            onChange={handlePercentageChange}
                            placeholder={t('enterPercentage')}
                        />
                    </div>
                    <div className="space-y-2">
                        <button
                            onClick={calculatePercentage}
                            className="py-2 px-4 bg-primary text-white rounded-md">
                            {t('calculate')}
                        </button>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">{t('result')}</h3>
                        <div className="p-4 bg-primary/10 rounded-lg">
                            <p className="text-2xl font-bold">{result}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
