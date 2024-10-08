"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useTranslations } from 'next-intl';

// Function to handle plain number formatting with dots for thousands
const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

export default function BMICalculator() {
    const t = useTranslations('CalcTools'); // Assuming you're using 'CalcTools' namespace for translation
    const [weight, setWeight] = useState<number>(70); // Weight
    const [height, setHeight] = useState<number>(170); // Height in cm
    const [bmi, setBMI] = useState<number>(0);
    const [bmiStatus, setBMIStatus] = useState<string>("");
    const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric'); // Unit system (metric or imperial)

    useEffect(() => {
        calculateBMI();
    }, [weight, height, unitSystem]);

    const calculateBMI = () => {
        let calculatedBMI = 0;
        if (height > 0 && weight > 0) {
            if (unitSystem === 'metric') {
                const heightInMeters = height / 100;
                calculatedBMI = parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(1));
            } else {
                // Imperial BMI formula: (weight (lb) / [height (in)]^2) * 703
                const heightInInches = height;
                calculatedBMI = parseFloat(((weight / (heightInInches * heightInInches)) * 703).toFixed(1));
            }
            setBMI(calculatedBMI);

            // Determine BMI status
            if (calculatedBMI < 18.5) {
                setBMIStatus(t('underweight', { defaultValue: 'Underweight' }));
            } else if (calculatedBMI >= 18.5 && calculatedBMI < 24.9) {
                setBMIStatus(t('normalWeight', { defaultValue: 'Normal weight' }));
            } else if (calculatedBMI >= 25 && calculatedBMI < 29.9) {
                setBMIStatus(t('overweight', { defaultValue: 'Overweight' }));
            } else {
                setBMIStatus(t('obese', { defaultValue: 'Obese' }));
            }
        }
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
                <CardTitle className="flex justify-center">{t('bmiCalculatorTitle', { defaultValue: 'BMI Calculator' })}</CardTitle>
                <CardDescription className="flex justify-center">{t('bmiCalculatorDescription', { defaultValue: 'Calculate your Body Mass Index' })}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    {/* Unit selection */}
                    <div className="space-y-2 sm:col-span-2">
                        <Label>{t('unitSystem', { defaultValue: 'Unit System' })}</Label>
                        <Select onValueChange={(value: 'metric' | 'imperial') => setUnitSystem(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder={unitSystem === 'metric' ? 'Metric (kg, cm)' : 'Imperial (lbs, inches)'} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="metric">{t('metric', { defaultValue: 'Metric (kg, cm)' })}</SelectItem>
                                <SelectItem value="imperial">{t('imperial', { defaultValue: 'Imperial (lbs, inches)' })}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        {/* Dynamic Weight Label */}
                        <Label htmlFor="weight">
                            {unitSystem === 'metric' ? `${t('weight', { defaultValue: 'Weight' })} (kg)` : `${t('weight', { defaultValue: 'Weight' })} (lbs)`}
                        </Label>
                        <Input
                            id="weight"
                            type="text"
                            value={formatNumber(weight)}
                            onChange={handleInputChange(setWeight, unitSystem === 'metric' ? 200 : 440)}
                            placeholder={unitSystem === 'metric' ? 'kg' : 'lbs'}
                        />
                        <Slider
                            min={unitSystem === 'metric' ? 30 : 66}
                            max={unitSystem === 'metric' ? 200 : 440}
                            step={1}
                            value={[weight]}
                            onValueChange={(value) => setWeight(value[0])}
                        />
                    </div>
                    <div className="space-y-2">
                        {/* Dynamic Height Label */}
                        <Label htmlFor="height">
                            {unitSystem === 'metric' ? `${t('height', { defaultValue: 'Height' })} (cm)` : `${t('height', { defaultValue: 'Height' })} (inches)`}
                        </Label>
                        <Input
                            id="height"
                            type="text"
                            value={formatNumber(height)}
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
                        <h3 className="text-lg font-semibold">{t('bmiSummary', { defaultValue: 'BMI Summary' })}</h3>
                        <div className="grid gap-2 sm:grid-cols-2">
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <p className="text-sm font-medium text-primary">{t('bmiValue', { defaultValue: 'BMI Value' })}</p>
                                <p className="text-2xl font-bold">{bmi}</p>
                            </div>
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <p className="text-sm font-medium text-primary">{t('bmiStatus', { defaultValue: 'BMI Status' })}</p>
                                <p className="text-2xl font-bold">{bmiStatus}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
