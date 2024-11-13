import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Github, Globe, Mail, MessageSquare, Twitter } from "lucide-react";
import { ProjectsTab } from "./projects-tab";

export function HeroYangu() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background mt-16">
            <div className="container px-4 md:px-6">
                <Tabs defaultValue="projects" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="projects">Projects</TabsTrigger>
                        <TabsTrigger value="stats">Stats</TabsTrigger>
                        <TabsTrigger value="contact">Contact</TabsTrigger>
                    </TabsList>

                    <TabsContent value="projects">
                        <ProjectsTab />
                    </TabsContent>

                    <TabsContent value="stats" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Commits</CardTitle>
                                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">2,350</div>
                                </CardContent>
                            </Card>
                            {/* Add more stat cards */}
                        </div>
                    </TabsContent>

                    <TabsContent value="contact" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Get in Touch</CardTitle>
                                <CardDescription>Feel free to reach out for collaborations or just a chat</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span>hello@example.com</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                    <span>Discord: yangu#0000</span>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
} 