import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Star, GitFork, Users, Globe, Calendar, MapPin, Building, Twitter } from "lucide-react";
import { getGithubProfile } from "@/utils/github";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { MapView } from './map-view';
import { GithubCharts } from './github-charts';

export async function GithubCard() {
    const { user, repos } = await getGithubProfile('boska');

    const languageStats = repos.reduce((acc: Record<string, number>, repo) => {
        if (repo.language) {
            acc[repo.language] = (acc[repo.language] || 0) + 1;
        }
        return acc;
    }, {});

    const languageData = Object.entries(languageStats).map(([name, count]) => ({
        name,
        value: count
    }));

    const repoStats = repos.map(repo => ({
        name: repo.name,
        stars: repo.stargazers_count,
        forks: repo.forks_count
    }));

    return (
        <Card className="max-w-5xl mx-auto bg-card/30 backdrop-blur-sm border border-border">
            <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={user.avatar_url} />
                            <AvatarFallback>GH</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Github className="h-5 w-5" />
                                {user.name || user.login}
                            </CardTitle>
                            <CardDescription className="mt-2">{user.bio}</CardDescription>
                            <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
                                {user.company && (
                                    <div className="flex items-center gap-1">
                                        <Building className="h-4 w-4" />
                                        {user.company}
                                    </div>
                                )}
                                {user.location && (
                                    <div className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        {user.location}
                                    </div>
                                )}
                                {user.blog && (
                                    <Link href={user.blog} target="_blank" className="flex items-center gap-1 hover:text-primary">
                                        <Globe className="h-4 w-4" />
                                        Website
                                    </Link>
                                )}
                                {user.twitter_username && (
                                    <Link href={`https://twitter.com/${user.twitter_username}`} target="_blank" className="flex items-center gap-1 hover:text-primary">
                                        <Twitter className="h-4 w-4" />
                                        @{user.twitter_username}
                                    </Link>
                                )}
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    Joined {formatDistanceToNow(new Date(user.created_at), { addSuffix: true })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-6 text-sm">
                        <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{user.followers} followers</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Github className="h-4 w-4" />
                            <span>{user.public_repos} repos</span>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-8">
                <GithubCharts
                    languageData={languageData}
                    repoStats={repoStats}
                />
                <MapView />
            </CardContent>
        </Card>
    );
} 