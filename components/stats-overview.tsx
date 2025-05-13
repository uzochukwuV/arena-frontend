"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AreaChart, BarChart } from "@tremor/react"

// Mock data - would be fetched from the blockchain in a real implementation
const volumeData = [
  { date: "Jan 1", buys: 34500, sells: 28900 },
  { date: "Jan 2", buys: 42300, sells: 38700 },
  { date: "Jan 3", buys: 29800, sells: 32400 },
  { date: "Jan 4", buys: 36700, sells: 31200 },
  { date: "Jan 5", buys: 45200, sells: 39800 },
  { date: "Jan 6", buys: 41300, sells: 43500 },
  { date: "Jan 7", buys: 37800, sells: 34600 },
]

const frequencyData = [
  { date: "Jan 1", buys: 245, sells: 198 },
  { date: "Jan 2", buys: 312, sells: 287 },
  { date: "Jan 3", buys: 198, sells: 231 },
  { date: "Jan 4", buys: 267, sells: 242 },
  { date: "Jan 5", buys: 329, sells: 301 },
  { date: "Jan 6", buys: 287, sells: 312 },
  { date: "Jan 7", buys: 276, sells: 254 },
]

const statsData = [
  { title: "Total Quests", value: "1,248" },
  { title: "Active Quests", value: "32" },
  { title: "Total Staked", value: "1.2M BEX" },
  { title: "Total Rewards", value: "450K BEX" },
]

export default function StatsOverview() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Market Overview</h2>

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

      <Tabs defaultValue="volume" className="space-y-4">
        <TabsList>
          <TabsTrigger value="volume">Volume</TabsTrigger>
          <TabsTrigger value="frequency">Frequency</TabsTrigger>
        </TabsList>
        <TabsContent value="volume" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trading Volume (USDC)</CardTitle>
              <CardDescription>7-day trading volume comparison between buys and sells</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <AreaChart
                className="h-72"
                data={volumeData}
                index="date"
                categories={["buys", "sells"]}
                colors={["emerald", "teal"]}
                valueFormatter={(number) => `${(number / 1000).toFixed(1)}K`}
                showLegend
                showGridLines
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="frequency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trading Frequency</CardTitle>
              <CardDescription>7-day trading frequency comparison between buys and sells</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <BarChart
                className="h-72"
                data={frequencyData}
                index="date"
                categories={["buys", "sells"]}
                colors={["emerald", "teal"]}
                valueFormatter={(number) => number.toString()}
                showLegend
                showGridLines
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
