"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function MmToInchesConverter() {
    const t = useTranslations('ConversionsTools');
    const [mmValue, setMmValue] = useState<string>(""); // Millimeter input value
    const [inchesValue, setInchesValue] = useState<number | null>(null); // Inches result

    const convertMmToInches = () => {
        // Convert mm to inches (1 mm = 0.0393701 inches)
        if (/^\d+(\.\d+)?$/.test(mmValue)) { // Ensure input is a valid number
            const mm = parseFloat(mmValue);
            const inchesResult = mm * 0.0393701;
            setInchesValue(parseFloat(inchesResult.toFixed(4))); // Keeping result to 4 decimal places
        } else {
            setInchesValue(null); // Reset if input is invalid
        }
    };

    return (
        <Card className="w-full h-screen flex flex-col justify-center items-center py-24 md:py-24 lg:py-24">
            <CardHeader>
                <CardTitle className="flex justify-center">{t('mmToInchesTitle')}</CardTitle>
                <CardDescription className="flex justify-center">{t('mmToInchesDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="mmValue">{t('mmValue')}</Label>
                        <Input
                            id="mmValue"
                            type="text"
                            value={mmValue}
                            onChange={(e) => setMmValue(e.target.value)}
                            placeholder={t('enterMmValue')}
                        />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                        <Button onClick={convertMmToInches} className="py-2 px-4 bg-primary text-white rounded-md">
                            {t('convertMmToInches')}
                        </Button>
                    </div>
                    {inchesValue !== null && (
                        <div className="space-y-2 sm:col-span-2">
                            <h3 className="text-lg font-semibold">{t('result')}</h3>
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <p className="text-2xl font-bold">{inchesValue} {t('inches')}</p>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
