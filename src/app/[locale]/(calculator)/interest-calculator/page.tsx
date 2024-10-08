"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useTranslations } from 'next-intl';
import { formatCurrency, formatNumber } from "@/utils/formatCurrency";

export default function InterestCalculator() {
    const t = useTranslations('CalcTools');
    const [principal, setPrincipal] = useState<number>(1000);  // Initial investment
    const [interestRate, setInterestRate] = useState<number>(5); // Interest rate
    const [time, setTime] = useState<number>(5); // Time in years
    const [interestType, setInterestType] = useState<'simple' | 'compound'>('simple'); // Interest type (simple or compound)
    const [totalAmount, setTotalAmount] = useState<number>(0); // Total amount with interest
    const [totalInterest, setTotalInterest] = useState<number>(0); // Total interest

    useEffect(() => {
        calculateInterest();
    }, [principal, interestRate, time, interestType]);

    const calculateInterest = (): void => {
        let interest = 0;
        let total = 0;

        if (interestType === 'simple') {
            // Simple Interest Formula: SI = P * R * T
            interest = (principal * interestRate * time) / 100;
            total = principal + interest;
        } else {
            // Compound Interest Formula: CI = P * (1 + R/100)^T - P
            total = principal * Math.pow(1 + interestRate / 100, time);
            interest = total - principal;
        }

        setTotalInterest(parseFloat(interest.toFixed(2)));
        setTotalAmount(parseFloat(total.toFixed(2)));
    };

    const handleInputChange = (setValue: React.Dispatch<React.SetStateAction<number>>, maxValue: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\./g, "").replace(/\D/g, ""); // Only allow numbers
        value = value.replace(/^0+/, ""); // Remove leading zeros
        if (Number(value) > maxValue) value = maxValue.toString(); // Check max value
        setValue(value === '' ? 0 : Number(value)); // Set value or 0 if empty
    };

    return (
        <Card className="w-full h-screen flex flex-col justify-center items-center py-24 md:py-24 lg:py-24">
            <CardHeader>
                <CardTitle className="flex justify-center">{t('interestCalculatorTitle')}</CardTitle>
                <CardDescription className="flex justify-center">{t('interestCalculatorDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    {/* Interest Type Selection */}
                    <div className="space-y-2 sm:col-span-2">
                        <Label>{t('interestType')}</Label>
                        <Select onValueChange={(value: 'simple' | 'compound') => setInterestType(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder={interestType === 'simple' ? 'Simple Interest' : 'Compound Interest'} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="simple">Simple Interest</SelectItem>
                                <SelectItem value="compound">Compound Interest</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Principal Input */}
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

                    {/* Interest Rate Input */}
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

                    {/* Time Input */}
                    <div className="space-y-2">
                        <Label htmlFor="time">{t('time')}</Label>
                        <Input
                            id="time"
                            type="text"
                            value={formatNumber(time)}
                            onChange={handleInputChange(setTime, 30)}
                        />
                        <Slider
                            min={1}
                            max={30}
                            step={1}
                            value={[time]}
                            onValueChange={(value) => setTime(value[0])}
                        />
                    </div>

                    {/* Summary Section */}
                    <div className="space-y-2 sm:col-span-2">
                        <h3 className="text-lg font-semibold">{t('interestSummary')}</h3>
                        <div className="grid gap-2 sm:grid-cols-2">
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <p className="text-sm font-medium text-primary">{t('totalInterest')}</p>
                                <p className="text-2xl font-bold">{formatCurrency(totalInterest)}</p>
                            </div>
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <p className="text-sm font-medium text-primary">{t('totalAmount')}</p>
                                <p className="text-2xl font-bold">{formatCurrency(totalAmount)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
