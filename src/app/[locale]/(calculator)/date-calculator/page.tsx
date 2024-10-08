"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function DateCalculator() {
    const t = useTranslations('CalcTools');
    const [day, setDay] = useState<string>(""); 
    const [month, setMonth] = useState<string>(""); 
    const [year, setYear] = useState<string>(""); 
    const [result, setResult] = useState<string>("");

    const calculateDateDifference = () => {
        if (day && month && year) {
            const inputDate = new Date(Number(year), Number(month) - 1, Number(day));
            const today = new Date();
            const diffTime = Math.abs(today.getTime() - inputDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            setResult(`${diffDays} ${t('daysDifference')}`);
        } else {
            setResult(t('invalidDate'));
        }
    };

    return (
        <Card className="w-full h-screen flex flex-col justify-center items-center py-24 md:py-24 lg:py-24">
            <CardHeader>
                <CardTitle className="flex justify-center">{t('dateCalculatorTitle')}</CardTitle>
                <CardDescription className="flex justify-center">{t('dateCalculatorDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-3">
                    <div className="space-y-2">
                        <Label htmlFor="day">{t('day')}</Label>
                        <Input
                            id="day"
                            type="text"
                            value={day}
                            onChange={(e) => setDay(e.target.value.replace(/\D/g, ""))}
                            placeholder={t('enterDay')}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="month">{t('month')}</Label>
                        <Input
                            id="month"
                            type="text"
                            value={month}
                            onChange={(e) => setMonth(e.target.value.replace(/\D/g, ""))}
                            placeholder={t('enterMonth')}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="year">{t('year')}</Label>
                        <Input
                            id="year"
                            type="text"
                            value={year}
                            onChange={(e) => setYear(e.target.value.replace(/\D/g, ""))}
                            placeholder={t('enterYear')}
                        />
                    </div>
                    <div className="space-y-2 sm:col-span-3">
                        <Button
                            onClick={calculateDateDifference}
                            className="py-2 px-4 bg-primary text-white rounded-md">
                            {t('calculate')}
                        </Button>
                    </div>
                    {result && (
                        <div className="space-y-2 sm:col-span-3">
                            <h3 className="text-lg font-semibold">{t('result')}</h3>
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <p className="text-2xl font-bold">{result}</p>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
