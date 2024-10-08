"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useTranslations } from 'next-intl';
import { formatCurrency, formatNumber } from "@/utils/formatCurrency";

export default function MortgageCalculator() {
    const t = useTranslations('CalcTools');
    const [homePrice, setHomePrice] = useState<number>(300000); // Ev fiyatı
    const [downPayment, setDownPayment] = useState<number>(60000); // Peşinat
    const [interestRate, setInterestRate] = useState<number>(3.5); // Faiz oranı
    const [loanTerm, setLoanTerm] = useState<number>(30); // Kredi süresi (yıl)
    const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
    const [totalPayment, setTotalPayment] = useState<number>(0);
    const [totalInterest, setTotalInterest] = useState<number>(0);

    useEffect(() => {
        calculateMortgage();
    }, [homePrice, downPayment, interestRate, loanTerm]);

    const calculateMortgage = (): void => {
        const loanAmount = homePrice - downPayment;
        const principal = loanAmount;
        const calculatedInterest = interestRate / 100 / 12;
        const calculatedPayments = loanTerm * 12;

        const x = Math.pow(1 + calculatedInterest, calculatedPayments);
        const monthly = (principal * x * calculatedInterest) / (x - 1);

        if (isFinite(monthly)) {
            const monthlyPaymentCalculated = monthly.toFixed(2);
            const totalPaymentCalculated = (monthly * calculatedPayments).toFixed(2);
            const totalInterestCalculated = (monthly * calculatedPayments - principal).toFixed(2);

            setMonthlyPayment(parseFloat(monthlyPaymentCalculated));
            setTotalPayment(parseFloat(totalPaymentCalculated));
            setTotalInterest(parseFloat(totalInterestCalculated));
        }
    };

    // Handle input change for numbers with comma and decimal
    const handleInputChange = (setValue: React.Dispatch<React.SetStateAction<number>>, maxValue: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\./g, '').replace(',', '.'); // Change comma to dot for decimals
        value = value.replace(/\D/g, '').replace(/^0+/, ""); // Remove leading zeroes

        const numericValue = parseFloat(value);
        if (numericValue > maxValue) value = maxValue.toString(); // Max value check

        setValue(value === '' ? 0 : parseFloat(value)); // Set numeric value
    };

    return (
        <Card className="w-full h-screen flex flex-col justify-center items-center py-32 md:py-32 lg:py-32">
            <CardHeader className="grid justify-center items-center">
                <CardTitle className="flex justify-center">{t('mortgageCalculatorTitle')}</CardTitle>
                <CardDescription className="flex justify-center">{t('mortgageCalculatorDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="homePrice">{t('homePrice')}</Label>
                        <Input
                            id="homePrice"
                            type="text"
                            value={formatNumber(homePrice)}
                            onChange={handleInputChange(setHomePrice, 1000000)}
                        />
                        <Slider
                            min={50000}
                            max={1000000}
                            step={10000}
                            value={[homePrice]}
                            onValueChange={(value: number[]) => setHomePrice(value[0])}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="downPayment">{t('downPayment')}</Label>
                        <Input
                            id="downPayment"
                            type="text"
                            value={formatNumber(downPayment)}
                            onChange={handleInputChange(setDownPayment, homePrice)}
                        />
                        <Slider
                            min={0}
                            max={homePrice}
                            step={1000}
                            value={[downPayment]}
                            onValueChange={(value: number[]) => setDownPayment(value[0])}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="interestRate">{t('interestRate')}</Label>
                        <Input
                            id="interestRate"
                            type="text"
                            value={interestRate.toString().replace('.', ',')} // Show with comma for decimal
                            onChange={handleInputChange(setInterestRate, 20)}
                        />
                        <Slider
                            min={0}
                            max={20}
                            step={0.1}
                            value={[interestRate]}
                            onValueChange={(value: number[]) => setInterestRate(value[0])}
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
                            onValueChange={(value: number[]) => setLoanTerm(value[0])}
                        />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                        <h3 className="text-lg font-semibold">{t('mortgageSummary')}</h3>
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
