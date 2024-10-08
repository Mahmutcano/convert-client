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

export default function EPMCalculator() {
    const t = useTranslations('CalcTools');
    const [totalEarnings, setTotalEarnings] = useState<number>(0);
    const [impressions, setImpressions] = useState<number>(0);
    const [epm, setEPM] = useState<number | null>(null); // EPM result

    const calculateEPM = () => {
        if (impressions > 0) {
            const calculatedEPM = (totalEarnings / impressions) * 1000;
            setEPM(parseFloat(calculatedEPM.toFixed(2)));
        } else {
            setEPM(null); // Reset EPM if input is invalid
        }
    };

    return (
        <Card className="w-full h-screen flex flex-col justify-center items-center py-24 md:py-24 lg:py-24">
            <CardHeader>
                <CardTitle className="flex justify-center">{t('epmCalculatorTitle')}</CardTitle>
                <CardDescription className="flex justify-center">{t('epmCalculatorDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="totalEarnings">{t('totalEarnings')}</Label>
                        <Input
                            id="totalEarnings"
                            type="text"
                            value={totalEarnings > 0 ? totalEarnings.toString() : ''}
                            onChange={handleInputChange(setTotalEarnings)}
                            placeholder={t('enterTotalEarnings')}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="impressions">{t('impressions')}</Label>
                        <Input
                            id="impressions"
                            type="text"
                            value={impressions > 0 ? impressions.toString() : ''}
                            onChange={handleInputChange(setImpressions)}
                            placeholder={t('enterImpressions')}
                        />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                        <Button onClick={calculateEPM} className="py-2 px-4 bg-primary text-white rounded-md">
                            {t('calculateEPM')}
                        </Button>
                    </div>
                    {epm !== null && (
                        <div className="space-y-2 sm:col-span-2">
                            <h3 className="text-lg font-semibold">{t('result')}</h3>
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <p className="text-2xl font-bold">{epm} {t('perThousandImpressions')}</p>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
