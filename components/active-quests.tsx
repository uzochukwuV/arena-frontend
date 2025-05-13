"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, TrendingUp, Zap } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

// Mock data - would be fetched from the blockchain in a real implementation
const mockQuests = [
  {
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
  },
  {
    id: "2",
    poolId: "0xabcd...ef01",
    type: "FREQUENCY",
    totalStaked: "8,320 BEX",
    endTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
    stats: {
      buys: 178,
      sells: 203,
      buyVolume: "22,345 USDC",
      sellVolume: "25,678 USDC",
    },
  },
  {
    id: "3",
    poolId: "0x2468...1357",
    type: "VOLUME",
    totalStaked: "15,780 BEX",
    endTime: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
    stats: {
      buys: 312,
      sells: 287,
      buyVolume: "45,678 USDC",
      sellVolume: "42,123 USDC",
    },
  },
  {
    id: "4",
    poolId: "0x9876...5432",
    type: "FREQUENCY",
    totalStaked: "6,540 BEX",
    endTime: new Date(Date.now() + 16 * 60 * 60 * 1000), // 16 hours from now
    stats: {
      buys: 156,
      sells: 142,
      buyVolume: "18,765 USDC",
      sellVolume: "16,432 USDC",
    },
  },
]

export default function ActiveQuests() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredQuests =
    activeTab === "all" ? mockQuests : mockQuests.filter((quest) => quest.type === activeTab.toUpperCase())

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Active Quests</h2>
        <Button asChild variant="outline">
          <Link href="/quests">
            View All <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="all">All Quests</TabsTrigger>
          <TabsTrigger value="volume">Volume</TabsTrigger>
          <TabsTrigger value="frequency">Frequency</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="mt-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredQuests.map((quest) => (
              <Card key={quest.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {quest.type === "VOLUME" ? (
                        <TrendingUp className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <Zap className="w-5 h-5 text-teal-500" />
                      )}
                      <CardTitle>{quest.type === "VOLUME" ? "Volume" : "Frequency"} Quest</CardTitle>
                    </div>
                    <div className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      {formatDistanceToNow(quest.endTime, { addSuffix: true })}
                    </div>
                  </div>
                  <CardDescription className="pt-2">
                    Pool: {quest.poolId.substring(0, 6)}...{quest.poolId.substring(quest.poolId.length - 4)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Buys</p>
                      <p className="font-medium">{quest.stats.buys}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Sells</p>
                      <p className="font-medium">{quest.stats.sells}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Buy Volume</p>
                      <p className="font-medium">{quest.stats.buyVolume}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Sell Volume</p>
                      <p className="font-medium">{quest.stats.sellVolume}</p>
                    </div>
                  </div>
                  <div className="mt-4 text-sm">
                    <span className="text-muted-foreground">Total Staked:</span>{" "}
                    <span className="font-medium">{quest.totalStaked}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/quests/${quest.id}`}>Join Quest</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
