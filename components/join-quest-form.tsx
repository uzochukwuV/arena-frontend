"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { TrendingDown, TrendingUp, Zap } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

// Mock data - would be fetched from the blockchain in a real implementation
const mockQuestDetails = {
  id: "1",
  poolId: "0x1234...5678",
  type: "VOLUME",
  totalStaked: "12,450 BEX",
  endTime: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours from now
  stats: {
    buys: 245,
    sells: 198,
    buyVolume: "34,567 USDC",
    sellVolume: "29,876 USDC",
  },
}

export default function JoinQuestForm({ id }: { id: string }) {
  const [prediction, setPrediction] = useState<string>("")
  const [amount, setAmount] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // In a real implementation, we would fetch the quest details based on the ID
  const questDetails = mockQuestDetails

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!prediction || !amount) return

    setIsSubmitting(true)

    try {
      // In a real implementation, this would call the smart contract
      console.log("Joining quest", {
        questId: id,
        prediction,
        amount,
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success message or redirect
      alert("Successfully joined the quest!")
    } catch (error) {
      console.error("Error joining quest:", error)
      alert("Failed to join quest. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Join This Quest</CardTitle>
        <CardDescription>Stake BEX tokens to predict the outcome of this quest</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Quest Type</Label>
            <div className="flex items-center p-3 rounded-md bg-muted">
              {questDetails.type === "VOLUME" ? (
                <>
                  <TrendingUp className="w-5 h-5 mr-2 text-emerald-500" />
                  <span>Volume Quest</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2 text-teal-500" />
                  <span>Frequency Quest</span>
                </>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Time Remaining</Label>
            <div className="p-3 rounded-md bg-muted">
              {formatDistanceToNow(questDetails.endTime, { addSuffix: true })}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prediction">Your Prediction</Label>
            <RadioGroup value={prediction} onValueChange={setPrediction} className="grid grid-cols-2 gap-4">
              <div className="relative">
                <RadioGroupItem value="buy" id="buy" className="sr-only peer" />
                <Label
                  htmlFor="buy"
                  className="flex flex-col items-center justify-between p-4 border-2 rounded-md cursor-pointer border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <TrendingUp className="w-10 h-10 mb-3 text-emerald-500" />
                  <span className="text-sm font-medium">Buys Win</span>
                </Label>
              </div>
              <div className="relative">
                <RadioGroupItem value="sell" id="sell" className="sr-only peer" />
                <Label
                  htmlFor="sell"
                  className="flex flex-col items-center justify-between p-4 border-2 rounded-md cursor-pointer border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <TrendingDown className="w-10 h-10 mb-3 text-rose-500" />
                  <span className="text-sm font-medium">Sells Win</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Stake Amount (BEX)</Label>
            <Input
              id="amount"
              type="text"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Minimum stake: 100 BEX</p>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={!prediction || !amount || isSubmitting} onClick={handleSubmit}>
          {isSubmitting ? "Processing..." : "Join Quest"}
        </Button>
      </CardFooter>
    </Card>
  )
}
