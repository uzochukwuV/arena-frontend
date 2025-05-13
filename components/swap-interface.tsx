"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDown, Settings } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useWallet } from "@/components/wallet-provider"

export default function SwapInterface() {
  const { isConnected } = useWallet()
  const [fromToken, setFromToken] = useState("ETH")
  const [toToken, setToToken] = useState("BEX")
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [slippage, setSlippage] = useState<number[]>([0.5])
  const [deadline, setDeadline] = useState("30")
  const [isExpertMode, setIsExpertMode] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock exchange rates
  const exchangeRates = {
    "ETH-BEX": 5000,
    "BEX-ETH": 0.0002,
    "USDC-BEX": 2,
    "BEX-USDC": 0.5,
    "ETH-USDC": 2500,
    "USDC-ETH": 0.0004,
  }

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFromAmount(value)

    if (value && !isNaN(Number(value))) {
      const rate = exchangeRates[`${fromToken}-${toToken}`]
      setToAmount((Number(value) * rate).toString())
    } else {
      setToAmount("")
    }
  }

  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setToAmount(value)

    if (value && !isNaN(Number(value))) {
      const rate = exchangeRates[`${toToken}-${fromToken}`]
      setFromAmount((Number(value) * rate).toString())
    } else {
      setFromAmount("")
    }
  }

  const handleSwapTokens = () => {
    const tempToken = fromToken
    setFromToken(toToken)
    setToToken(tempToken)

    const tempAmount = fromAmount
    setFromAmount(toAmount)
    setToAmount(tempAmount)
  }

  const handleSwap = async () => {
    if (!isConnected || !fromAmount || !toAmount) return

    setIsSubmitting(true)

    try {
      // In a real implementation, this would call the smart contract
      console.log("Swapping tokens", {
        fromToken,
        toToken,
        fromAmount,
        toAmount,
        slippage: slippage[0],
        deadline,
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success message or redirect
      alert("Swap successful!")

      // Reset form
      setFromAmount("")
      setToAmount("")
    } catch (error) {
      console.error("Error swapping tokens:", error)
      alert("Failed to swap tokens. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Swap Tokens</CardTitle>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <h4 className="font-medium">Transaction Settings</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="slippage">Slippage Tolerance</Label>
                  <span className="text-sm">{slippage[0]}%</span>
                </div>
                <Slider id="slippage" min={0.1} max={5} step={0.1} value={slippage} onValueChange={setSlippage} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0.1%</span>
                  <span>5%</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Transaction Deadline</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="deadline"
                    type="number"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-20"
                  />
                  <span className="text-sm text-muted-foreground">minutes</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="expert-mode">Expert Mode</Label>
                  <Switch id="expert-mode" checked={isExpertMode} onCheckedChange={setIsExpertMode} />
                </div>
                <p className="text-xs text-muted-foreground">Allow high slippage trades and skip confirmation prompt</p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>From</Label>
          <div className="flex space-x-2">
            <Select value={fromToken} onValueChange={setFromToken}>
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ETH">ETH</SelectItem>
                <SelectItem value="BEX">BEX</SelectItem>
                <SelectItem value="USDC">USDC</SelectItem>
              </SelectContent>
            </Select>
            <Input type="text" placeholder="0.0" value={fromAmount} onChange={handleFromAmountChange} />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Balance: 1.245 ETH</span>
            <button className="text-primary hover:underline" onClick={() => setFromAmount("1.245")}>
              Max
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={handleSwapTokens}>
            <ArrowDown className="w-5 h-5" />
            <span className="sr-only">Swap tokens</span>
          </Button>
        </div>

        <div className="space-y-2">
          <Label>To</Label>
          <div className="flex space-x-2">
            <Select value={toToken} onValueChange={setToToken}>
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Select token" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ETH">ETH</SelectItem>
                <SelectItem value="BEX">BEX</SelectItem>
                <SelectItem value="USDC">USDC</SelectItem>
              </SelectContent>
            </Select>
            <Input type="text" placeholder="0.0" value={toAmount} onChange={handleToAmountChange} />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Balance: 12,450 BEX</span>
          </div>
        </div>

        {fromAmount && toAmount && (
          <div className="p-3 text-sm border rounded-md bg-muted/40">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rate</span>
              <span>
                1 {fromToken} = {exchangeRates[`${fromToken}-${toToken}`]} {toToken}
              </span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-muted-foreground">Minimum received</span>
              <span>
                {(Number(toAmount) * (1 - slippage[0] / 100)).toFixed(4)} {toToken}
              </span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-muted-foreground">Price Impact</span>
              <span className="text-emerald-500">{"< 0.01%"}</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {isConnected ? (
          <Button className="w-full" disabled={!fromAmount || !toAmount || isSubmitting} onClick={handleSwap}>
            {isSubmitting ? "Swapping..." : "Swap"}
          </Button>
        ) : (
          <Button className="w-full" disabled>
            Connect Wallet to Swap
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
