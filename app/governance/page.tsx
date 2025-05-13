import type { Metadata } from "next"
import GovernanceProposals from "@/components/governance-proposals"
import VotingPower from "@/components/voting-power"
import CreateProposalButton from "@/components/create-proposal-button"

export const metadata: Metadata = {
  title: "Governance | SwapArena",
  description: "Participate in SwapArena governance by voting on proposals",
}

export default function GovernancePage() {
  return (
    <div className="container px-4 py-12 mx-auto space-y-12">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-4xl font-bold tracking-tight">Governance</h1>
        <CreateProposalButton />
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <GovernanceProposals />
        </div>
        <div>
          <VotingPower />
        </div>
      </div>
    </div>
  )
}
