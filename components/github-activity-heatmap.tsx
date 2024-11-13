'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { format, parseISO, subDays } from "date-fns";

interface ActivityHeatmapProps {
    contributions: {
        date: string;
        count: number;
    }[];
}

export function ActivityHeatmap({ contributions }: ActivityHeatmapProps) {
    // Create a 52-week array of daily contributions
    const days = Array.from({ length: 365 }, (_, i) => {
        const date = format(subDays(new Date(), 364 - i), 'yyyy-MM-dd');
        const found = contributions.find(c => c.date === date);
        return {
            date,
            count: found?.count || 0
        };
    });

    // Group by week
    const weeks = Array.from({ length: 52 }, (_, i) =>
        days.slice(i * 7, (i + 1) * 7)
    );

    const getIntensityClass = (count: number) => {
        if (count === 0) return 'bg-muted hover:bg-muted/80';
        if (count <= 3) return 'bg-primary/30 hover:bg-primary/40';
        if (count <= 6) return 'bg-primary/50 hover:bg-primary/60';
        if (count <= 9) return 'bg-primary/70 hover:bg-primary/80';
        return 'bg-primary hover:bg-primary/90';
    };

    // Get month labels
    const monthLabels = weeks.map((week) => {
        const firstDay = parseISO(week[0].date);
        return format(firstDay, 'MMM');
    }).filter((month, i, arr) => arr.indexOf(month) === i);

    return (
        <Card className="bg-muted/50">
            <CardHeader>
                <CardTitle className="text-sm">Contribution Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div className="flex gap-1 text-xs text-muted-foreground mb-2">
                        {monthLabels.map((month, i) => (
                            <div key={i} className="flex-1">{month}</div>
                        ))}
                    </div>
                    <TooltipProvider>
                        <div className="flex gap-1">
                            {weeks.map((week, weekIndex) => (
                                <div key={weekIndex} className="flex flex-col gap-1">
                                    {week.map((day) => (
                                        <Tooltip key={day.date}>
                                            <TooltipTrigger asChild>
                                                <div
                                                    className={`w-3 h-3 rounded-sm ${getIntensityClass(day.count)} transition-colors`}
                                                    aria-label={`${format(parseISO(day.date), 'MMM d, yyyy')}: ${day.count} contributions`}
                                                />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="text-xs">
                                                    {format(parseISO(day.date), 'MMM d, yyyy')}:{' '}
                                                    {day.count} contributions
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </TooltipProvider>
                    <div className="flex items-center gap-2 mt-4">
                        <span className="text-xs text-muted-foreground">Less</span>
                        {[0, 3, 6, 9, 12].map((count) => (
                            <div
                                key={count}
                                className={`w-3 h-3 rounded-sm ${getIntensityClass(count)}`}
                            />
                        ))}
                        <span className="text-xs text-muted-foreground">More</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 