import { GithubCard } from "./github-page";

export function HeroYangu() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background mt-16">
            <div className="container px-4 md:px-6">
                <GithubCard />
            </div>
        </div>
    );
} 