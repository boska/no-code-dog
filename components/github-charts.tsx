'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface GithubChartsProps {
    languageData: { name: string; value: number; }[];
    repoStats: { name: string; stars: number; forks: number; }[];
}

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9E579D', '#574B90'];

export function GithubCharts({ languageData, repoStats }: GithubChartsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-muted/50">
                <CardHeader>
                    <CardTitle className="text-sm">Languages Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={languageData}
                                cx="50%"
                                cy="50%"
                                labelLine={true}
                                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {languageData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                        className="stroke-border"
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card className="bg-muted/50">
                <CardHeader>
                    <CardTitle className="text-sm">Repository Stats</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={repoStats}>
                            <Line
                                type="monotone"
                                dataKey="stars"
                                className="stroke-primary"
                                strokeWidth={2}
                            />
                            <Line
                                type="monotone"
                                dataKey="forks"
                                className="stroke-secondary"
                                strokeWidth={2}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
} 