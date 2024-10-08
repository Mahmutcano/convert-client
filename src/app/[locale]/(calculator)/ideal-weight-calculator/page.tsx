"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useTranslations } from 'next-intl';

export default function IdealWeightCalculator() {
    const t = useTranslations('CalcTools');
    const [height, setHeight] = useState<number>(170); // Height in cm or inches
    const [gender, setGender] = useState<string>('male'); // Gender selection
    const [idealWeight, setIdealWeight] = useState<number>(0);
    const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric'); // Unit system (metric or imperial)

    useEffect(() => {
        calculateIdealWeight();
    }, [height, gender, unitSystem]);

    const calculateIdealWeight = () => {
        let calculatedIdealWeight = 0;
        if (unitSystem === 'metric') {
            // Metric Ideal Weight Calculation (Devine Formula)
            if (gender === 'male') {
                calculatedIdealWeight = 50 + 2.3 * (height / 2.54 - 60); // Formula for males
            } else {
                calculatedIdealWeight = 45.5 + 2.3 * (height / 2.54 - 60); // Formula for females
            }
        } else {
            // Imperial Ideal Weight Calculation (Devine Formula)
            if (gender === 'male') {
                calculatedIdealWeight = 50 + 2.3 * (height - 60); // Formula for males
            } else {
                calculatedIdealWeight = 45.5 + 2.3 * (height - 60); // Formula for females
            }
        }
        setIdealWeight(parseFloat(calculatedIdealWeight.toFixed(2)));
    };

    const handleInputChange = (setValue: React.Dispatch<React.SetStateAction<number>>, maxValue: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, ""); // Only allow digits
        value = value.replace(/^0+/, ""); // Remove leading zeros
        if (Number(value) > maxValue) value = maxValue.toString(); // Ensure value doesn't exceed maxValue
        setValue(value === "" ? 0 : Number(value)); // Set to 0 if empty, otherwise set the value
    };

    return (
        <Card className="w-full h-screen flex flex-col justify-center items-center py-24 md:py-24 lg:py-24">
            <CardHeader>
                <CardTitle className="flex justify-center">{t('idealWeightCalculatorTitle')}</CardTitle>
                <CardDescription className="flex justify-center">{t('idealWeightCalculatorDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    {/* Unit selection */}
                    <div className="space-y-2 sm:col-span-2">
                        <Label>{t('unitSystem')}</Label>
                        <Select onValueChange={(value: 'metric' | 'imperial') => setUnitSystem(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder={unitSystem === 'metric' ? 'Metric (cm)' : 'Imperial (inches)'} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="metric">Metric (cm)</SelectItem>
                                <SelectItem value="imperial">Imperial (inches)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Gender selection */}
                    <div className="space-y-2 sm:col-span-2">
                        <Label>{t('gender')}</Label>
                        <Select onValueChange={(value: string) => setGender(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder={gender === 'male' ? t('male') : t('female')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">{t('male')}</SelectItem>
                                <SelectItem value="female">{t('female')}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Height input */}
                    <div className="space-y-2">
                        <Label htmlFor="height">{unitSystem === 'metric' ? `${t('height')} (cm)` : `${t('height')} (inches)`}</Label>
                        <Input
                            id="height"
                            type="text"
                            value={height.toString()}
                            onChange={handleInputChange(setHeight, unitSystem === 'metric' ? 250 : 100)}
                            placeholder={unitSystem === 'metric' ? 'cm' : 'inches'}
                        />
                        <Slider
                            min={unitSystem === 'metric' ? 100 : 39}
                            max={unitSystem === 'metric' ? 250 : 100}
                            step={1}
                            value={[height]}
                            onValueChange={(value) => setHeight(value[0])}
                        />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                        <h3 className="text-lg font-semibold">{t('idealWeightSummary')}</h3>
                        <div className="p-4 bg-primary/10 rounded-lg">
                            <p className="text-sm font-medium text-primary">{t('idealWeightValue')}</p>
                            <p className="text-2xl font-bold">{idealWeight} {unitSystem === 'metric' ? 'kg' : 'lbs'}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
