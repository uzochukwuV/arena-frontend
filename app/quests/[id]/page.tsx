import type { Metadata } from "next"
import QuestDetails from "@/components/quest-details"
import JoinQuestForm from "@/components/join-quest-form"
import QuestStats from "@/components/quest-stats"

export const metadata: Metadata = {
  title: "Quest Details | SwapArena",
  description: "View details and join a specific quest on SwapArena",
}

export default function QuestDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-8">
          <QuestDetails id={params.id} />
          <QuestStats id={params.id} />
        </div>
        <div className="sticky top-24">
          <JoinQuestForm id={params.id} />
        </div>
      </div>
    </div>
  )
}
