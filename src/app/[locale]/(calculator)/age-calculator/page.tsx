"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function AgeCalculator() {
    const t = useTranslations('CalcTools');
    const [day, setDay] = useState<number | null>(null); // Day of birth
    const [month, setMonth] = useState<number | null>(null); // Month of birth
    const [year, setYear] = useState<number | null>(null); // Year of birth
    const [age, setAge] = useState<number | null>(null); // Calculated age

    const calculateAge = () => {
        if (day && month && year) {
            const birthDate = new Date(year, month - 1, day); // JavaScript months are 0-based
            const today = new Date();
            const diff = today.getTime() - birthDate.getTime();
            const ageYears = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)); // Calculate age in years
            setAge(ageYears);
        } else {
            setAge(null); // Reset age if input is invalid
        }
    };

    return (
        <Card className="w-full h-screen flex flex-col justify-center items-center py-24 md:py-24 lg:py-24">
            <CardHeader>
                <CardTitle className="flex justify-center">{t('ageCalculatorTitle')}</CardTitle>
                <CardDescription className="flex justify-center">{t('ageCalculatorDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-3">
                    {/* Day input */}
                    <div className="space-y-2">
                        <Label htmlFor="day">{t('day')}</Label>
                        <Input
                            id="day"
                            type="number"
                            value={day || ""}
                            onChange={(e) => setDay(Number(e.target.value))}
                            placeholder={t('enterDay')}
                        />
                    </div>
                    {/* Month input */}
                    <div className="space-y-2">
                        <Label htmlFor="month">{t('month')}</Label>
                        <Input
                            id="month"
                            type="number"
                            value={month || ""}
                            onChange={(e) => setMonth(Number(e.target.value))}
                            placeholder={t('enterMonth')}
                        />
                    </div>
                    {/* Year input */}
                    <div className="space-y-2">
                        <Label htmlFor="year">{t('year')}</Label>
                        <Input
                            id="year"
                            type="number"
                            value={year || ""}
                            onChange={(e) => setYear(Number(e.target.value))}
                            placeholder={t('enterYear')}
                        />
                    </div>
                </div>

                <div className="space-y-2 mt-4">
                    <Button onClick={calculateAge} className="py-2 px-4 bg-primary text-white rounded-md">
                        {t('calculate')}
                    </Button>
                </div>

                {age !== null && (
                    <div className="space-y-2 mt-4">
                        <h3 className="text-lg font-semibold">{t('result')}</h3>
                        <div className="p-4 bg-primary/10 rounded-lg">
                            <p className="text-2xl font-bold">{age} {t('yearsOld')}</p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
