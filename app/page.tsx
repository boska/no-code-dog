import { GithubCard } from "@/components/github-page";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  return (
    <main className="container px-4 md:px-6 min-h-screen pt-16">
      <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
        <GithubCard />
      </Suspense>
    </main>
  );
}
