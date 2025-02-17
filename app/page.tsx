import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import PortfolioPage from "./portfolio/page"

export default function Home() {
  return (
    <main className="container min-h-screen pt-20">
      <Suspense fallback={<Skeleton className="h-[300px]" />}>
        <PortfolioPage />
      </Suspense>
    </main>
  )
}
