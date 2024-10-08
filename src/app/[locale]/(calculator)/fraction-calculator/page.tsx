"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from 'next-intl';

export default function FractionCalculator() {
    const t = useTranslations('CalcTools');
    const [numerator1, setNumerator1] = useState<string>("1");
    const [denominator1, setDenominator1] = useState<string>("1");
    const [numerator2, setNumerator2] = useState<string>("1");
    const [denominator2, setDenominator2] = useState<string>("1");
    const [result, setResult] = useState<string>("");
    const [operation, setOperation] = useState<string>("add");

    const calculateFraction = () => {
        const num1 = parseInt(numerator1) || 1;
        const den1 = parseInt(denominator1) || 1;
        const num2 = parseInt(numerator2) || 1;
        const den2 = parseInt(denominator2) || 1;

        let resultNum = 0;
        let resultDen = 1;

        switch (operation) {
            case 'add':
                resultNum = num1 * den2 + num2 * den1;
                resultDen = den1 * den2;
                break;
            case 'subtract':
                resultNum = num1 * den2 - num2 * den1;
                resultDen = den1 * den2;
                break;
            case 'multiply':
                resultNum = num1 * num2;
                resultDen = den1 * den2;
                break;
            case 'divide':
                resultNum = num1 * den2;
                resultDen = den1 * num2;
                break;
        }

        setResult(`${resultNum}/${resultDen}`);
    };

    const handleInputChange = (setValue: React.Dispatch<React.SetStateAction<string>>, value: string) => {
        setValue(value.replace(/\D/g, "")); // Only allow digits
    };

    return (
        <Card className="w-full h-screen flex flex-col justify-center items-center py-24 md:py-24 lg:py-24">
            <CardHeader>
                <CardTitle className="flex justify-center">{t('fractionCalculatorTitle')}</CardTitle>
                <CardDescription className="flex justify-center">{t('fractionCalculatorDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    {/* Fraction 1 */}
                    <div className="space-y-2">
                        <Label htmlFor="numerator1">{t('numerator1')}</Label>
                        <Input
                            id="numerator1"
                            type="text"
                            value={numerator1}
                            onChange={(e) => handleInputChange(setNumerator1, e.target.value)}
                        />
                        <Label htmlFor="denominator1">{t('denominator1')}</Label>
                        <Input
                            id="denominator1"
                            type="text"
                            value={denominator1}
                            onChange={(e) => handleInputChange(setDenominator1, e.target.value)}
                        />
                    </div>

                    {/* Fraction 2 */}
                    <div className="space-y-2">
                        <Label htmlFor="numerator2">{t('numerator2')}</Label>
                        <Input
                            id="numerator2"
                            type="text"
                            value={numerator2}
                            onChange={(e) => handleInputChange(setNumerator2, e.target.value)}
                        />
                        <Label htmlFor="denominator2">{t('denominator2')}</Label>
                        <Input
                            id="denominator2"
                            type="text"
                            value={denominator2}
                            onChange={(e) => handleInputChange(setDenominator2, e.target.value)}
                        />
                    </div>

                    {/* Operation Selection */}
                    <div className="space-y-2 sm:col-span-2">
                        <Label>{t('operation')}</Label>
                        <select
                            value={operation}
                            onChange={(e) => setOperation(e.target.value)}
                            className="py-2 px-4 bg-primary/10 rounded-md"
                        >
                            <option value="add">{t('add')}</option>
                            <option value="subtract">{t('subtract')}</option>
                            <option value="multiply">{t('multiply')}</option>
                            <option value="divide">{t('divide')}</option>
                        </select>
                    </div>

                    {/* Result */}
                    <div className="space-y-2 sm:col-span-2">
                        <button
                            onClick={calculateFraction}
                            className="py-2 px-4 bg-primary text-white rounded-md">
                            {t('calculate')}
                        </button>
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
