"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart } from "@tremor/react"
import { Button } from "@/components/ui/button"

// Mock data - would be fetched from an API in a real implementation
const hourlyData = Array.from({ length: 24 }, (_, i) => {
  const basePrice = 0.0002
  const randomFactor = 0.00002 * (Math.random() - 0.5)
  return {
    time: `${i}:00`,
    price: basePrice + randomFactor,
  }
})

const dailyData = Array.from({ length: 7 }, (_, i) => {
  const basePrice = 0.0002
  const randomFactor = 0.00004 * (Math.random() - 0.5)
  const date = new Date()
  date.setDate(date.getDate() - 6 + i)
  return {
    time: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    price: basePrice + randomFactor,
  }
})

const weeklyData = Array.from({ length: 12 }, (_, i) => {
  const basePrice = 0.0002
  const randomFactor = 0.00006 * (Math.random() - 0.5)
  const date = new Date()
  date.setDate(date.getDate() - 77 + i * 7)
  return {
    time: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    price: basePrice + randomFactor,
  }
})

const monthlyData = Array.from({ length: 12 }, (_, i) => {
  const basePrice = 0.0002
  const randomFactor = 0.00008 * (Math.random() - 0.5)
  const date = new Date()
  date.setMonth(date.getMonth() - 11 + i)
  return {
    time: date.toLocaleDateString("en-US", { month: "short" }),
    price: basePrice + randomFactor,
  }
})

export default function PriceChart() {
  const [timeframe, setTimeframe] = useState("24h")
  const [pair, setPair] = useState("BEX-ETH")

  const data = {
    "24h": hourlyData,
    "7d": dailyData,
    "3m": weeklyData,
    "1y": monthlyData,
  }[timeframe]

  const pairs = [
    { value: "BEX-ETH", label: "BEX/ETH" },
    { value: "BEX-USDC", label: "BEX/USDC" },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-4">
          <CardTitle>Price Chart</CardTitle>
          <div className="flex gap-1">
            {pairs.map((p) => (
              <Button
                key={p.value}
                variant={pair === p.value ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setPair(p.value)}
                className="h-8"
              >
                {p.label}
              </Button>
            ))}
          </div>
        </div>
        <Tabs value={timeframe} onValueChange={setTimeframe} className="w-auto">
          <TabsList className="grid grid-cols-4 h-8">
            <TabsTrigger value="24h" className="text-xs">
              24H
            </TabsTrigger>
            <TabsTrigger value="7d" className="text-xs">
              7D
            </TabsTrigger>
            <TabsTrigger value="3m" className="text-xs">
              3M
            </TabsTrigger>
            <TabsTrigger value="1y" className="text-xs">
              1Y
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Current Price</p>
            <p className="text-2xl font-bold">{pair === "BEX-ETH" ? "0.0002 ETH" : "0.50 USDC"}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">24h Change</p>
            <p className="text-emerald-500">+2.45%</p>
          </div>
        </div>
        <LineChart
          className="h-80"
          data={data}
          index="time"
          categories={["price"]}
          colors={["emerald"]}
          valueFormatter={(number) =>
            pair === "BEX-ETH" ? `${number.toFixed(6)} ETH` : `${(number * 2500).toFixed(2)} USDC`
          }
          showLegend={false}
          showGridLines
          yAxisWidth={60}
          showAnimation
        />
      </CardContent>
    </Card>
  )
}
