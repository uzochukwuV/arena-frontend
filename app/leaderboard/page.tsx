import type { Metadata } from "next"
import LeaderboardTabs from "@/components/leaderboard-tabs"
import LeaderboardFilters from "@/components/leaderboard-filters"

export const metadata: Metadata = {
  title: "Leaderboard | SwapArena",
  description: "View top performers and winners in SwapArena",
}

export default function LeaderboardPage() {
  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="flex flex-col items-start justify-between gap-4 mb-8 md:flex-row md:items-center">
        <h1 className="text-4xl font-bold tracking-tight">Leaderboard</h1>
        <LeaderboardFilters />
      </div>
      <LeaderboardTabs />
    </div>
  )
}
