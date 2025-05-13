"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { format } from "date-fns"
import { useWallet } from "@/components/wallet-provider"

// Mock data - would be fetched from an API in a real implementation
const mockReferrals = [
  {
    address: "0x3A9C...B421",
    status: "active",
    joinedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    earned: "250 BEX",
    activity: "High",
  },
  {
    address: "0xF892...45D1",
    status: "active",
    joinedDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
    earned: "180 BEX",
    activity: "Medium",
  },
  {
    address: "0x2B7E...C912",
    status: "active",
    joinedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    earned: "120 BEX",
    activity: "High",
  },
  {
    address: "0xA1F5...E723",
    status: "pending",
    joinedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    earned: "0 BEX",
    activity: "None",
  },
  {
    address: "0x7D23...9F45",
    status: "expired",
    joinedDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000), // 120 days ago
    earned: "50 BEX",
    activity: "Low",
  },
]

export default function ReferralHistory() {
  const { isConnected } = useWallet()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-500">Active</Badge>
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "expired":
        return <Badge variant="secondary">Expired</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getActivityBadge = (activity: string) => {
    switch (activity) {
      case "High":
        return <Badge className="bg-emerald-500">High</Badge>
      case "Medium":
        return <Badge className="bg-blue-500">Medium</Badge>
      case "Low":
        return <Badge variant="outline">Low</Badge>
      case "None":
        return <Badge variant="secondary">None</Badge>
      default:
        return <Badge variant="outline">{activity}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Referral History</CardTitle>
      </CardHeader>
      <CardContent>
        {isConnected ? (
          mockReferrals.length > 0 ? (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Earned</TableHead>
                    <TableHead className="hidden md:table-cell">Activity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockReferrals.map((referral, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs">{referral.address.substring(2, 4)}</AvatarFallback>
                          </Avatar>
                          <span>{referral.address}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(referral.status)}</TableCell>
                      <TableCell>{format(referral.joinedDate, "MMM d, yyyy")}</TableCell>
                      <TableCell>
                        <span className={referral.earned !== "0 BEX" ? "text-emerald-500 font-medium" : ""}>
                          {referral.earned}
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{getActivityBadge(referral.activity)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/40">
              <p className="text-muted-foreground">You don't have any referrals yet</p>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/40">
            <p className="mb-4 text-muted-foreground">Connect your wallet to see your referral history</p>
            <Button>Connect Wallet</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Import Button component to fix the error
import { Button } from "@/components/ui/button"
