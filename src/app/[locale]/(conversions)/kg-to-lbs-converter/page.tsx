"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function KgToLbsConverter() {
    const t = useTranslations('ConversionsTools');
    const [kgValue, setKgValue] = useState<number>(0); // Kilograms input value
    const [lbsValue, setLbsValue] = useState<number | null>(null); // Pounds result

    const convertKgToLbs = () => {
        if (kgValue > 0) {
            const lbsResult = kgValue * 2.20462; // Conversion factor from kg to lbs
            setLbsValue(parseFloat(lbsResult.toFixed(2))); // Keep two decimal places
        } else {
            setLbsValue(null); // Reset if input is invalid
        }
    };

    return (
        <Card className="w-full h-screen flex flex-col justify-center items-center py-24 md:py-24 lg:py-24">
            <CardHeader>
                <CardTitle className="flex justify-center">{t('kgToLbsTitle')}</CardTitle>
                <CardDescription className="flex justify-center">{t('kgToLbsDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="kgValue">{t('kgValue')}</Label>
                        <Input
                            id="kgValue"
                            type="number"
                            value={kgValue}
                            onChange={(e) => setKgValue(Number(e.target.value))}
                            placeholder={t('enterKgValue')}
                        />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                        <Button onClick={convertKgToLbs} className="py-2 px-4 bg-primary text-white rounded-md">
                            {t('convertKgToLbs')}
                        </Button>
                    </div>
                    {lbsValue !== null && (
                        <div className="space-y-2 sm:col-span-2">
                            <h3 className="text-lg font-semibold">{t('result')}</h3>
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <p className="text-2xl font-bold">{lbsValue} lbs</p>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
