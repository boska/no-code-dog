'use client';

import { useEffect, useState } from "react";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface CountdownTimerProps {
    targetDate: Date;
    initialTimeLeft: TimeLeft;
}

export function CountdownTimer({ targetDate, initialTimeLeft }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(initialTimeLeft);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="grid grid-cols-4 gap-4 max-w-xl mx-auto">
            {Object.entries(timeLeft).map(([key, value]) => (
                <div key={key} className="bg-background/5 p-4 rounded-lg backdrop-blur-sm border border-foreground/10">
                    <div className="text-3xl font-bold">{value}</div>
                    <div className="text-sm text-muted-foreground capitalize">{key}</div>
                </div>
            ))}
        </div>
    );
} 