import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Zap } from "lucide-react"

export default function Hero() {
  return (
    <div className="relative overflow-hidden border-b bg-gradient-to-b from-background to-background/80">
      <div className="absolute inset-0 bg-grid-white/10" />
      <div className="container relative px-4 py-20 mx-auto text-center sm:py-24 lg:py-32">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
            SwapArena
          </span>
          <span className="block mt-2">Predict. Stake. Win.</span>
        </h1>
        <p className="max-w-2xl mx-auto mt-6 text-lg text-muted-foreground sm:text-xl">
          Stake on trade frequency or volume and get rewarded if you win at the end of the day. Join the DeFi gaming
          revolution with SwapArena.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 mt-10 sm:flex-row">
          <Button asChild size="lg" className="gap-2">
            <Link href="/quests">
              Explore Quests <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/docs">Learn More</Link>
          </Button>
        </div>
        <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto mt-20 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center p-6 text-center rounded-lg bg-card">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900">
              <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
            </div>
            <h3 className="text-lg font-semibold">Volume Quests</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Predict whether buy or sell volume will be higher and stake to win.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 text-center rounded-lg bg-card">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-teal-100 dark:bg-teal-900">
              <Zap className="w-6 h-6 text-teal-600 dark:text-teal-300" />
            </div>
            <h3 className="text-lg font-semibold">Frequency Quests</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Predict whether buy or sell transactions will occur more frequently.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 text-center rounded-lg sm:col-span-2 lg:col-span-1 bg-card">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-cyan-100 dark:bg-cyan-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-cyan-600 dark:text-cyan-300"
              >
                <path d="M12 2v6.5l3-3" />
                <path d="M12 2v6.5l-3-3" />
                <path d="M17 17.5l2.5 2.5" />
                <path d="M15 20h7" />
                <path d="M2 13h12" />
                <path d="M11 6h8a2 2 0 0 1 2 2v7" />
                <path d="M11 13H7a2 2 0 0 1-2-2V6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Daily Rewards</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Quests settle daily with winners sharing the reward pool proportionally.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
