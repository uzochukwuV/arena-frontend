import type { Metadata } from "next"
import Hero from "@/components/hero"
import ActiveQuests from "@/components/active-quests"
import StatsOverview from "@/components/stats-overview"

export const metadata: Metadata = {
  title: "SwapArena | DeFi Gaming Platform",
  description: "Stake on trade frequency or volume and win rewards in this DeFi gaming platform",
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <div className="container px-4 py-12 mx-auto space-y-12">
        <StatsOverview />
        <ActiveQuests />
      </div>
    </div>
  )
}
