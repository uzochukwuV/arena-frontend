import type { Metadata } from "next"
import LiquidityTabs from "@/components/liquidity-tabs"
import LiquidityPositions from "@/components/liquidity-positions"

export const metadata: Metadata = {
  title: "Liquidity | SwapArena",
  description: "Add and manage liquidity on SwapArena",
}

export default function LiquidityPage() {
  return (
    <div className="container px-4 py-12 mx-auto space-y-12">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">Liquidity</h1>
      <LiquidityPositions />
      <LiquidityTabs />
    </div>
  )
}
