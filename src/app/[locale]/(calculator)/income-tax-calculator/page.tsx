"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useTranslations } from 'next-intl';
import { formatCurrency, formatNumber } from "@/utils/formatCurrency";

// U.S. Federal Tax Brackets for 2024 (Single filers)
const taxBrackets = [
    { upperLimit: 11000, rate: 0.10 },
    { upperLimit: 44725, rate: 0.12 },
    { upperLimit: 95375, rate: 0.22 },
    { upperLimit: 182100, rate: 0.24 },
    { upperLimit: 231250, rate: 0.32 },
    { upperLimit: 578125, rate: 0.35 },
    { upperLimit: Infinity, rate: 0.37 }
];

export default function IncomeTaxCalculator() {
    const t = useTranslations('CalcTools');
    const [grossIncome, setGrossIncome] = useState<number>(50000); // User's annual gross income
    const [otherIncome, setOtherIncome] = useState<number>(0); // Other taxable income
    const [deductions, setDeductions] = useState<number>(13000); // Deductions (standard or itemized)
    const [taxCredits, setTaxCredits] = useState<number>(0); // Tax credits
    const [taxableIncome, setTaxableIncome] = useState<number>(0);
    const [totalTax, setTotalTax] = useState<number>(0);
    const [netIncome, setNetIncome] = useState<number>(0);

    useEffect(() => {
        calculateTax();
    }, [grossIncome, otherIncome, deductions, taxCredits]);

    const calculateTaxableIncome = (): number => {
        return grossIncome + otherIncome - deductions;
    };

    const calculateTax = (): void => {
        let taxableIncome = calculateTaxableIncome();
        let calculatedTax = 0;
        let previousBracketLimit = 0;

        // Calculate tax based on income across brackets
        for (let i = 0; i < taxBrackets.length; i++) {
            const { upperLimit, rate } = taxBrackets[i];
            if (taxableIncome > upperLimit) {
                calculatedTax += (upperLimit - previousBracketLimit) * rate;
                previousBracketLimit = upperLimit;
            } else {
                calculatedTax += (taxableIncome - previousBracketLimit) * rate;
                break;
            }
        }

        setTaxableIncome(taxableIncome);
        setTotalTax(calculatedTax - taxCredits);
        setNetIncome(taxableIncome - calculatedTax + taxCredits); // Net income after tax
    };

    const handleInputChange = (setValue: React.Dispatch<React.SetStateAction<number>>, maxValue: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\./g, "").replace(/\D/g, ""); // Allow only numbers, remove dots
        value = value.replace(/^0+/, ""); // Remove leading zeros
        if (Number(value) > maxValue) value = maxValue.toString(); // Check max value
        setValue(value === '' ? 0 : Number(value)); // Set value or 0 if empty
    };

    return (
        <Card className="w-full h-screen flex flex-col justify-center items-center py-24 md:py-24 lg:py-24">
            <CardHeader>
                <CardTitle className="flex justify-center">{t('incomeTaxCalculatorTitle')}</CardTitle>
                <CardDescription className="flex justify-center">{t('incomeTaxCalculatorDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="grossIncome">{t('grossIncome')}</Label>
                        <Input
                            id="grossIncome"
                            type="text"
                            value={formatNumber(grossIncome)}
                            onChange={handleInputChange(setGrossIncome, 1000000)}
                        />
                        <Slider
                            min={1000}
                            max={1000000}
                            step={1000}
                            value={[grossIncome]}
                            onValueChange={(value) => setGrossIncome(value[0])}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="otherIncome">{t('otherIncome')}</Label>
                        <Input
                            id="otherIncome"
                            type="text"
                            value={formatNumber(otherIncome)}
                            onChange={handleInputChange(setOtherIncome, 500000)}
                        />
                        <Slider
                            min={0}
                            max={500000}
                            step={1000}
                            value={[otherIncome]}
                            onValueChange={(value) => setOtherIncome(value[0])}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="deductions">{t('deductions')}</Label>
                        <Input
                            id="deductions"
                            type="text"
                            value={formatNumber(deductions)}
                            onChange={handleInputChange(setDeductions, 30000)}
                        />
                        <Slider
                            min={0}
                            max={30000}
                            step={1000}
                            value={[deductions]}
                            onValueChange={(value) => setDeductions(value[0])}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="taxCredits">{t('taxCredits')}</Label>
                        <Input
                            id="taxCredits"
                            type="text"
                            value={formatNumber(taxCredits)}
                            onChange={handleInputChange(setTaxCredits, 5000)}
                        />
                        <Slider
                            min={0}
                            max={5000}
                            step={100}
                            value={[taxCredits]}
                            onValueChange={(value) => setTaxCredits(value[0])}
                        />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                        <h3 className="text-lg font-semibold">{t('taxSummary')}</h3>
                        <div className="grid gap-2 sm:grid-cols-3">
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <p className="text-sm font-medium text-primary">{t('taxableIncome')}</p>
                                <p className="text-2xl font-bold">{formatCurrency(taxableIncome)}</p>
                            </div>
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <p className="text-sm font-medium text-primary">{t('totalTax')}</p>
                                <p className="text-2xl font-bold">{formatCurrency(totalTax)}</p>
                            </div>
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <p className="text-sm font-medium text-primary">{t('netIncome')}</p>
                                <p className="text-2xl font-bold">{formatCurrency(netIncome)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
