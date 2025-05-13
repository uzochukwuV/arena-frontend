"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useWallet } from "@/components/wallet-provider"

export default function LiquidityTabs() {
  const { isConnected } = useWallet()
  const [activeTab, setActiveTab] = useState("add")
  const [token1, setToken1] = useState("BEX")
  const [token2, setToken2] = useState("ETH")
  const [amount1, setAmount1] = useState("")
  const [amount2, setAmount2] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock exchange rates
  const exchangeRates = {
    "ETH-BEX": 5000,
    "BEX-ETH": 0.0002,
    "USDC-BEX": 2,
    "BEX-USDC": 0.5,
  }

  const handleAmount1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAmount1(value)

    if (value && !isNaN(Number(value))) {
      if (token2 === "ETH" && token1 === "BEX") {
        setAmount2((Number(value) * exchangeRates["BEX-ETH"]).toString())
      } else if (token2 === "USDC" && token1 === "BEX") {
        setAmount2((Number(value) * exchangeRates["BEX-USDC"]).toString())
      } else if (token2 === "BEX" && token1 === "ETH") {
        setAmount2((Number(value) * exchangeRates["ETH-BEX"]).toString())
      } else if (token2 === "BEX" && token1 === "USDC") {
        setAmount2((Number(value) * exchangeRates["USDC-BEX"]).toString())
      }
    } else {
      setAmount2("")
    }
  }

  const handleAmount2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAmount2(value)

    if (value && !isNaN(Number(value))) {
      if (token1 === "ETH" && token2 === "BEX") {
        setAmount1((Number(value) * exchangeRates["BEX-ETH"]).toString())
      } else if (token1 === "USDC" && token2 === "BEX") {
        setAmount1((Number(value) * exchangeRates["BEX-USDC"]).toString())
      } else if (token1 === "BEX" && token2 === "ETH") {
        setAmount1((Number(value) * exchangeRates["ETH-BEX"]).toString())
      } else if (token1 === "BEX" && token2 === "USDC") {
        setAmount1((Number(value) * exchangeRates["USDC-BEX"]).toString())
      }
    } else {
      setAmount1("")
    }
  }

  const handleAddLiquidity = async () => {
    if (!isConnected || !amount1 || !amount2) return

    setIsSubmitting(true)

    try {
      // In a real implementation, this would call the smart contract
      console.log("Adding liquidity", {
        token1,
        token2,
        amount1,
        amount2,
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success message or redirect
      alert("Liquidity added successfully!")

      // Reset form
      setAmount1("")
      setAmount2("")
    } catch (error) {
      console.error("Error adding liquidity:", error)
      alert("Failed to add liquidity. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRemoveLiquidity = async () => {
    if (!isConnected || !amount1) return

    setIsSubmitting(true)

    try {
      // In a real implementation, this would call the smart contract
      console.log("Removing liquidity", {
        token1,
        token2,
        percentage: amount1,
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success message or redirect
      alert("Liquidity removed successfully!")

      // Reset form
      setAmount1("")
    } catch (error) {
      console.error("Error removing liquidity:", error)
      alert("Failed to remove liquidity. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Manage Liquidity</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="add" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="add">Add Liquidity</TabsTrigger>
            <TabsTrigger value="remove">Remove Liquidity</TabsTrigger>
          </TabsList>

          <TabsContent value="add" className="space-y-6 pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Token 1</Label>
                <div className="flex space-x-2">
                  <Select value={token1} onValueChange={setToken1}>
                    <SelectTrigger className="w-[110px]">
                      <SelectValue placeholder="Select token" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BEX">BEX</SelectItem>
                      <SelectItem value="ETH">ETH</SelectItem>
                      <SelectItem value="USDC">USDC</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input type="text" placeholder="0.0" value={amount1} onChange={handleAmount1Change} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    Balance: {token1 === "BEX" ? "12,450" : token1 === "ETH" ? "1.245" : "3,500"} {token1}
                  </span>
                  <button
                    className="text-primary hover:underline"
                    onClick={() => setAmount1(token1 === "BEX" ? "12450" : token1 === "ETH" ? "1.245" : "3500")}
                  >
                    Max
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Token 2</Label>
                <div className="flex space-x-2">
                  <Select value={token2} onValueChange={setToken2}>
                    <SelectTrigger className="w-[110px]">
                      <SelectValue placeholder="Select token" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BEX">BEX</SelectItem>
                      <SelectItem value="ETH">ETH</SelectItem>
                      <SelectItem value="USDC">USDC</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input type="text" placeholder="0.0" value={amount2} onChange={handleAmount2Change} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    Balance: {token2 === "BEX" ? "12,450" : token2 === "ETH" ? "1.245" : "3,500"} {token2}
                  </span>
                  <button
                    className="text-primary hover:underline"
                    onClick={() => setAmount2(token2 === "BEX" ? "12450" : token2 === "ETH" ? "1.245" : "3500")}
                  >
                    Max
                  </button>
                </div>
              </div>
            </div>

            {amount1 && amount2 && (
              <div className="p-3 text-sm border rounded-md bg-muted/40">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Exchange Rate</span>
                  <span>
                    1 {token1} ={" "}
                    {token1 === "BEX" && token2 === "ETH"
                      ? exchangeRates["BEX-ETH"]
                      : token1 === "BEX" && token2 === "USDC"
                        ? exchangeRates["BEX-USDC"]
                        : token1 === "ETH" && token2 === "BEX"
                          ? exchangeRates["ETH-BEX"]
                          : exchangeRates["USDC-BEX"]}{" "}
                    {token2}
                  </span>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-muted-foreground">Share of Pool</span>
                  <span>2.5%</span>
                </div>
              </div>
            )}

            <Button
              className="w-full"
              disabled={!isConnected || !amount1 || !amount2 || isSubmitting}
              onClick={handleAddLiquidity}
            >
              {isSubmitting ? "Adding Liquidity..." : "Add Liquidity"}
            </Button>
          </TabsContent>

          <TabsContent value="remove" className="space-y-6 pt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Pair</Label>
                <div className="flex space-x-2">
                  <Select
                    value={`${token1}-${token2}`}
                    onValueChange={(value) => {
                      const [t1, t2] = value.split("-")
                      setToken1(t1)
                      setToken2(t2)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select pair" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BEX-ETH">BEX-ETH</SelectItem>
                      <SelectItem value="BEX-USDC">BEX-USDC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Amount to Remove</Label>
                <div className="flex items-center space-x-2">
                  <Input type="text" placeholder="0.0" value={amount1} onChange={handleAmount1Change} />
                  <span className="text-sm">%</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    Your Liquidity:{" "}
                    {token1 === "BEX" && token2 === "ETH" ? "1,000 BEX + 0.2 ETH" : "2,500 BEX + 1,250 USDC"}
                  </span>
                  <button className="text-primary hover:underline" onClick={() => setAmount1("100")}>
                    Max
                  </button>
                </div>
              </div>
            </div>

            {amount1 && (
              <div className="p-3 text-sm border rounded-md bg-muted/40">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">You Will Receive</span>
                  <span>
                    {token1 === "BEX" && token2 === "ETH"
                      ? `${Number(amount1) * 10} BEX + ${Number(amount1) * 0.002} ETH`
                      : `${Number(amount1) * 25} BEX + ${Number(amount1) * 12.5} USDC`}
                  </span>
                </div>
              </div>
            )}

            <Button
              className="w-full"
              disabled={!isConnected || !amount1 || isSubmitting}
              onClick={handleRemoveLiquidity}
            >
              {isSubmitting ? "Removing Liquidity..." : "Remove Liquidity"}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
