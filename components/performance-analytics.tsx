"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AreaChart } from "@tremor/react"

// Mock data - would be fetched from the blockchain in a real implementation
const weeklyData = [
  { date: "Mon", profit: 120, stake: 300 },
  { date: "Tue", profit: -50, stake: 200 },
  { date: "Wed", profit: 80, stake: 250 },
  { date: "Thu", profit: 200, stake: 400 },
  { date: "Fri", profit: -30, stake: 150 },
  { date: "Sat", profit: 100, stake: 300 },
  { date: "Sun", profit: 150, stake: 350 },
]

const monthlyData = [
  { date: "Week 1", profit: 450, stake: 1200 },
  { date: "Week 2", profit: -120, stake: 800 },
  { date: "Week 3", profit: 300, stake: 1000 },
  { date: "Week 4", profit: 520, stake: 1500 },
]

export default function PerformanceAnalytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly" className="space-y-4">
          <TabsList>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="weekly" className="space-y-4">
            <AreaChart
              className="h-72"
              data={weeklyData}
              index="date"
              categories={["profit", "stake"]}
              colors={["emerald", "teal"]}
              valueFormatter={(number) => `${number} BEX`}
              showLegend
              showGridLines
              yAxisWidth={60}
              customTooltip={({ payload }) => {
                if (!payload[0]) return null
                return (
                  <div className="p-2 border rounded-lg shadow-lg bg-background">
                    <div className="text-sm font-semibold">{payload[0].payload.date}</div>
                    <div className="flex items-center mt-2 space-x-2">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                      <span className="text-sm">Profit: {payload[0].value} BEX</span>
                    </div>
                    <div className="flex items-center mt-1 space-x-2">
                      <div className="w-3 h-3 bg-teal-500 rounded-full" />
                      <span className="text-sm">Stake: {payload[1].value} BEX</span>
                    </div>
                  </div>
                )
              }}
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Weekly Profit</p>
                <p className="text-2xl font-bold text-emerald-500">+570 BEX</p>
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Win Rate</p>
                <p className="text-2xl font-bold">71.4%</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="monthly" className="space-y-4">
            <AreaChart
              className="h-72"
              data={monthlyData}
              index="date"
              categories={["profit", "stake"]}
              colors={["emerald", "teal"]}
              valueFormatter={(number) => `${number} BEX`}
              showLegend
              showGridLines
              yAxisWidth={60}
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Monthly Profit</p>
                <p className="text-2xl font-bold text-emerald-500">+1,150 BEX</p>
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Win Rate</p>
                <p className="text-2xl font-bold">75%</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
