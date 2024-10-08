"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useTranslations } from 'next-intl';
import { formatCurrency, formatNumber } from "@/utils/formatCurrency";

export default function AmortizationCalculator() {
    const t = useTranslations('CalcTools');
    const [loanAmount, setLoanAmount] = useState<number>(200000);  // Loan amount
    const [interestRate, setInterestRate] = useState<number>(5);   // Annual interest rate
    const [loanTerm, setLoanTerm] = useState<number>(30);          // Loan term (years)
    const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
    const [schedule, setSchedule] = useState<{month: number, principal: number, interest: number, balance: number}[]>([]);

    useEffect(() => {
        calculateAmortization();
    }, [loanAmount, interestRate, loanTerm]);

    const calculateAmortization = (): void => {
        const principal = loanAmount;
        const monthlyRate = interestRate / 100 / 12;
        const numPayments = loanTerm * 12;
        
        const monthly = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
        setMonthlyPayment(parseFloat(monthly.toFixed(2)));

        const amortizationSchedule = [];
        let remainingBalance = principal;

        for (let i = 1; i <= numPayments; i++) {
            const interest = remainingBalance * monthlyRate;
            const principalPaid = monthly - interest;
            remainingBalance -= principalPaid;

            amortizationSchedule.push({
                month: i,
                principal: parseFloat(principalPaid.toFixed(2)),
                interest: parseFloat(interest.toFixed(2)),
                balance: parseFloat(remainingBalance.toFixed(2))
            });
        }

        setSchedule(amortizationSchedule);
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
                <CardTitle className="flex justify-center">{t('amortizationCalculatorTitle')}</CardTitle>
                <CardDescription className="flex justify-center">{t('amortizationCalculatorDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex gap-6 sm:grid-cols-2">
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
                        <h3 className="text-lg font-semibold">{t('amortizationSummary')}</h3>
                        <div className="grid gap-2 sm:grid-cols-1">
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <p className="text-sm font-medium text-primary">{t('monthlyPayment')}</p>
                                <p className="text-2xl font-bold">{formatCurrency(monthlyPayment)}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <h3 className="text-lg font-semibold mt-8">{t('amortizationSchedule')}</h3>
                <div className="overflow-auto max-h-72 w-full">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th>{t('month')}</th>
                                <th>{t('principalPaid')}</th>
                                <th>{t('interestPaid')}</th>
                                <th>{t('balanceRemaining')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {schedule.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.month}</td>
                                    <td>{formatCurrency(item.principal)}</td>
                                    <td>{formatCurrency(item.interest)}</td>
                                    <td>{formatCurrency(item.balance)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}
