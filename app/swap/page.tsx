import type { Metadata } from "next"
import SwapInterface from "@/components/swap-interface"
import PriceChart from "@/components/price-chart"
import RecentTransactions from "@/components/recent-transactions"

export const metadata: Metadata = {
  title: "Swap | SwapArena",
  description: "Swap tokens on SwapArena",
}

export default function SwapPage() {
  return (
    <div className="container px-4 py-12 mx-auto">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">Swap Tokens</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-8">
          <PriceChart />
          <RecentTransactions />
        </div>
        <div className="sticky top-24">
          <SwapInterface />
        </div>
      </div>
    </div>
  )
}
