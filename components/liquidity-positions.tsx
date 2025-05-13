"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Plus } from "lucide-react"
import Link from "next/link"

// Mock data - would be fetched from the blockchain in a real implementation
const mockPositions = [
  {
    id: "1",
    pair: "BEX-ETH",
    token1Amount: "1,000 BEX",
    token2Amount: "0.2 ETH",
    value: "$1,200",
    apy: "24.5%",
    share: "0.8%",
  },
  {
    id: "2",
    pair: "BEX-USDC",
    token1Amount: "2,500 BEX",
    token2Amount: "1,250 USDC",
    value: "$2,500",
    apy: "18.2%",
    share: "1.2%",
  },
]

export default function LiquidityPositions() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Your Liquidity Positions</CardTitle>
        <Button asChild size="sm" className="gap-1">
          <Link href="#add">
            <Plus className="w-4 h-4" />
            Add Liquidity
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {mockPositions.length > 0 ? (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pair</TableHead>
                  <TableHead>Your Liquidity</TableHead>
                  <TableHead className="hidden md:table-cell">Value</TableHead>
                  <TableHead className="hidden md:table-cell">APY</TableHead>
                  <TableHead className="hidden md:table-cell">Pool Share</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPositions.map((position) => (
                  <TableRow key={position.id}>
                    <TableCell>
                      <div className="font-medium">{position.pair}</div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div>{position.token1Amount}</div>
                        <div>{position.token2Amount}</div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{position.value}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge className="bg-emerald-500">{position.apy}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{position.share}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="gap-1">
                        <ArrowUpRight className="w-3 h-3" />
                        Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/40">
            <p className="mb-4 text-muted-foreground">You don't have any active liquidity positions</p>
            <Button asChild>
              <Link href="#add">Add Liquidity</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
