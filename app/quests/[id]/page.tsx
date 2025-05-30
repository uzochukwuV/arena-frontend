import type { Metadata } from "next"
import QuestDetails from "@/components/quest-details"
import JoinQuestForm from "@/components/join-quest-form"
import QuestStats from "@/components/quest-stats"

import dynamic from 'next/dynamic';

const MyQuestDetail = dynamic(() => import("@/components/quest-details"));


export const metadata: Metadata = {
  title: "Quest Details | SwapArena",
  description: "View details and join a specific quest on SwapArena",
}

export default async function QuestDetailsPage({ params }: { params: { id: string } }) {
  const p = await params
  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-8">
          <MyQuestDetail id={p.id} />
          <QuestStats id={p.id} />
        </div>
        <div className="sticky top-24">
          <JoinQuestForm id={p.id} />
        </div>
      </div>
    </div>
  )
}
