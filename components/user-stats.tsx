"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {DonutChart} from "@tremor/react"


// Mock data - would be fetched from the blockchain in a real implementation
const statsData = [
  { title: "Total Quests", value: "12" },
  { title: "Win Rate", value: "67%" },
  { title: "Total Staked", value: "4,500 BEX" },
  { title: "Total Rewards", value: "6,240 BEX" },
]

const questTypeData = [
  { name: "Volume Quests", value: 8 },
  { name: "Frequency Quests", value: 4 },
]

const predictionData = [
  { name: "Buy Predictions", value: 7 },
  { name: "Sell Predictions", value: 5 },
]

const outcomeData = [
  { name: "Won", value: 8 },
  { name: "Lost", value: 4 },
]

export default function UserStats() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quest Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Tabs defaultValue="type" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="type">Type</TabsTrigger>
                <TabsTrigger value="prediction">Prediction</TabsTrigger>
                <TabsTrigger value="outcome">Outcome</TabsTrigger>
              </TabsList>
              <TabsContent value="type" className="pt-4">
                <DonutChart
                  data={questTypeData}
                  index="name"
                  valueFormatter={(number) => `${number} quests`}
                  category="value"
                  colors={["emerald", "teal"]}
                  className="h-60"
                />
              </TabsContent>
              <TabsContent value="prediction" className="pt-4">
                <DonutChart
                  data={predictionData}
                  index="name"
                  valueFormatter={(number) => `${number} quests`}
                  category="value"
                  colors={["emerald", "rose"]}
                  className="h-60"
                />
              </TabsContent>
              <TabsContent value="outcome" className="pt-4">
                <DonutChart
                  data={outcomeData}
                  index="name"
                  valueFormatter={(number) => `${number} quests`}
                  category="value"
                  colors={["emerald", "rose"]}
                  className="h-60"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm">Volume Quests Win Rate</div>
                <div className="font-medium">75%</div>
              </div>
              <Progress value={75} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm">Frequency Quests Win Rate</div>
                <div className="font-medium">50%</div>
              </div>
              <Progress value={50} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm">Buy Predictions Win Rate</div>
                <div className="font-medium">71%</div>
              </div>
              <Progress value={71} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm">Sell Predictions Win Rate</div>
                <div className="font-medium">60%</div>
              </div>
              <Progress value={60} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
