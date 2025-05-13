"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Zap, ArrowRight, CheckCircle, XCircle, Clock } from "lucide-react"

// Mock data - would be fetched from the blockchain in a real implementation
const mockActiveQuests = [
  {
    id: "1",
    poolId: "0x1234...5678",
    type: "VOLUME",
    prediction: "buy",
    staked: "500 BEX",
    endTime: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours from now
    status: "active",
  },
  {
    id: "2",
    poolId: "0xabcd...ef01",
    type: "FREQUENCY",
    prediction: "sell",
    staked: "750 BEX",
    endTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
    status: "active",
  },
]

const mockCompletedQuests = [
  {
    id: "3",
    poolId: "0x2468...1357",
    type: "VOLUME",
    prediction: "buy",
    staked: "300 BEX",
    endTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    status: "won",
    reward: "450 BEX",
  },
  {
    id: "4",
    poolId: "0x9876...5432",
    type: "FREQUENCY",
    prediction: "sell",
    staked: "200 BEX",
    endTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    status: "lost",
    reward: "0 BEX",
  },
  {
    id: "5",
    poolId: "0xfedc...ba98",
    type: "VOLUME",
    prediction: "sell",
    staked: "500 BEX",
    endTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    status: "won",
    reward: "720 BEX",
  },
]

export default function UserQuests() {
  const [activeTab, setActiveTab] = useState("active")

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Your Quests</h2>

      <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 md:w-auto">
          <TabsTrigger value="active">Active Quests</TabsTrigger>
          <TabsTrigger value="completed">Completed Quests</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-6">
          {mockActiveQuests.length > 0 ? (
            <div className="space-y-4">
              {mockActiveQuests.map((quest) => (
                <Card key={quest.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {quest.type === "VOLUME" ? (
                            <TrendingUp className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <Zap className="w-5 h-5 text-teal-500" />
                          )}
                          <h3 className="text-lg font-semibold">
                            {quest.type === "VOLUME" ? "Volume" : "Frequency"} Quest
                          </h3>
                          <Badge variant="outline" className="ml-2">
                            <Clock className="w-3 h-3 mr-1" />
                            Active
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Pool: {quest.poolId}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 md:flex md:items-center md:gap-6">
                        <div>
                          <p className="text-sm text-muted-foreground">Prediction</p>
                          <p className="font-medium capitalize">{quest.prediction}s Win</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Staked</p>
                          <p className="font-medium">{quest.staked}</p>
                        </div>
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/quests/${quest.id}`}>
                            View Details
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/40">
              <p className="mb-4 text-muted-foreground">You don't have any active quests</p>
              <Button asChild>
                <Link href="/quests">Browse Quests</Link>
              </Button>
            </div>
          )}
        </TabsContent>
        <TabsContent value="completed" className="mt-6">
          {mockCompletedQuests.length > 0 ? (
            <div className="space-y-4">
              {mockCompletedQuests.map((quest) => (
                <Card key={quest.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {quest.type === "VOLUME" ? (
                            <TrendingUp className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <Zap className="w-5 h-5 text-teal-500" />
                          )}
                          <h3 className="text-lg font-semibold">
                            {quest.type === "VOLUME" ? "Volume" : "Frequency"} Quest
                          </h3>
                          {quest.status === "won" ? (
                            <Badge className="ml-2 bg-emerald-500">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Won
                            </Badge>
                          ) : (
                            <Badge variant="destructive" className="ml-2">
                              <XCircle className="w-3 h-3 mr-1" />
                              Lost
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">Pool: {quest.poolId}</p>
                      </div>

                      <div className="grid grid-cols-3 gap-4 md:flex md:items-center md:gap-6">
                        <div>
                          <p className="text-sm text-muted-foreground">Prediction</p>
                          <p className="font-medium capitalize">{quest.prediction}s Win</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Staked</p>
                          <p className="font-medium">{quest.staked}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Reward</p>
                          <p className="font-medium">{quest.reward}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/40">
              <p className="mb-4 text-muted-foreground">You don't have any completed quests</p>
              <Button asChild>
                <Link href="/quests">Browse Quests</Link>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
