import type { Metadata } from "next"
import ReferralStats from "@/components/referral-stats"
import ReferralLink from "@/components/referral-link"
import ReferralHistory from "@/components/referral-history"

export const metadata: Metadata = {
  title: "Referrals | SwapArena",
  description: "Refer friends to SwapArena and earn rewards",
}

export default function ReferralsPage() {
  return (
    <div className="container px-4 py-12 mx-auto space-y-12">
      <h1 className="text-4xl font-bold tracking-tight">Referral Program</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <ReferralStats />
        <ReferralLink />
      </div>
      <ReferralHistory />
    </div>
  )
}
