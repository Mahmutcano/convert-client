"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function HexToDecimalConverter() {
    const t = useTranslations('ConversionsTools');
    const [hexValue, setHexValue] = useState<string>(""); // Hexadecimal input value
    const [decimalValue, setDecimalValue] = useState<number | null>(null); // Decimal result

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.toUpperCase().replace(/[^0-9A-F]/g, ""); // Sanitize input to allow only valid hex characters
        setHexValue(inputValue);
    };

    const convertHexToDecimal = () => {
        // Validate and convert hex to decimal
        if (/^[0-9A-F]+$/i.test(hexValue)) {
            const decimalResult = parseInt(hexValue, 16);
            setDecimalValue(decimalResult);
        } else {
            setDecimalValue(null); // Reset if input is invalid
        }
    };

    return (
        <Card className="w-full h-screen flex flex-col justify-center items-center py-24 md:py-24 lg:py-24">
            <CardHeader>
                <CardTitle className="flex justify-center">{t('hexToDecimalTitle')}</CardTitle>
                <CardDescription className="flex justify-center">{t('hexToDecimalDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="hexValue">{t('hexValue')}</Label>
                        <Input
                            id="hexValue"
                            type="text"
                            value={hexValue}
                            onChange={handleInputChange} // Use the handleInputChange function
                            placeholder={t('enterHexValue')}
                        />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                        <Button onClick={convertHexToDecimal} className="py-2 px-4 bg-primary text-white rounded-md">
                            {t('convertHexToDecimal')}
                        </Button>
                    </div>
                    {decimalValue !== null && (
                        <div className="space-y-2 sm:col-span-2">
                            <h3 className="text-lg font-semibold">{t('result')}</h3>
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <p className="text-2xl font-bold">{decimalValue}</p>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
