"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

// Helper function to clean up the input and remove leading zeros
const handleInputChange = (setValue: React.Dispatch<React.SetStateAction<number>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    value = value.replace(/^0+/, ""); // Remove leading zeros
    setValue(value === '' ? 0 : Number(value)); // Default to 0 if input is empty
};

export default function ROASCalculator() {
    const t = useTranslations('CalcTools');
    const [revenue, setRevenue] = useState<number>(0);
    const [adSpend, setAdSpend] = useState<number>(0);
    const [roas, setROAS] = useState<number | null>(null); // ROAS result

    const calculateROAS = () => {
        if (adSpend > 0) {
            const calculatedROAS = revenue / adSpend;
            setROAS(parseFloat(calculatedROAS.toFixed(2)));
        } else {
            setROAS(null); // Reset ROAS if input is invalid
        }
    };

    return (
        <Card className="w-full h-screen flex flex-col justify-center items-center py-24 md:py-24 lg:py-24">
            <CardHeader>
                <CardTitle className="flex justify-center">{t('roasCalculatorTitle')}</CardTitle>
                <CardDescription className="flex justify-center">{t('roasCalculatorDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="revenue">{t('revenue')}</Label>
                        <Input
                            id="revenue"
                            type="text"
                            value={revenue > 0 ? revenue.toString() : ''}
                            onChange={handleInputChange(setRevenue)}
                            placeholder={t('enterRevenue')}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="adSpend">{t('adSpend')}</Label>
                        <Input
                            id="adSpend"
                            type="text"
                            value={adSpend > 0 ? adSpend.toString() : ''}
                            onChange={handleInputChange(setAdSpend)}
                            placeholder={t('enterAdSpend')}
                        />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                        <Button onClick={calculateROAS} className="py-2 px-4 bg-primary text-white rounded-md">
                            {t('calculateROAS')}
                        </Button>
                    </div>
                    {roas !== null && (
                        <div className="space-y-2 sm:col-span-2">
                            <h3 className="text-lg font-semibold">{t('result')}</h3>
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <p className="text-2xl font-bold">{roas} {t('xReturn')}</p>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
