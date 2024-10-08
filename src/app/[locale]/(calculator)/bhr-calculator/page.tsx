"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useTranslations } from 'next-intl';

export default function BMRCalculator() {
    const t = useTranslations('CalcTools');
    const [weight, setWeight] = useState<number>(70); // kg or lbs
    const [height, setHeight] = useState<number>(170); // cm or inches
    const [age, setAge] = useState<number>(25);
    const [gender, setGender] = useState<string>('male');
    const [bmr, setBMR] = useState<number>(0);
    const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric'); // Unit system (metric or imperial)

    useEffect(() => {
        calculateBMR();
    }, [weight, height, age, gender, unitSystem]);

    const calculateBMR = () => {
        let calculatedBMR = 0;
        if (unitSystem === 'metric') {
            // Metric BMR calculation
            if (gender === 'male') {
                calculatedBMR = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
            } else {
                calculatedBMR = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
            }
        } else {
            // Imperial BMR calculation
            if (gender === 'male') {
                calculatedBMR = 88.36 + (6.23 * weight) + (12.7 * height) - (6.8 * age);
            } else {
                calculatedBMR = 447.6 + (4.35 * weight) + (4.7 * height) - (4.7 * age);
            }
        }
        setBMR(parseFloat(calculatedBMR.toFixed(2)));
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
                <CardTitle className="flex justify-center">{t('bmrCalculatorTitle')}</CardTitle>
                <CardDescription className="flex justify-center">{t('bmrCalculatorDescription')}</CardDescription>
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

                    <div className="space-y-2">
                        <Label htmlFor="weight">{unitSystem === 'metric' ? `${t('weight')} (kg)` : `${t('weight')} (lbs)`}</Label>
                        <Input
                            id="weight"
                            type="text"
                            value={weight.toString()}
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

                    <div className="space-y-2">
                        <Label htmlFor="age">{t('age')}</Label>
                        <Input
                            id="age"
                            type="text"
                            value={age.toString()}
                            onChange={handleInputChange(setAge, 100)}
                        />
                        <Slider
                            min={1}
                            max={100}
                            step={1}
                            value={[age]}
                            onValueChange={(value) => setAge(value[0])}
                        />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                        <h3 className="text-lg font-semibold">{t('bmrSummary')}</h3>
                        <div className="p-4 bg-primary/10 rounded-lg">
                            <p className="text-sm font-medium text-primary">{t('bmrValue')}</p>
                            <p className="text-2xl font-bold">{bmr}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
