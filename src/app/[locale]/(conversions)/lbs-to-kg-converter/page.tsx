"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function LbsToKgConverter() {
    const t = useTranslations('ConversionsTools');
    const [lbsValue, setLbsValue] = useState<string>(""); // Pounds input value
    const [kgValue, setKgValue] = useState<number | null>(null); // Kilograms result

    const convertLbsToKg = () => {
        // Convert lbs to kg (1 lb = 0.453592 kg)
        if (/^\d+(\.\d+)?$/.test(lbsValue)) { // Ensure input is a valid number
            const lbs = parseFloat(lbsValue);
            const kgResult = lbs * 0.453592;
            setKgValue(parseFloat(kgResult.toFixed(4))); // Keeping result to 4 decimal places
        } else {
            setKgValue(null); // Reset if input is invalid
        }
    };

    return (
        <Card className="w-full h-screen flex flex-col justify-center items-center py-24 md:py-24 lg:py-24">
            <CardHeader>
                <CardTitle className="flex justify-center">{t('lbsToKgTitle')}</CardTitle>
                <CardDescription className="flex justify-center">{t('lbsToKgDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="lbsValue">{t('lbsValue')}</Label>
                        <Input
                            id="lbsValue"
                            type="text"
                            value={lbsValue}
                            onChange={(e) => setLbsValue(e.target.value)}
                            placeholder={t('enterLbsValue')}
                        />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                        <Button onClick={convertLbsToKg} className="py-2 px-4 bg-primary text-white rounded-md">
                            {t('convertLbsToKg')}
                        </Button>
                    </div>
                    {kgValue !== null && (
                        <div className="space-y-2 sm:col-span-2">
                            <h3 className="text-lg font-semibold">{t('result')}</h3>
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <p className="text-2xl font-bold">{kgValue} {t('kilograms')}</p>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
