import type { Metadata } from "next"
import UserQuests from "@/components/user-quests"
import UserStats from "@/components/user-stats"
import ClaimableRewards from "@/components/claimable-rewards"
import TransactionHistory from "@/components/transaction-history"
import PerformanceAnalytics from "@/components/performance-analytics"

export const metadata: Metadata = {
  title: "Portfolio | SwapArena",
  description: "View your active quests, past performance, and claimable rewards",
}

export default function PortfolioPage() {
  return (
    <div className="container px-4 py-12 mx-auto space-y-12">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">Your Portfolio</h1>
      <UserStats />
      <div className="grid gap-8 md:grid-cols-2">
        <PerformanceAnalytics />
        <ClaimableRewards />
      </div>
      <UserQuests />
      <TransactionHistory />
    </div>
  )
}
