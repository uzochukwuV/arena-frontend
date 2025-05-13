"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Wallet, Copy, Check, ExternalLink } from "lucide-react"
import { useWallet } from "@/components/wallet-provider"

export function ConnectWallet() {
  const { address, isConnected, connect, disconnect } = useWallet()
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
  }

  if (isConnected && address) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Wallet className="w-4 h-4" />
            {formatAddress(address)}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connected Wallet</DialogTitle>
            <DialogDescription>Your wallet is connected to SwapArena</DialogDescription>
          </DialogHeader>
          <div className="p-4 mt-4 space-y-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Address</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm">{formatAddress(address)}</span>
                <Button variant="ghost" size="icon" className="w-8 h-8" onClick={copyToClipboard}>
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  <span className="sr-only">Copy address</span>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Balance</span>
              <span className="font-medium">12,345 BEX</span>
            </div>
            <div className="flex justify-between pt-2">
              <Button variant="outline" size="sm" className="gap-1" asChild>
                <a href={`https://etherscan.io/address/${address}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3 h-3" />
                  View on Explorer
                </a>
              </Button>
              <Button variant="destructive" size="sm" onClick={disconnect}>
                Disconnect
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Button onClick={connect} className="gap-2">
      <Wallet className="w-4 h-4" />
      Connect Wallet
    </Button>
  )
}
