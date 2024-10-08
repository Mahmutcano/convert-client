"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useTranslations } from 'next-intl';
import { formatCurrency, formatNumber } from "@/utils/formatCurrency";

export default function InvestmentCalculator() {
    const t = useTranslations('CalcTools');
    const [initialInvestment, setInitialInvestment] = useState<number>(10000); // Initial investment
    const [monthlyContribution, setMonthlyContribution] = useState<number>(500); // Monthly contribution
    const [interestRate, setInterestRate] = useState<number>(5); // Annual interest rate
    const [investmentPeriod, setInvestmentPeriod] = useState<number>(10); // Investment period in years
    const [futureValue, setFutureValue] = useState<number>(0);

    useEffect(() => {
        calculateFutureValue();
    }, [initialInvestment, monthlyContribution, interestRate, investmentPeriod]);

    const calculateFutureValue = (): void => {
        const principal = initialInvestment;
        const monthlyRate = interestRate / 100 / 12;
        const numMonths = investmentPeriod * 12;

        const futureValue =
            principal * Math.pow(1 + monthlyRate, numMonths) +
            (monthlyContribution * (Math.pow(1 + monthlyRate, numMonths) - 1)) / monthlyRate;

        setFutureValue(parseFloat(futureValue.toFixed(2)));
    };

    const handleInputChange = (setValue: React.Dispatch<React.SetStateAction<number>>, maxValue: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\./g, "").replace(/\D/g, ""); // Only allow numbers, remove dots
        value = value.replace(/^0+/, ""); // Remove leading zeros
        if (Number(value) > maxValue) value = maxValue.toString(); // Check max value
        setValue(value === '' ? 0 : Number(value)); // Set value or 0 if empty
    };

    return (
        <Card className="w-full h-screen flex flex-col justify-center items-center py-24 md:py-24 lg:py-24">
            <CardHeader>
                <CardTitle className="flex justify-center">{t('investmentCalculatorTitle')}</CardTitle>
                <CardDescription className="flex justify-center">{t('investmentCalculatorDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="initialInvestment">{t('initialInvestment')}</Label>
                        <Input
                            id="initialInvestment"
                            type="text"
                            value={formatNumber(initialInvestment)}
                            onChange={handleInputChange(setInitialInvestment, 1000000)}
                        />
                        <Slider
                            min={1000}
                            max={1000000}
                            step={1000}
                            value={[initialInvestment]}
                            onValueChange={(value) => setInitialInvestment(value[0])}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="monthlyContribution">{t('monthlyContribution')}</Label>
                        <Input
                            id="monthlyContribution"
                            type="text"
                            value={formatNumber(monthlyContribution)}
                            onChange={handleInputChange(setMonthlyContribution, 10000)}
                        />
                        <Slider
                            min={100}
                            max={10000}
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
                            value={interestRate.toString().replace('.', ',')}
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
                        <Label htmlFor="investmentPeriod">{t('investmentPeriod')}</Label>
                        <Input
                            id="investmentPeriod"
                            type="text"
                            value={formatNumber(investmentPeriod)}
                            onChange={handleInputChange(setInvestmentPeriod, 50)}
                        />
                        <Slider
                            min={1}
                            max={50}
                            step={1}
                            value={[investmentPeriod]}
                            onValueChange={(value) => setInvestmentPeriod(value[0])}
                        />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                        <h3 className="text-lg font-semibold">{t('investmentSummary')}</h3>
                        <div className="p-4 bg-primary/10 rounded-lg">
                            <p className="text-sm font-medium text-primary">{t('futureValue')}</p>
                            <p className="text-2xl font-bold">{formatCurrency(futureValue)}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
