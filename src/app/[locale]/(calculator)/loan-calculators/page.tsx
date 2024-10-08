"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useTranslations } from 'next-intl';
import { formatCurrency, formatNumber } from "@/utils/formatCurrency";


export default function LoanCalculator() {
    const t = useTranslations('CalcTools');
    const [loanAmount, setLoanAmount] = useState<number>(100000);
    const [interestRate, setInterestRate] = useState<number>(5);
    const [loanTerm, setLoanTerm] = useState<number>(15);
    const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
    const [totalPayment, setTotalPayment] = useState<number>(0);
    const [totalInterest, setTotalInterest] = useState<number>(0);

    useEffect(() => {
        calculateLoan();
    }, [loanAmount, interestRate, loanTerm]);

    const calculateLoan = (): void => {
        const principal = loanAmount;
        const calculatedInterest = interestRate / 100 / 12;
        const calculatedPayments = loanTerm * 12;

        const x = Math.pow(1 + calculatedInterest, calculatedPayments);
        const monthly = (principal * x * calculatedInterest) / (x - 1);

        if (isFinite(monthly)) {
            setMonthlyPayment(parseFloat(monthly.toFixed(2)));
            setTotalPayment(parseFloat((monthly * calculatedPayments).toFixed(2)));
            setTotalInterest(parseFloat((monthly * calculatedPayments - principal).toFixed(2)));
        }
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
                <CardTitle className="flex justify-center">{t('loanCalculatorTitle')}</CardTitle>
                <CardDescription className="flex justify-center">{t('loanCalculatorDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="loanAmount">{t('loanAmountLabel')}</Label>
                        <Input
                            id="loanAmount"
                            type="text"
                            value={formatNumber(loanAmount)}
                            onChange={handleInputChange(setLoanAmount, 1000000)}
                        />
                        <Slider
                            min={1000}
                            max={1000000}
                            step={1000}
                            value={[loanAmount]}
                            onValueChange={(value) => setLoanAmount(value[0])}
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
                        <Label htmlFor="loanTerm">{t('loanTerm')}</Label>
                        <Input
                            id="loanTerm"
                            type="text"
                            value={formatNumber(loanTerm)}
                            onChange={handleInputChange(setLoanTerm, 30)}
                        />
                        <Slider
                            min={1}
                            max={30}
                            step={1}
                            value={[loanTerm]}
                            onValueChange={(value) => setLoanTerm(value[0])}
                        />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                        <h3 className="text-lg font-semibold">{t('loanSummary')}</h3>
                        <div className="grid gap-2 sm:grid-cols-3">
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <p className="text-sm font-medium text-primary">{t('monthlyPayment')}</p>
                                <p className="text-2xl font-bold">{formatCurrency(monthlyPayment)}</p>
                            </div>
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <p className="text-sm font-medium text-primary">{t('totalPayment')}</p>
                                <p className="text-2xl font-bold">{formatCurrency(totalPayment)}</p>
                            </div>
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <p className="text-sm font-medium text-primary">{t('totalInterest')}</p>
                                <p className="text-2xl font-bold">{formatCurrency(totalInterest)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
