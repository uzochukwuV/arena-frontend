"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart } from "@tremor/react"

// Mock data - would be fetched from the blockchain in a real implementation
const hourlyData = [
  { time: "00:00", buys: 12, sells: 8, buyVolume: 1450, sellVolume: 980 },
  { time: "01:00", buys: 8, sells: 10, buyVolume: 980, sellVolume: 1230 },
  { time: "02:00", buys: 15, sells: 12, buyVolume: 1780, sellVolume: 1450 },
  { time: "03:00", buys: 18, sells: 14, buyVolume: 2100, sellVolume: 1680 },
  { time: "04:00", buys: 14, sells: 16, buyVolume: 1680, sellVolume: 1920 },
  { time: "05:00", buys: 20, sells: 15, buyVolume: 2350, sellVolume: 1780 },
  { time: "06:00", buys: 25, sells: 18, buyVolume: 2950, sellVolume: 2100 },
  { time: "07:00", buys: 22, sells: 20, buyVolume: 2600, sellVolume: 2350 },
  { time: "08:00", buys: 28, sells: 22, buyVolume: 3300, sellVolume: 2600 },
  { time: "09:00", buys: 32, sells: 25, buyVolume: 3750, sellVolume: 2950 },
  { time: "10:00", buys: 35, sells: 28, buyVolume: 4100, sellVolume: 3300 },
  { time: "11:00", buys: 30, sells: 32, buyVolume: 3550, sellVolume: 3750 },
]

export default function QuestStats({ id }: { id: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quest Statistics</CardTitle>
        <CardDescription>Track the trading activity for this quest over time</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="volume" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="volume">Volume</TabsTrigger>
            <TabsTrigger value="frequency">Frequency</TabsTrigger>
          </TabsList>
          <TabsContent value="volume" className="space-y-4">
            <LineChart
              className="h-72"
              data={hourlyData}
              index="time"
              categories={["buyVolume", "sellVolume"]}
              colors={["emerald", "rose"]}
              valueFormatter={(number) => `${number} USDC`}
              showLegend
              showGridLines
              yAxisWidth={60}
              customTooltip={({ payload }) => {
                if (!payload[0]) return null
                return (
                  <div className="p-2 border rounded-lg shadow-lg bg-background">
                    <div className="text-sm font-semibold">{payload[0].payload.time}</div>
                    <div className="flex items-center mt-2 space-x-2">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                      <span className="text-sm">Buy: {payload[0].value} USDC</span>
                    </div>
                    <div className="flex items-center mt-1 space-x-2">
                      <div className="w-3 h-3 bg-rose-500 rounded-full" />
                      <span className="text-sm">Sell: {payload[1].value} USDC</span>
                    </div>
                  </div>
                )
              }}
            />
          </TabsContent>
          <TabsContent value="frequency" className="space-y-4">
            <LineChart
              className="h-72"
              data={hourlyData}
              index="time"
              categories={["buys", "sells"]}
              colors={["emerald", "rose"]}
              valueFormatter={(number) => number.toString()}
              showLegend
              showGridLines
              yAxisWidth={40}
              customTooltip={({ payload }) => {
                if (!payload[0]) return null
                return (
                  <div className="p-2 border rounded-lg shadow-lg bg-background">
                    <div className="text-sm font-semibold">{payload[0].payload.time}</div>
                    <div className="flex items-center mt-2 space-x-2">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                      <span className="text-sm">Buys: {payload[0].value}</span>
                    </div>
                    <div className="flex items-center mt-1 space-x-2">
                      <div className="w-3 h-3 bg-rose-500 rounded-full" />
                      <span className="text-sm">Sells: {payload[1].value}</span>
                    </div>
                  </div>
                )
              }}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
