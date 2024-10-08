"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useTranslations } from 'next-intl';

// Function to handle plain number formatting
const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('tr-TR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

export default function BodyFatCalculator() {
    const t = useTranslations('CalcTools');
    const [gender, setGender] = useState<'male' | 'female'>('male'); // Gender
    const [weight, setWeight] = useState<number>(70); // Weight
    const [waist, setWaist] = useState<number>(85); // Waist size in cm
    const [neck, setNeck] = useState<number>(40); // Neck size in cm
    const [hip, setHip] = useState<number>(90); // Hip size for females (ignored for males)
    const [height, setHeight] = useState<number>(170); // Height in cm
    const [bodyFatPercentage, setBodyFatPercentage] = useState<number>(0);

    useEffect(() => {
        calculateBodyFat();
    }, [gender, weight, waist, neck, hip, height]);

    // Calculate Body Fat Percentage using US Navy Method
    const calculateBodyFat = () => {
        let calculatedBodyFat = 0;
        if (gender === 'male') {
            calculatedBodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
        } else {
            calculatedBodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
        }
        setBodyFatPercentage(parseFloat(calculatedBodyFat.toFixed(2)));
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
                <CardTitle className="flex justify-center">{t('bodyFatCalculatorTitle')}</CardTitle>
                <CardDescription className="flex justify-center">{t('bodyFatCalculatorDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    {/* Gender selection */}
                    <div className="space-y-2 sm:col-span-2">
                        <Label>{t('gender')}</Label>
                        <Select onValueChange={(value: 'male' | 'female') => setGender(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder={gender === 'male' ? 'Male' : 'Female'} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Weight */}
                    <div className="space-y-2">
                        <Label htmlFor="weight">{t('weight')} (kg)</Label>
                        <Input
                            id="weight"
                            type="text"
                            value={formatNumber(weight)}
                            onChange={handleInputChange(setWeight, 200)}
                            placeholder="kg"
                        />
                        <Slider
                            min={30}
                            max={200}
                            step={1}
                            value={[weight]}
                            onValueChange={(value) => setWeight(value[0])}
                        />
                    </div>

                    {/* Height */}
                    <div className="space-y-2">
                        <Label htmlFor="height">{t('height')} (cm)</Label>
                        <Input
                            id="height"
                            type="text"
                            value={formatNumber(height)}
                            onChange={handleInputChange(setHeight, 250)}
                            placeholder="cm"
                        />
                        <Slider
                            min={100}
                            max={250}
                            step={1}
                            value={[height]}
                            onValueChange={(value) => setHeight(value[0])}
                        />
                    </div>

                    {/* Waist */}
                    <div className="space-y-2">
                        <Label htmlFor="waist">{t('waist')} (cm)</Label>
                        <Input
                            id="waist"
                            type="text"
                            value={formatNumber(waist)}
                            onChange={handleInputChange(setWaist, 150)}
                            placeholder="cm"
                        />
                        <Slider
                            min={50}
                            max={150}
                            step={1}
                            value={[waist]}
                            onValueChange={(value) => setWaist(value[0])}
                        />
                    </div>

                    {/* Neck */}
                    <div className="space-y-2">
                        <Label htmlFor="neck">{t('neck')} (cm)</Label>
                        <Input
                            id="neck"
                            type="text"
                            value={formatNumber(neck)}
                            onChange={handleInputChange(setNeck, 60)}
                            placeholder="cm"
                        />
                        <Slider
                            min={20}
                            max={60}
                            step={1}
                            value={[neck]}
                            onValueChange={(value) => setNeck(value[0])}
                        />
                    </div>

                    {/* Hip for females */}
                    {gender === 'female' && (
                        <div className="space-y-2">
                            <Label htmlFor="hip">{t('hip')} (cm)</Label>
                            <Input
                                id="hip"
                                type="text"
                                value={formatNumber(hip)}
                                onChange={handleInputChange(setHip, 150)}
                                placeholder="cm"
                            />
                            <Slider
                                min={50}
                                max={150}
                                step={1}
                                value={[hip]}
                                onValueChange={(value) => setHip(value[0])}
                            />
                        </div>
                    )}

                    {/* Results */}
                    <div className="space-y-2 sm:col-span-2">
                        <h3 className="text-lg font-semibold">{t('bodyFatSummary')}</h3>
                        <div className="grid gap-2 sm:grid-cols-2">
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <p className="text-sm font-medium text-primary">{t('bodyFatPercentage')}</p>
                                <p className="text-2xl font-bold">{bodyFatPercentage}%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
