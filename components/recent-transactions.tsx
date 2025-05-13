"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowDownUp, ExternalLink } from "lucide-react"
import { format } from "date-fns"

// Mock data - would be fetched from the blockchain in a real implementation
const mockTransactions = [
  {
    hash: "0x1234...5678",
    type: "swap",
    from: "ETH",
    to: "BEX",
    fromAmount: "0.5",
    toAmount: "2,500",
    account: "0x71C7...976F",
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
  },
  {
    hash: "0xabcd...ef01",
    type: "swap",
    from: "BEX",
    to: "USDC",
    fromAmount: "1,000",
    toAmount: "500",
    account: "0x3A9C...B421",
    timestamp: new Date(Date.now() - 12 * 60 * 1000), // 12 minutes ago
  },
  {
    hash: "0x2468...1357",
    type: "swap",
    from: "USDC",
    to: "BEX",
    fromAmount: "750",
    toAmount: "1,500",
    account: "0xF892...45D1",
    timestamp: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
  },
  {
    hash: "0x9876...5432",
    type: "swap",
    from: "ETH",
    to: "BEX",
    fromAmount: "0.2",
    toAmount: "1,000",
    account: "0x2B7E...C912",
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
  },
  {
    hash: "0xfedc...ba98",
    type: "swap",
    from: "BEX",
    to: "ETH",
    fromAmount: "5,000",
    toAmount: "1",
    account: "0xA1F5...E723",
    timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
  },
]

export default function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="hidden md:table-cell">Account</TableHead>
                <TableHead className="hidden md:table-cell">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTransactions.map((tx) => (
                <TableRow key={tx.hash}>
                  <TableCell>
                    <a
                      href={`https://etherscan.io/tx/${tx.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      {tx.hash}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <ArrowDownUp className="w-4 h-4 text-purple-500" />
                      <span>Swap</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {tx.fromAmount} {tx.from} → {tx.toAmount} {tx.to}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-muted-foreground">{tx.account}</span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline">{format(tx.timestamp, "h:mm a")}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
