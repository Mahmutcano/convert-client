"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function TimeCalculator() {
    const t = useTranslations('CalcTools');
    const [hours1, setHours1] = useState<string>("0");
    const [minutes1, setMinutes1] = useState<string>("0");
    const [hours2, setHours2] = useState<string>("0");
    const [minutes2, setMinutes2] = useState<string>("0");
    const [result, setResult] = useState<string>("");

    const calculateTime = (operation: "add" | "subtract") => {
        const totalMinutes1 = parseInt(hours1) * 60 + parseInt(minutes1);
        const totalMinutes2 = parseInt(hours2) * 60 + parseInt(minutes2);

        let totalResultMinutes = operation === "add" ? totalMinutes1 + totalMinutes2 : totalMinutes1 - totalMinutes2;

        const resultHours = Math.floor(Math.abs(totalResultMinutes) / 60);
        const resultMinutes = Math.abs(totalResultMinutes) % 60;
        const sign = totalResultMinutes < 0 ? "-" : "";

        setResult(`${sign}${resultHours} ${t('hours')} ${resultMinutes} ${t('minutes')}`);
    };

    return (
        <Card className="w-full h-screen flex flex-col justify-center items-center py-24 md:py-24 lg:py-24">
            <CardHeader>
                <CardTitle className="flex justify-center">{t('timeCalculatorTitle')}</CardTitle>
                <CardDescription className="flex justify-center">{t('timeCalculatorDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="hours1">{t('hours1')}</Label>
                        <Input
                            id="hours1"
                            type="text"
                            value={hours1}
                            onChange={(e) => setHours1(e.target.value.replace(/\D/g, ""))}
                            placeholder={t('enterHours')}
                        />
                        <Label htmlFor="minutes1">{t('minutes1')}</Label>
                        <Input
                            id="minutes1"
                            type="text"
                            value={minutes1}
                            onChange={(e) => setMinutes1(e.target.value.replace(/\D/g, ""))}
                            placeholder={t('enterMinutes')}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="hours2">{t('hours2')}</Label>
                        <Input
                            id="hours2"
                            type="text"
                            value={hours2}
                            onChange={(e) => setHours2(e.target.value.replace(/\D/g, ""))}
                            placeholder={t('enterHours')}
                        />
                        <Label htmlFor="minutes2">{t('minutes2')}</Label>
                        <Input
                            id="minutes2"
                            type="text"
                            value={minutes2}
                            onChange={(e) => setMinutes2(e.target.value.replace(/\D/g, ""))}
                            placeholder={t('enterMinutes')}
                        />
                    </div>

                    <div className="space-y-4 sm:col-span-2">
                        <Button
                            onClick={() => calculateTime("add")}
                            className="py-2 px-4 bg-primary text-white rounded-md mr-2"
                        >
                            {t('add')}
                        </Button>
                        <Button
                            onClick={() => calculateTime("subtract")}
                            className="py-2 px-4 bg-primary text-white rounded-md"
                        >
                            {t('subtract')}
                        </Button>
                    </div>

                    {result && (
                        <div className="space-y-2 sm:col-span-2">
                            <h3 className="text-lg font-semibold">{t('result')}</h3>
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <p className="text-2xl font-bold">{result}</p>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
