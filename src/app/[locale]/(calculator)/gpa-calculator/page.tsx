"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function GPACalculator() {
    const t = useTranslations('CalcTools');
    const [courses, setCourses] = useState([{ grade: '', credits: '' }]); // Array of courses
    const [gpa, setGPA] = useState<number | null>(null); // Calculated GPA

    const handleInputChange = (index: number, field: 'grade' | 'credits', value: string) => {
        const updatedCourses = [...courses];
        updatedCourses[index][field] = value.replace(/\D/g, ''); // Sanitize input to allow only numbers
        setCourses(updatedCourses);
    };

    const addCourse = () => {
        setCourses([...courses, { grade: '', credits: '' }]);
    };

    const removeCourse = (index: number) => {
        const updatedCourses = courses.filter((_, i) => i !== index);
        setCourses(updatedCourses);
    };

    const calculateGPA = () => {
        let totalCredits = 0;
        let totalPoints = 0;
        courses.forEach(course => {
            const grade = parseFloat(course.grade);
            const credits = parseFloat(course.credits);
            if (!isNaN(grade) && !isNaN(credits)) {
                totalCredits += credits;
                totalPoints += grade * credits;
            }
        });
        const calculatedGPA = totalCredits > 0 ? totalPoints / totalCredits : 0;
        setGPA(parseFloat(calculatedGPA.toFixed(2)));
    };

    return (
        <Card className="w-full h-screen flex flex-col justify-center items-center py-24 md:py-24 lg:py-24">
            <CardHeader>
                <CardTitle className="flex justify-center">{t('gpaCalculatorTitle')}</CardTitle>
                <CardDescription className="flex justify-center">{t('gpaCalculatorDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    {courses.map((course, index) => (
                        <div key={index} className="space-y-2 sm:col-span-2">
                            <Label htmlFor={`grade-${index}`}>{t('grade')}</Label>
                            <Input
                                id={`grade-${index}`}
                                type="text"
                                value={course.grade}
                                onChange={(e) => handleInputChange(index, 'grade', e.target.value)}
                                placeholder={t('enterGrade')}
                            />
                            <Label htmlFor={`credits-${index}`}>{t('credits')}</Label>
                            <Input
                                id={`credits-${index}`}
                                type="text"
                                value={course.credits}
                                onChange={(e) => handleInputChange(index, 'credits', e.target.value)}
                                placeholder={t('enterCredits')}
                            />
                            <Button onClick={() => removeCourse(index)} className="bg-red-500 text-white">
                                {t('removeCourse')}
                            </Button>
                        </div>
                    ))}
                    <Button onClick={addCourse} className="bg-primary text-white">
                        {t('addCourse')}
                    </Button>
                    <Button onClick={calculateGPA} className="py-2 px-4 bg-primary text-white rounded-md sm:col-span-2">
                        {t('calculateGPA')}
                    </Button>
                    {gpa !== null && (
                        <div className="space-y-2 sm:col-span-2">
                            <h3 className="text-lg font-semibold">{t('result')}</h3>
                            <div className="p-4 bg-primary/10 rounded-lg">
                                <p className="text-2xl font-bold">{gpa}</p>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
