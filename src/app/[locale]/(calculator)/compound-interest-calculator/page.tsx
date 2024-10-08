"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useTranslations } from 'next-intl';
import { formatCurrency, formatNumber } from "@/utils/formatCurrency";

export default function CompoundInterestCalculator() {
    const t = useTranslations('CalcTools');
    const [principal, setPrincipal] = useState<number>(10000); // Principal investment amount
    const [annualContribution, setAnnualContribution] = useState<number>(1000); // Annual contribution
    const [interestRate, setInterestRate] = useState<number>(5); // Annual interest rate
    const [compoundingFrequency, setCompoundingFrequency] = useState<number>(12); // Compounding frequency (monthly)
    const [investmentPeriod, setInvestmentPeriod] = useState<number>(10); // Investment period in years
    const [futureValue, setFutureValue] = useState<number>(0);

    useEffect(() => {
        calculateCompoundInterest();
    }, [principal, annualContribution, interestRate, compoundingFrequency, investmentPeriod]);

    const calculateCompoundInterest = (): void => {
        const rate = interestRate / 100;
        const periods = compoundingFrequency * investmentPeriod;

        const compoundInterest =
            principal * Math.pow(1 + rate / compoundingFrequency, periods) +
            (annualContribution * (Math.pow(1 + rate / compoundingFrequency, periods) - 1)) / (rate / compoundingFrequency);

        setFutureValue(parseFloat(compoundInterest.toFixed(2)));
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
                <CardTitle className="flex justify-center">{t('compoundInterestCalculatorTitle')}</CardTitle>
                <CardDescription className="flex justify-center">{t('compoundInterestCalculatorDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="principal">{t('principal')}</Label>
                        <Input
                            id="principal"
                            type="text"
                            value={formatNumber(principal)}
                            onChange={handleInputChange(setPrincipal, 1000000)}
                        />
                        <Slider
                            min={1000}
                            max={1000000}
                            step={1000}
                            value={[principal]}
                            onValueChange={(value) => setPrincipal(value[0])}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="annualContribution">{t('annualContribution')}</Label>
                        <Input
                            id="annualContribution"
                            type="text"
                            value={formatNumber(annualContribution)}
                            onChange={handleInputChange(setAnnualContribution, 50000)}
                        />
                        <Slider
                            min={0}
                            max={50000}
                            step={100}
                            value={[annualContribution]}
                            onValueChange={(value) => setAnnualContribution(value[0])}
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
                    <div className="space-y-2">
                        <Label htmlFor="compoundingFrequency">{t('compoundingFrequency')}</Label>
                        <Select onValueChange={(value: string) => setCompoundingFrequency(Number(value))}>
                            <SelectTrigger>
                                <SelectValue placeholder={t('compoundingFrequency')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">{t('annually')}</SelectItem>
                                <SelectItem value="2">{t('semiAnnually')}</SelectItem>
                                <SelectItem value="4">{t('quarterly')}</SelectItem>
                                <SelectItem value="12">{t('monthly')}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                        <h3 className="text-lg font-semibold">{t('compoundInterestSummary')}</h3>
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
