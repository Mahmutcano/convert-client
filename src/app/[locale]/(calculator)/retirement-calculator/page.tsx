"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useTranslations } from 'next-intl';
import { formatCurrency, formatNumber } from "@/utils/formatCurrency";

export default function RetirementCalculator() {
    const t = useTranslations('CalcTools');
    const [currentSavings, setCurrentSavings] = useState<number>(50000);  // Current savings
    const [monthlyContribution, setMonthlyContribution] = useState<number>(500);  // Monthly contribution
    const [interestRate, setInterestRate] = useState<number>(5);  // Annual interest rate
    const [yearsUntilRetirement, setYearsUntilRetirement] = useState<number>(30);  // Years until retirement
    const [finalSavings, setFinalSavings] = useState<number>(0);  // Estimated savings at retirement

    useEffect(() => {
        calculateRetirementSavings();
    }, [currentSavings, monthlyContribution, interestRate, yearsUntilRetirement]);

    const calculateRetirementSavings = (): void => {
        const monthlyRate = interestRate / 100 / 12;
        const months = yearsUntilRetirement * 12;
        const compoundInterest = currentSavings * Math.pow(1 + monthlyRate, months);
        const futureContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
        const totalSavings = compoundInterest + futureContributions;

        setFinalSavings(parseFloat(totalSavings.toFixed(2)));
    };

    const handleInputChange = (setValue: React.Dispatch<React.SetStateAction<number>>, maxValue: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\./g, "").replace(/\D/g, ""); // Allow only numbers
        value = value.replace(/^0+/, ""); // Remove leading zeros
        if (Number(value) > maxValue) value = maxValue.toString(); // Check max value
        setValue(value === '' ? 0 : Number(value)); // Set value or 0 if empty
    };

    return (
        <Card className="w-full h-screen flex flex-col justify-center items-center py-24 md:py-24 lg:py-24">
            <CardHeader>
                <CardTitle className="flex justify-center">{t('retirementCalculatorTitle')}</CardTitle>
                <CardDescription className="flex justify-center">{t('retirementCalculatorDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="currentSavings">{t('currentSavings')}</Label>
                        <Input
                            id="currentSavings"
                            type="text"
                            value={formatNumber(currentSavings)}
                            onChange={handleInputChange(setCurrentSavings, 1000000)}
                        />
                        <Slider
                            min={0}
                            max={1000000}
                            step={1000}
                            value={[currentSavings]}
                            onValueChange={(value) => setCurrentSavings(value[0])}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="monthlyContribution">{t('monthlyContribution')}</Label>
                        <Input
                            id="monthlyContribution"
                            type="text"
                            value={formatNumber(monthlyContribution)}
                            onChange={handleInputChange(setMonthlyContribution, 5000)}
                        />
                        <Slider
                            min={0}
                            max={5000}
                            step={100}
                            value={[monthlyContribution]}
                            onValueChange={(value) => setMonthlyContribution(value[0])}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="interestRate">{t('interestRate')}</Label>
                        <Input
                            id="interestRate"
                            type="text"
                            value={interestRate.toString().replace('.', ',')} // Show commas for decimal input
                            onChange={handleInputChange(setInterestRate, 20)}
                        />
                        <Slider
                            min={0}
                            max={20}
                            step={0.1}
                            value={[interestRate]}
                            onValueChange={(value) => setInterestRate(value[0])}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="yearsUntilRetirement">{t('yearsUntilRetirement')}</Label>
                        <Input
                            id="yearsUntilRetirement"
                            type="text"
                            value={formatNumber(yearsUntilRetirement)}
                            onChange={handleInputChange(setYearsUntilRetirement, 50)}
                        />
                        <Slider
                            min={1}
                            max={50}
                            step={1}
                            value={[yearsUntilRetirement]}
                            onValueChange={(value) => setYearsUntilRetirement(value[0])}
                        />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                        <h3 className="text-lg font-semibold">{t('retirementSummary')}</h3>
                        <div className="grid gap-2 sm:grid-cols-1">
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <p className="text-sm font-medium text-primary">{t('finalSavings')}</p>
                                <p className="text-2xl font-bold">{formatCurrency(finalSavings)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
