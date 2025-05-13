"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Coins } from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Mock data - would be fetched from the blockchain in a real implementation
const mockClaimableRewards = [
  {
    id: "3",
    poolId: "0x2468...1357",
    type: "VOLUME",
    prediction: "buy",
    staked: "300 BEX",
    reward: "450 BEX",
    questEndTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: "5",
    poolId: "0xfedc...ba98",
    type: "VOLUME",
    prediction: "sell",
    staked: "500 BEX",
    reward: "720 BEX",
    questEndTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
]

export default function ClaimableRewards() {
  const [claimingIds, setClaimingIds] = useState<string[]>([])

  const handleClaim = async (id: string) => {
    setClaimingIds((prev) => [...prev, id])

    try {
      // In a real implementation, this would call the smart contract
      console.log("Claiming reward for quest", id)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success message
      toast({
        title: "Reward claimed successfully!",
        description: "Your BEX tokens have been transferred to your wallet.",
        variant: "success",
      })
    } catch (error) {
      console.error("Error claiming reward:", error)
      toast({
        title: "Failed to claim reward",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setClaimingIds((prev) => prev.filter((claimId) => claimId !== id))
    }
  }

  const handleClaimAll = async () => {
    const ids = mockClaimableRewards.map((reward) => reward.id)
    setClaimingIds(ids)

    try {
      // In a real implementation, this would call the smart contract
      console.log("Claiming all rewards")

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Show success message
      toast({
        title: "All rewards claimed successfully!",
        description: "Your BEX tokens have been transferred to your wallet.",
        variant: "success",
      })
    } catch (error) {
      console.error("Error claiming rewards:", error)
      toast({
        title: "Failed to claim rewards",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setClaimingIds([])
    }
  }

  if (mockClaimableRewards.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Claimable Rewards</h2>
        <Button onClick={handleClaimAll} disabled={claimingIds.length > 0}>
          {claimingIds.length === mockClaimableRewards.length ? "Claiming..." : "Claim All"}
        </Button>
      </div>

      <div className="space-y-4">
        {mockClaimableRewards.map((reward) => (
          <Card key={reward.id}>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-amber-500" />
                    <h3 className="text-lg font-semibold">Reward Available</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Pool: {reward.poolId}</p>
                </div>

                <div className="grid grid-cols-3 gap-4 md:flex md:items-center md:gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Staked</p>
                    <p className="font-medium">{reward.staked}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Reward</p>
                    <p className="font-medium text-amber-500">{reward.reward}</p>
                  </div>
                  <Button
                    onClick={() => handleClaim(reward.id)}
                    disabled={claimingIds.includes(reward.id)}
                    className="gap-2"
                  >
                    {claimingIds.includes(reward.id) ? (
                      "Claiming..."
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" /> Claim
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
