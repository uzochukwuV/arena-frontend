"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingDown, TrendingUp, Users, Zap } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { useEffect, useState } from "react"
import { POOL_ID, Quest } from "@/lib/constants"
import useHook from "@/hooks/uniswap/hook"

// Mock data - would be fetched from the blockchain in a real implementation
const mockQuestDetails = {
  id: "1",
  poolId: "0x1234...5678",
  type: "VOLUME",
  totalStaked: "12,450 BEX",
  endTime: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours from now
  participants: 78,
  stats: {
    buys: 245,
    sells: 198,
    buyVolume: "34,567 USDC",
    sellVolume: "29,876 USDC",
  },
}

export default function QuestDetails({ id }: { id: string }) {
   const [quest, setQuest] = useState<Quest & {participants: number}>()
  const {getCurrentQuestStats} = useHook()

  
    useEffect(()=>{
      console.log("is Fetching")
      getCurrentQuestStats()
      .then((data)=>{
        console.log(data)
        setQuest(
          {
            id:"1",
            poolId:POOL_ID,
            type:"FREQUENCY",
            totalStaked: data.totalStaked,
            endTime: data.endTime,
            participants:6,
            stats: {
              buys: data.totalBuys,
              sells: data.totalSells,
               buyVolume: data.totalVolumeOfBuys,
              sellVolume: data.totalVolumeOfSells,
            }
          })
        console.log("Done")
      })
      console.log(quest)
    },[quest])
  // In a real implementation, we would fetch the quest details based on the ID
  const questDetails = quest

  // Calculate progress percentages
  const totalVolume =
    Number.parseInt(questDetails?.stats.buyVolume.replace(/[^0-9]/g, "")!) +
    Number.parseInt(questDetails?.stats.sellVolume.replace(/[^0-9]/g, "")!)
  const buyVolumePercentage = Math.round(
    (Number.parseInt(questDetails?.stats.buyVolume.replace(/[^0-9]/g, "")!) / totalVolume) * 100,
  )
  const sellVolumePercentage = 100 - buyVolumePercentage

  const totalTrades = questDetails?.stats.buys! + questDetails?.stats.sells!
  const buyFrequencyPercentage = Math.round((questDetails?.stats.buys! / totalTrades) * 100)
  const sellFrequencyPercentage = 100 - buyFrequencyPercentage

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {questDetails?.type === "VOLUME" ? "Volume" : "Frequency"} Quest
        </h1>
        <p className="mt-2 text-muted-foreground">
          Pool: {questDetails?.poolId} • Ends 
          {/* {formatDistanceToNow(questDetails?.endTime!, { addSuffix: true })} */}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Participation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Participants</p>
                <p className="text-2xl font-bold">{questDetails?.participants}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Staked</p>
                <p className="text-2xl font-bold">{questDetails?.totalStaked}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Quest Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-4 rounded-md bg-muted">
              {questDetails?.type === "VOLUME" ? (
                <div className="flex items-center text-lg font-medium">
                  <TrendingUp className="w-6 h-6 mr-2 text-emerald-500" />
                  Volume Quest
                </div>
              ) : (
                <div className="flex items-center text-lg font-medium">
                  <Zap className="w-6 h-6 mr-2 text-teal-500" />
                  Frequency Quest
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Trading Volume</CardTitle>
            <CardDescription>Compare the current buy and sell volumes for this pool</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-emerald-500" />
                  <span>Buy Volume</span>
                </div>
                <span className="font-medium">{questDetails?.stats.buyVolume}</span>
              </div>
              <Progress value={buyVolumePercentage} className="h-2 bg-muted" color="bg-emerald-500" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingDown className="w-4 h-4 mr-2 text-rose-500" />
                  <span>Sell Volume</span>
                </div>
                <span className="font-medium">{questDetails?.stats.sellVolume}</span>
              </div>
              <Progress value={sellVolumePercentage} className="h-2 bg-muted" color="bg-rose-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Trading Frequency</CardTitle>
            <CardDescription>Compare the current buy and sell transaction counts for this pool</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-emerald-500" />
                  <span>Buy Transactions</span>
                </div>
                <span className="font-medium">{questDetails?.stats.buys}</span>
              </div>
              <Progress value={buyFrequencyPercentage} className="h-2 bg-muted" color="bg-emerald-500" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingDown className="w-4 h-4 mr-2 text-rose-500" />
                  <span>Sell Transactions</span>
                </div>
                <span className="font-medium">{questDetails?.stats.sells}</span>
              </div>
              <Progress value={sellFrequencyPercentage} className="h-2 bg-muted" color="bg-rose-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
