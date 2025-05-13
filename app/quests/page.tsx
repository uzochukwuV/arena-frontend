import type { Metadata } from "next"
import QuestsList from "@/components/quests-list"
import QuestFilters from "@/components/quest-filters"

export const metadata: Metadata = {
  title: "Active Quests | SwapArena",
  description: "Browse and join active quests on SwapArena",
}

export default function QuestsPage() {
  return (
    <div className="container px-4 py-12 mx-auto">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">Active Quests</h1>
      <div className="grid gap-8 md:grid-cols-[280px_1fr]">
        <QuestFilters />
        <QuestsList />
      </div>
    </div>
  )
}
