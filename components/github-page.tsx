import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Star, GitFork, Users, Globe, Calendar, MapPin, Building, Twitter } from "lucide-react";
import { getGithubProfile } from "@/utils/github";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { MapView } from './map-view';
import { GithubCharts } from './github-charts';

// Define tech stack categories with specific order
const techStackOrder = ['iOS', 'Frontend', 'Backend', 'Other'] as const;

const techStacks = {
    iOS: ['Swift', 'Objective-C'],
    Frontend: ['TypeScript', 'JavaScript', 'Vue', 'React', 'HTML', 'CSS'],
    Backend: ['Node', 'Python', 'Ruby', 'Go', 'Java'],
    Other: ['Shell', 'Dockerfile']
} as const;

// Helper function to categorize repos
function categorizeRepo(repo: any) {
    if (!repo.language) return 'Other';

    for (const [category, languages] of Object.entries(techStacks)) {
        if (languages.includes(repo.language)) {
            return category;
        }
    }
    return 'Other';
}

export async function GithubCard() {
    const { user, repos } = await getGithubProfile('boska');

    // Group repositories by tech stack
    const categorizedRepos = repos.reduce((acc: Record<string, any[]>, repo) => {
        const category = categorizeRepo(repo);
        acc[category] = acc[category] || [];
        acc[category].push(repo);
        return acc;
    }, {});

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

                {/* Categorized Repository Grid with ordered sections */}
                <div className="space-y-6">
                    {techStackOrder.map(category =>
                        categorizedRepos[category]?.length > 0 && (
                            <div key={category} className="space-y-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    {category === 'iOS' && '📱 '}
                                    {category === 'Frontend' && '🌐 '}
                                    {category === 'Backend' && '⚙️ '}
                                    {category === 'Other' && '🔧 '}
                                    {category}
                                </h3>
                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    {categorizedRepos[category].map((repo) => (
                                        <Link
                                            key={repo.name}
                                            href={repo.html_url}
                                            target="_blank"
                                            className="block group"
                                        >
                                            <Card className="h-full bg-muted/50 hover:bg-muted/70 transition-colors border border-border">
                                                <CardHeader className="p-4">
                                                    <CardTitle className="text-sm group-hover:text-primary transition-colors">
                                                        {repo.name}
                                                    </CardTitle>
                                                    <CardDescription className="text-xs line-clamp-2">
                                                        {repo.description || "No description provided"}
                                                    </CardDescription>
                                                    {repo.topics && repo.topics.length > 0 && (
                                                        <div className="flex flex-wrap gap-1 mt-2">
                                                            {repo.topics.slice(0, 3).map((topic: string) => (
                                                                <Badge
                                                                    key={topic}
                                                                    variant="secondary"
                                                                    className="text-[10px]"
                                                                >
                                                                    {topic}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    )}
                                                </CardHeader>
                                                <CardContent className="p-4 pt-0">
                                                    <div className="flex justify-between text-xs text-muted-foreground">
                                                        {repo.language && (
                                                            <Badge variant="outline">{repo.language}</Badge>
                                                        )}
                                                        <div className="flex items-center gap-3">
                                                            <span className="flex items-center gap-1">
                                                                <Star className="h-3 w-3" /> {repo.stargazers_count}
                                                            </span>
                                                            <span className="flex items-center gap-1">
                                                                <GitFork className="h-3 w-3" /> {repo.forks_count}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="text-xs text-muted-foreground mt-2">
                                                        Updated {formatDistanceToNow(new Date(repo.pushed_at), { addSuffix: true })}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )
                    )}
                </div>
            </CardContent>
        </Card>
    );
} 