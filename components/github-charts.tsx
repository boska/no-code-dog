'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import Image from 'next/image';

interface GithubChartsProps {
    languageData: { name: string; value: number; }[];
    repoStats: { name: string; stars: number; forks: number; value: number; }[];
}

const COLORS = ['#FF6B6B',
    '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9E579D', '#574B90'];

export function GithubCharts({ repoStats }: Omit<GithubChartsProps, 'languageData'>) {
    return (
        <Card className="bg-muted/50">
            <CardHeader>
                <CardTitle className="text-sm">Repository Statistics</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {repoStats.map((stat) => (
                        <div key={stat.name} className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">
                                {stat.name}
                            </p>
                            <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
} 