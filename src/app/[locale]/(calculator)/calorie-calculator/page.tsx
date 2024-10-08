"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useTranslations } from 'next-intl';
import { formatNumber } from "@/utils/formatCurrency";  // Assume this function formats numbers as required.

export default function CalorieCalculator() {
    const t = useTranslations('CalcTools');

    const [age, setAge] = useState<number>(25);
    const [weight, setWeight] = useState<number>(70); // weight in kg or lbs depending on unit system
    const [height, setHeight] = useState<number>(170); // height in cm or inches depending on unit system
    const [activityLevel, setActivityLevel] = useState<number>(1.2); // default activity level
    const [calorieNeeds, setCalorieNeeds] = useState<number>(0);
    const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric'); // unit system metric or imperial

    useEffect(() => {
        calculateCalories();
    }, [age, weight, height, activityLevel, unitSystem]);

    const calculateCalories = () => {
        if (weight > 0 && height > 0 && age > 0) {
            let bmr = 0; // Basal Metabolic Rate
            if (unitSystem === 'metric') {
                // Harris-Benedict formula for metric system
                bmr = 10 * weight + 6.25 * height - 5 * age + 5; // Example formula for male
            } else {
                // Formula for imperial system (weight in lbs, height in inches)
                const weightInKg = weight / 2.20462; // convert lbs to kg
                const heightInCm = height * 2.54; // convert inches to cm
                bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5; // Example formula for male
            }

            // Adjust BMR based on activity level
            const dailyCalories = bmr * activityLevel;
            setCalorieNeeds(parseFloat(dailyCalories.toFixed(2)));
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
                <CardTitle className="flex justify-center">{t('calorieCalculatorTitle')}</CardTitle>
                <CardDescription className="flex justify-center">{t('calorieCalculatorDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    {/* Unit selection */}
                    <div className="space-y-2 sm:col-span-2">
                        <Label>{t('unitSystem')}</Label>
                        <Select onValueChange={(value: 'metric' | 'imperial') => setUnitSystem(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder={unitSystem === 'metric' ? 'Metric (kg, cm)' : 'Imperial (lbs, inches)'} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                                <SelectItem value="imperial">Imperial (lbs, inches)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        {/* Dynamic Weight Label */}
                        <Label htmlFor="weight">
                            {unitSystem === 'metric' ? `${t('weight')} (kg)` : `${t('weight')} (lbs)`}
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
                            {unitSystem === 'metric' ? `${t('height')} (cm)` : `${t('height')} (inches)`}
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

                    <div className="space-y-2">
                        {/* Activity Level */}
                        <Label htmlFor="activityLevel">{t('activityLevel')}</Label>
                        <Select onValueChange={(value: string) => setActivityLevel(Number(value))}>
                            <SelectTrigger>
                                <SelectValue placeholder={t('selectActivityLevel')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1.2">{t('sedentary')}</SelectItem>
                                <SelectItem value="1.375">{t('lightlyActive')}</SelectItem>
                                <SelectItem value="1.55">{t('moderatelyActive')}</SelectItem>
                                <SelectItem value="1.725">{t('veryActive')}</SelectItem>
                                <SelectItem value="1.9">{t('superActive')}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                        <h3 className="text-lg font-semibold">{t('calorieSummary')}</h3>
                        <div className="grid gap-2 sm:grid-cols-1">
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <p className="text-sm font-medium text-primary">{t('calorieNeeds')}</p>
                                <p className="text-2xl font-bold">{formatNumber(calorieNeeds)} {t('caloriesPerDay')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
