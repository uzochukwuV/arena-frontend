"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ThumbsUp, ThumbsDown, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { format } from "date-fns"

// Mock data - would be fetched from the blockchain in a real implementation
const mockProposals = [
  {
    id: "1",
    title: "Increase Quest Rewards",
    description:
      "Proposal to increase the rewards for all quests by 10% to incentivize more participation and growth of the platform.",
    status: "active",
    proposer: "0x71C7...976F",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    votesFor: 345000,
    votesAgainst: 123000,
    quorum: 500000,
  },
  {
    id: "2",
    title: "Add New Quest Type: Price Prediction",
    description:
      "Proposal to add a new quest type where users can predict the price movement of tokens within a specific timeframe.",
    status: "active",
    proposer: "0xA1F5...E723",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    votesFor: 567000,
    votesAgainst: 234000,
    quorum: 500000,
  },
  {
    id: "3",
    title: "Reduce Platform Fees",
    description: "Proposal to reduce the platform fees from 1% to 0.5% to attract more users and increase volume.",
    status: "passed",
    proposer: "0x3A9C...B421",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    endTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    votesFor: 789000,
    votesAgainst: 123000,
    quorum: 500000,
  },
  {
    id: "4",
    title: "Integrate with Arbitrum Network",
    description: "Proposal to expand SwapArena to the Arbitrum network to reduce gas fees and increase scalability.",
    status: "rejected",
    proposer: "0xF892...45D1",
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), // 21 days ago
    endTime: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    votesFor: 345000,
    votesAgainst: 456000,
    quorum: 500000,
  },
  {
    id: "5",
    title: "Add BEX Staking Rewards",
    description: "Proposal to introduce staking rewards for BEX token holders to incentivize long-term holding.",
    status: "pending",
    proposer: "0x2B7E...C912",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    endTime: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // 6 days from now
    votesFor: 0,
    votesAgainst: 0,
    quorum: 500000,
  },
]

export default function GovernanceProposals() {
  const [filter, setFilter] = useState("all")
  const [userVotes, setUserVotes] = useState<Record<string, "for" | "against" | null>>({})

  const filteredProposals =
    filter === "all" ? mockProposals : mockProposals.filter((proposal) => proposal.status === filter)

  const handleVote = (proposalId: string, vote: "for" | "against") => {
    setUserVotes((prev) => ({
      ...prev,
      [proposalId]: vote,
    }))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-blue-500">
            <Clock className="w-3 h-3 mr-1" />
            Active
          </Badge>
        )
      case "passed":
        return (
          <Badge className="bg-emerald-500">
            <CheckCircle className="w-3 h-3 mr-1" />
            Passed
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline">
            <AlertCircle className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Governance Proposals</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={filter} onValueChange={setFilter} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="passed">Passed</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value={filter} className="space-y-6">
            {filteredProposals.length > 0 ? (
              filteredProposals.map((proposal) => (
                <div key={proposal.id} className="p-6 border rounded-lg space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{proposal.title}</h3>
                        {getStatusBadge(proposal.status)}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Proposed by {proposal.proposer} on {format(proposal.createdAt, "MMM d, yyyy")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {proposal.status === "active"
                          ? `Ends ${format(proposal.endTime, "MMM d, yyyy")}`
                          : `Ended ${format(proposal.endTime, "MMM d, yyyy")}`}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm">{proposal.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="w-4 h-4 text-emerald-500" />
                        <span>For: {(proposal.votesFor / 1000).toFixed(0)}K BEX</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ThumbsDown className="w-4 h-4 text-rose-500" />
                        <span>Against: {(proposal.votesAgainst / 1000).toFixed(0)}K BEX</span>
                      </div>
                    </div>
                    <Progress
                      value={(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100}
                      className="h-2"
                      indicatorClassName="bg-emerald-500"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>
                        Quorum:{" "}
                        {proposal.votesFor + proposal.votesAgainst >= proposal.quorum
                          ? "Reached"
                          : `${(((proposal.votesFor + proposal.votesAgainst) / proposal.quorum) * 100).toFixed(0)}%`}
                      </span>
                      <span>Total Votes: {((proposal.votesFor + proposal.votesAgainst) / 1000).toFixed(0)}K BEX</span>
                    </div>
                  </div>

                  {proposal.status === "active" && (
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant={userVotes[proposal.id] === "for" ? "default" : "outline"}
                        className="flex-1 gap-2"
                        onClick={() => handleVote(proposal.id, "for")}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        Vote For
                      </Button>
                      <Button
                        variant={userVotes[proposal.id] === "against" ? "destructive" : "outline"}
                        className="flex-1 gap-2"
                        onClick={() => handleVote(proposal.id, "against")}
                      >
                        <ThumbsDown className="w-4 h-4" />
                        Vote Against
                      </Button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/40">
                <p className="text-muted-foreground">No proposals found</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
