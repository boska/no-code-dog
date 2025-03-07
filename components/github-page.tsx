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
import { SkillsSection } from "./skills-section"

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

// First, split experiences into two groups
const pragueExperiences = experiences.filter(exp => exp.location.includes('Prague'));
const taiwanExperiences = experiences.filter(exp => exp.location.includes('Taiwan'));

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

    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

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
                                Yang Lee
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
                            <Star className="h-4 w-4" />
                            <span>{totalStars} stars</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Github className="h-4 w-4" />
                            <span>{user.public_repos} repos</span>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-[70fr_30fr] gap-8">
                    <div className="space-y-8">
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold flex items-center gap-2">
                                Experience
                            </h3>
                            <div className="space-y-8">
                                {pragueExperiences.map((exp) => (
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
                            <div className="space-y-8">
                                {taiwanExperiences.map((exp) => (
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
                    </div>

                    <div className="space-y-6">
                        <SkillsSection />

                        <Card className="bg-muted/50">
                            <CardHeader>
                                <CardTitle className="text-sm">GitHub Activity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Public Repos</span>
                                        <span className="font-medium">{user.public_repos}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Total Stars</span>
                                        <span className="font-medium">{totalStars}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Followers</span>
                                        <span className="font-medium">{user.followers}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-6">
                            {techStackOrder.map(category =>
                                categorizedRepos[category]?.length > 0 && (
                                    <Card key={category} className="bg-muted/50">
                                        <CardHeader>
                                            <CardTitle className="text-sm flex items-center gap-2">
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
                                                {category} Projects
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                {categorizedRepos[category].slice(0, 3).map((repo) => (
                                                    <Link
                                                        key={repo.name}
                                                        href={repo.html_url}
                                                        target="_blank"
                                                        className="block group"
                                                    >
                                                        <div className="p-2 rounded-md hover:bg-muted transition-colors">
                                                            <div className="font-medium text-sm group-hover:text-primary">
                                                                {repo.name}
                                                            </div>
                                                            <div className="text-xs text-muted-foreground mt-1">
                                                                {repo.stargazers_count} ★
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 