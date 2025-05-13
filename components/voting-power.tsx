"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useWallet } from "@/components/wallet-provider"

export default function VotingPower() {
  const { isConnected, address } = useWallet()

  // Mock data - would be fetched from the blockchain in a real implementation
  const votingPower = {
    bexBalance: 12450,
    totalVotingPower: 12450,
    delegatedToYou: 0,
    youDelegatedTo: 0,
    percentOfTotal: 0.25, // 0.25% of total voting power
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Voting Power</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {isConnected ? (
          <>
            <div className="space-y-4">
              <div className="p-4 border rounded-md">
                <p className="text-sm text-muted-foreground">Total Voting Power</p>
                <p className="text-2xl font-bold">{votingPower.totalVotingPower.toLocaleString()} BEX</p>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Your Share</span>
                    <span>{votingPower.percentOfTotal.toFixed(2)}%</span>
                  </div>
                  <Progress value={votingPower.percentOfTotal} className="h-1" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-md">
                  <p className="text-sm text-muted-foreground">BEX Balance</p>
                  <p className="text-xl font-bold">{votingPower.bexBalance.toLocaleString()}</p>
                </div>
                <div className="p-4 border rounded-md">
                  <p className="text-sm text-muted-foreground">Delegated To You</p>
                  <p className="text-xl font-bold">{votingPower.delegatedToYou.toLocaleString()}</p>
                </div>
              </div>

              {votingPower.youDelegatedTo > 0 ? (
                <div className="p-4 border rounded-md">
                  <p className="text-sm text-muted-foreground">You Delegated To</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold">{votingPower.youDelegatedTo.toLocaleString()} BEX</p>
                    <Button variant="outline" size="sm">
                      Change
                    </Button>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Delegated to: 0x3A9C...B421</p>
                </div>
              ) : (
                <div className="p-4 border rounded-md">
                  <p className="text-sm text-muted-foreground">Delegate Your Votes</p>
                  <p className="mt-1 text-xs">
                    You can delegate your voting power to another address or keep it for yourself.
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" className="flex-1">
                      Delegate
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Learn More
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Recent Votes</h4>
              <div className="p-4 text-center border rounded-md">
                <p className="text-sm text-muted-foreground">You haven't voted on any proposals yet.</p>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center border rounded-md">
            <p className="mb-4 text-muted-foreground">Connect your wallet to see your voting power</p>
            <Button>Connect Wallet</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
