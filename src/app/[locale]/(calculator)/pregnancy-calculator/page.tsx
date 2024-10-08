"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useTranslations } from 'next-intl';

export default function PregnancyCalculator() {
    const t = useTranslations('CalcTools');
    const [lastPeriodDate, setLastPeriodDate] = useState<string>(''); // Last period date
    const [cycleLength, setCycleLength] = useState<number>(28); // Average cycle length
    const [dueDate, setDueDate] = useState<string>(''); // Calculated due date
    const [trimester, setTrimester] = useState<string>(''); // Trimester information

    useEffect(() => {
        calculatePregnancy();
    }, [lastPeriodDate, cycleLength]);

    const calculatePregnancy = () => {
        if (lastPeriodDate && cycleLength > 0) {
            const lastPeriod = new Date(lastPeriodDate);
            const due = new Date(lastPeriod);
            due.setDate(lastPeriod.getDate() + (cycleLength - 14) + 280); // 280 days for pregnancy

            const today = new Date();
            const weeksPregnant = Math.floor((today.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24 * 7));
            
            setDueDate(due.toLocaleDateString());

            // Determine trimester
            if (weeksPregnant < 13) {
                setTrimester(t('firstTrimester'));
            } else if (weeksPregnant >= 13 && weeksPregnant < 27) {
                setTrimester(t('secondTrimester'));
            } else {
                setTrimester(t('thirdTrimester'));
            }
        }
    };

    const handleInputChange = (setValue: React.Dispatch<React.SetStateAction<any>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    return (
        <Card className="w-full h-screen flex flex-col justify-center items-center py-24 md:py-24 lg:py-24">
            <CardHeader>
                <CardTitle className="flex justify-center">{t('pregnancyCalculatorTitle')}</CardTitle>
                <CardDescription className="flex justify-center">{t('pregnancyCalculatorDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    {/* Last Period Date Input */}
                    <div className="space-y-2">
                        <Label htmlFor="lastPeriodDate">{t('lastPeriodDate')}</Label>
                        <Input
                            id="lastPeriodDate"
                            type="date"
                            value={lastPeriodDate}
                            onChange={handleInputChange(setLastPeriodDate)}
                        />
                    </div>

                    {/* Cycle Length Input */}
                    <div className="space-y-2">
                        <Label htmlFor="cycleLength">{t('cycleLength')}</Label>
                        <Input
                            id="cycleLength"
                            type="text"
                            value={cycleLength.toString()}
                            onChange={handleInputChange(setCycleLength)}
                            placeholder={t('days')}
                        />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                        <h3 className="text-lg font-semibold">{t('pregnancySummary')}</h3>
                        <div className="grid gap-2 sm:grid-cols-2">
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <p className="text-sm font-medium text-primary">{t('dueDate')}</p>
                                <p className="text-2xl font-bold">{dueDate}</p>
                            </div>
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <p className="text-sm font-medium text-primary">{t('trimester')}</p>
                                <p className="text-2xl font-bold">{trimester}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
