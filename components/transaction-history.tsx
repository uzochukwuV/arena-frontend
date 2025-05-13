"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowDownUp, ArrowUpRight, Coins, TrendingUp, Zap } from "lucide-react"
import { format } from "date-fns"

// Mock data - would be fetched from the blockchain in a real implementation
const mockTransactions = [
  {
    id: "tx1",
    type: "stake",
    questType: "VOLUME",
    amount: "500 BEX",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    status: "confirmed",
    txHash: "0x1234...5678",
  },
  {
    id: "tx2",
    type: "claim",
    amount: "720 BEX",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    status: "confirmed",
    txHash: "0xabcd...ef01",
  },
  {
    id: "tx3",
    type: "stake",
    questType: "FREQUENCY",
    amount: "300 BEX",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    status: "confirmed",
    txHash: "0x2468...1357",
  },
  {
    id: "tx4",
    type: "swap",
    fromToken: "ETH",
    toToken: "BEX",
    amount: "0.5 ETH → 2,500 BEX",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    status: "confirmed",
    txHash: "0x9876...5432",
  },
  {
    id: "tx5",
    type: "liquidity",
    action: "add",
    pair: "BEX-ETH",
    amount: "1,000 BEX + 0.2 ETH",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    status: "confirmed",
    txHash: "0xfedc...ba98",
  },
]

export default function TransactionHistory() {
  const [filter, setFilter] = useState("all")

  const filteredTransactions = filter === "all" ? mockTransactions : mockTransactions.filter((tx) => tx.type === filter)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={filter} onValueChange={setFilter}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="stake">Stakes</TabsTrigger>
            <TabsTrigger value="claim">Claims</TabsTrigger>
            <TabsTrigger value="swap">Swaps</TabsTrigger>
            <TabsTrigger value="liquidity">Liquidity</TabsTrigger>
          </TabsList>
          <TabsContent value={filter} className="mt-6">
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="hidden md:table-cell">Transaction</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {tx.type === "stake" && (
                            <>
                              {tx.questType === "VOLUME" ? (
                                <TrendingUp className="w-4 h-4 text-emerald-500" />
                              ) : (
                                <Zap className="w-4 h-4 text-teal-500" />
                              )}
                              <span>Stake</span>
                            </>
                          )}
                          {tx.type === "claim" && (
                            <>
                              <Coins className="w-4 h-4 text-amber-500" />
                              <span>Claim</span>
                            </>
                          )}
                          {tx.type === "swap" && (
                            <>
                              <ArrowDownUp className="w-4 h-4 text-purple-500" />
                              <span>Swap</span>
                            </>
                          )}
                          {tx.type === "liquidity" && (
                            <>
                              <ArrowUpRight className="w-4 h-4 text-blue-500" />
                              <span>Liquidity</span>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{tx.amount}</div>
                        {tx.type === "stake" && (
                          <div className="text-xs text-muted-foreground">
                            {tx.questType === "VOLUME" ? "Volume Quest" : "Frequency Quest"}
                          </div>
                        )}
                        {tx.type === "swap" && (
                          <div className="text-xs text-muted-foreground">
                            {tx.fromToken} → {tx.toToken}
                          </div>
                        )}
                        {tx.type === "liquidity" && (
                          <div className="text-xs text-muted-foreground">
                            {tx.action === "add" ? "Add to" : "Remove from"} {tx.pair}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {format(tx.timestamp, "MMM d, yyyy h:mm a")}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <a
                          href={`https://etherscan.io/tx/${tx.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {tx.txHash}
                        </a>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {tx.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
