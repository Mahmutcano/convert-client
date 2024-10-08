"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useTranslations } from 'next-intl';

export default function PaceCalculator() {
    const t = useTranslations('CalcTools');
    const [distance, setDistance] = useState<number>(5); // Distance in km or miles
    const [timeInMinutes, setTimeInMinutes] = useState<number>(30); // Time in minutes
    const [pace, setPace] = useState<string>(''); // Pace calculated
    const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric'); // Unit system (metric or imperial)

    useEffect(() => {
        calculatePace();
    }, [distance, timeInMinutes, unitSystem]);

    const calculatePace = () => {
        if (distance > 0 && timeInMinutes > 0) {
            const pacePerKmOrMile = timeInMinutes / distance;
            const minutes = Math.floor(pacePerKmOrMile);
            const seconds = Math.round((pacePerKmOrMile - minutes) * 60);
            setPace(`${minutes}:${seconds < 10 ? '0' : ''}${seconds} ${unitSystem === 'metric' ? 'min/km' : 'min/mile'}`);
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
                <CardTitle className="flex justify-center">{t('paceCalculatorTitle')}</CardTitle>
                <CardDescription className="flex justify-center">{t('paceCalculatorDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    {/* Unit selection */}
                    <div className="space-y-2 sm:col-span-2">
                        <Label>{t('unitSystem')}</Label>
                        <Select onValueChange={(value: 'metric' | 'imperial') => setUnitSystem(value)}>
                            <SelectTrigger>
                                <SelectValue placeholder={unitSystem === 'metric' ? 'Metric (km)' : 'Imperial (miles)'} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="metric">Metric (km)</SelectItem>
                                <SelectItem value="imperial">Imperial (miles)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Distance input */}
                    <div className="space-y-2">
                        <Label htmlFor="distance">{unitSystem === 'metric' ? `${t('distance')} (km)` : `${t('distance')} (miles)`}</Label>
                        <Input
                            id="distance"
                            type="text"
                            value={distance.toString()}
                            onChange={handleInputChange(setDistance, unitSystem === 'metric' ? 100 : 62)}
                            placeholder={unitSystem === 'metric' ? 'km' : 'miles'}
                        />
                        <Slider
                            min={1}
                            max={unitSystem === 'metric' ? 100 : 62}
                            step={1}
                            value={[distance]}
                            onValueChange={(value) => setDistance(value[0])}
                        />
                    </div>

                    {/* Time input */}
                    <div className="space-y-2">
                        <Label htmlFor="time">{t('timeInMinutes')}</Label>
                        <Input
                            id="time"
                            type="text"
                            value={timeInMinutes.toString()}
                            onChange={handleInputChange(setTimeInMinutes, 1000)}
                            placeholder={t('minutes')}
                        />
                        <Slider
                            min={1}
                            max={1000}
                            step={1}
                            value={[timeInMinutes]}
                            onValueChange={(value) => setTimeInMinutes(value[0])}
                        />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                        <h3 className="text-lg font-semibold">{t('paceSummary')}</h3>
                        <div className="p-4 bg-primary/10 rounded-lg">
                            <p className="text-sm font-medium text-primary">{t('paceValue')}</p>
                            <p className="text-2xl font-bold">{pace}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
