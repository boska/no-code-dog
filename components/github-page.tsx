import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Star, GitFork, Users, Globe, Calendar, MapPin, Building, Twitter, Building2, Code2, Coins, Video, Utensils, MessagesSquare } from "lucide-react";
import { getGithubProfile, GithubRepo } from "@/utils/github";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { MapView } from './map-view';
import { GithubCharts } from './github-charts';
import Image from 'next/image';

// Define tech stack categories with specific order
const techStackOrder = ['iOS', 'Frontend', 'Backend', 'Other'] as const;

const techStacks = {
    iOS: ['Swift', 'Objective-C'] as string[],
    Frontend: ['TypeScript', 'JavaScript', 'Vue', 'React', 'HTML', 'CSS'] as string[],
    Backend: ['Node', 'Python', 'Ruby', 'Go', 'Java'] as string[],
    Other: ['Shell', 'Dockerfile'] as string[]
} as const;

// Helper function to categorize repos
function categorizeRepo(repo: GithubRepo) {
    if (!repo.language) return 'Other';

    for (const [category, languages] of Object.entries(techStacks)) {
        if (languages.includes(repo.language)) {
            return category;
        }
    }
    return 'Other';
}

// Add this interface for experience data
interface Experience {
    company: string;
    role: string;
    period: string;
    location: string;
    skills: string[];
    highlights: string[];
}

// Update experience data to match resume
const experiences: Experience[] = [
    {
        company: "SAP Concur",
        role: "Senior iOS Developer",
        period: "2021-2024",
        location: "Prague, Czechia",
        skills: ["Swift", "SwiftUI", "Objective-C", "UIKit", "SAP Fiori"],
        highlights: [
            "Implemented SAP Fiori design system in the iOS app",
            "Implemented user interface for Joule, an AI-assisted expense recognition flow",
            "Led cross-functional initiatives across US/EU/Asia(Japan) for travel and expense reimbursement"
        ]
    },
    {
        company: "STRV",
        role: "Senior iOS Developer",
        period: "2019-2021",
        location: "Prague, Czechia",
        skills: ["Swift", "AVFoundation", "CoreML", "SwiftUI", "Firebase"],
        highlights: [
            "Delivered a mobile video editor with AVFoundation and CoreML",
            "Integrated payment systems (Apple Pay, Stripe) across multiple client applications",
            "Relocated to Prague, Czechia for the role"
        ]
    },
    {
        company: "Zion Blockchain Ltd.",
        role: "Founder / Developer",
        period: "2018-2019",
        location: "Taipei, Taiwan",
        skills: ["Ethereum", "Solidity", "HiveOS", "Node.js", "PostgreSQL"],
        highlights: [
            "Founded a experimental cryptocurrency mining project with efficient GPU configurations and remote management solutions",
            "More than 100 GPUs were deployed in a data center with 24/7 monitoring"
        ]
    },
    {
        company: "Viscovery",
        role: "Senior iOS Developer",
        period: "2016-2018",
        location: "Taipei, Taiwan",
        skills: ["Swift", "Objective-C", "UIKit", "CoreML", "AVFoundation", "PostgreSQL"],
        highlights: [
            "Created high-performance video ad SDK for mobile, ensuring seamless integration for content providers"
        ]
    },
    {
        company: "EZTABLE",
        role: "iOS Developer",
        period: "2014-2016",
        location: "Taipei, Taiwan",
        skills: ["Objective-C", "UIKit", "RoR", "MySQL"],
        highlights: [
            "Developed and maintained internal tools and services using Ruby on Rails, improving operational efficiency"
        ]
    },
    {
        company: "Mobile01",
        role: "Junior iOS Developer",
        period: "2012-2013",
        location: "Taipei, Taiwan",
        skills: ["Objective-C", "UIKit", "CoreData"],
        highlights: [
            "Build an iOS app for biggest 3C forum in Taiwan, which has 100K+ users",
            "First iOS job"
        ]
    }
];

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
                                {user.login}
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

                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                        <Building className="h-6 w-6" />
                        Professional Experience
                    </h2>
                    <div className="space-y-8">
                        {experiences.map((exp) => (
                            <Card key={exp.company} className="bg-muted/50">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-lg flex items-center gap-2">
                                                {exp.company === "SAP Concur" && <Building2 className="h-5 w-5" />}
                                                {exp.company === "STRV" && <Code2 className="h-5 w-5" />}
                                                {exp.company === "Zion Blockchain Ltd." && <Coins className="h-5 w-5" />}
                                                {exp.company === "Viscovery" && <Video className="h-5 w-5" />}
                                                {exp.company === "EZTABLE" && <Utensils className="h-5 w-5" />}
                                                {exp.company === "Mobile01" && <MessagesSquare className="h-5 w-5" />}
                                                {exp.role}
                                            </CardTitle>
                                            <CardDescription className="mt-1">
                                                {exp.company} • {exp.location}
                                            </CardDescription>
                                        </div>
                                        <Badge variant="secondary">{exp.period}</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {exp.skills.map((skill) => (
                                            <Badge key={skill} variant="outline" className="flex items-center gap-1">
                                                {skill === "Swift" && (
                                                    <Image
                                                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/swift/swift-original.svg"
                                                        alt="Swift"
                                                        width={16}
                                                        height={16}
                                                    />
                                                )}
                                                {skill === "React" && (
                                                    <Image
                                                        src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg"
                                                        alt="React"
                                                        width={16}
                                                        height={16}
                                                    />
                                                )}
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                        {exp.highlights.map((highlight, index) => (
                                            <li key={index}>{highlight}</li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <MapView />

                <div className="space-y-6">
                    {techStackOrder.map(category =>
                        categorizedRepos[category]?.length > 0 && (
                            <div key={category} className="space-y-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    {category === 'iOS' && (
                                        <Image
                                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/swift/swift-original.svg"
                                            alt="iOS"
                                            width={24}
                                            height={24}
                                        />
                                    )}
                                    {category === 'Frontend' && (
                                        <Image
                                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg"
                                            alt="Frontend"
                                            width={24}
                                            height={24}
                                        />
                                    )}
                                    {category === 'Backend' && (
                                        <Image
                                            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg"
                                            alt="Backend"
                                            width={24}
                                            height={24}
                                        />
                                    )}
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