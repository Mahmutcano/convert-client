"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function MarginCalculator() {
    const t = useTranslations('CalcTools');
    const [costPrice, setCostPrice] = useState<number>(0);
    const [sellingPrice, setSellingPrice] = useState<number>(0);
    const [margin, setMargin] = useState<number | null>(null); // Calculated margin

    const calculateMargin = () => {
        if (costPrice > 0 && sellingPrice > 0) {
            const marginValue = ((sellingPrice - costPrice) / sellingPrice) * 100;
            setMargin(parseFloat(marginValue.toFixed(2))); // Keep margin to two decimal places
        } else {
            setMargin(null);
        }
    };

    // Updated Input Handler
    const handleInputChange = (setValue: React.Dispatch<React.SetStateAction<number>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ""); // Allow only digits
        value = value.replace(/^0+/, ""); // Remove leading zeros
        setValue(value === '' ? 0 : Number(value)); // Set 0 if empty, otherwise set the number
    };

    return (
        <Card className="w-full h-screen flex flex-col justify-center items-center py-24 md:py-24 lg:py-24">
            <CardHeader>
                <CardTitle className="flex justify-center">{t('marginCalculatorTitle')}</CardTitle>
                <CardDescription className="flex justify-center">{t('marginCalculatorDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="costPrice">{t('costPrice')}</Label>
                        <Input
                            id="costPrice"
                            type="text"
                            value={costPrice > 0 ? costPrice.toString() : ''} // Keep blank if 0
                            onChange={handleInputChange(setCostPrice)}
                            placeholder={t('enterCostPrice')}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="sellingPrice">{t('sellingPrice')}</Label>
                        <Input
                            id="sellingPrice"
                            type="text"
                            value={sellingPrice > 0 ? sellingPrice.toString() : ''} // Keep blank if 0
                            onChange={handleInputChange(setSellingPrice)}
                            placeholder={t('enterSellingPrice')}
                        />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                        <Button onClick={calculateMargin} className="py-2 px-4 bg-primary text-white rounded-md">
                            {t('calculateMargin')}
                        </Button>
                    </div>
                    {margin !== null && (
                        <div className="space-y-2 sm:col-span-2">
                            <h3 className="text-lg font-semibold">{t('result')}</h3>
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <p className="text-2xl font-bold">{margin}%</p>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
