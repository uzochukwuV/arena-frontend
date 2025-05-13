"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Trophy, Medal, Award, TrendingUp, Zap } from "lucide-react"

// Mock data - would be fetched from the blockchain in a real implementation
const topWinners = [
  {
    rank: 1,
    address: "0x71C7...976F",
    winRate: "92%",
    totalWins: 48,
    totalQuests: 52,
    totalRewards: "24,560 BEX",
  },
  {
    rank: 2,
    address: "0x3A9C...B421",
    winRate: "87%",
    totalWins: 41,
    totalQuests: 47,
    totalRewards: "19,870 BEX",
  },
  {
    rank: 3,
    address: "0xF892...45D1",
    winRate: "85%",
    totalWins: 39,
    totalQuests: 46,
    totalRewards: "18,340 BEX",
  },
  {
    rank: 4,
    address: "0x2B7E...C912",
    winRate: "82%",
    totalWins: 37,
    totalQuests: 45,
    totalRewards: "16,780 BEX",
  },
  {
    rank: 5,
    address: "0xA1F5...E723",
    winRate: "80%",
    totalWins: 36,
    totalQuests: 45,
    totalRewards: "15,920 BEX",
  },
  {
    rank: 6,
    address: "0x7D23...9F45",
    winRate: "78%",
    totalWins: 35,
    totalQuests: 45,
    totalRewards: "14,560 BEX",
  },
  {
    rank: 7,
    address: "0xB34A...1D67",
    winRate: "76%",
    totalWins: 34,
    totalQuests: 45,
    totalRewards: "13,890 BEX",
  },
  {
    rank: 8,
    address: "0x5E78...2A91",
    winRate: "75%",
    totalWins: 33,
    totalQuests: 44,
    totalRewards: "12,450 BEX",
  },
  {
    rank: 9,
    address: "0xC12D...8B34",
    winRate: "73%",
    totalWins: 32,
    totalQuests: 44,
    totalRewards: "11,780 BEX",
  },
  {
    rank: 10,
    address: "0x9F56...4E12",
    winRate: "71%",
    totalWins: 31,
    totalQuests: 44,
    totalRewards: "10,920 BEX",
  },
]

const topStakers = [
  {
    rank: 1,
    address: "0xA1F5...E723",
    totalStaked: "145,780 BEX",
    activeStake: "32,450 BEX",
    questsJoined: 67,
  },
  {
    rank: 2,
    address: "0x71C7...976F",
    totalStaked: "128,340 BEX",
    activeStake: "28,760 BEX",
    questsJoined: 58,
  },
  {
    rank: 3,
    address: "0x3A9C...B421",
    totalStaked: "112,670 BEX",
    activeStake: "24,890 BEX",
    questsJoined: 52,
  },
  {
    rank: 4,
    address: "0x7D23...9F45",
    totalStaked: "98,450 BEX",
    activeStake: "21,340 BEX",
    questsJoined: 47,
  },
  {
    rank: 5,
    address: "0xF892...45D1",
    totalStaked: "87,230 BEX",
    activeStake: "18,560 BEX",
    questsJoined: 43,
  },
  {
    rank: 6,
    address: "0x2B7E...C912",
    totalStaked: "76,890 BEX",
    activeStake: "15,670 BEX",
    questsJoined: 38,
  },
  {
    rank: 7,
    address: "0xB34A...1D67",
    totalStaked: "68,540 BEX",
    activeStake: "12,980 BEX",
    questsJoined: 35,
  },
  {
    rank: 8,
    address: "0x5E78...2A91",
    totalStaked: "59,780 BEX",
    activeStake: "10,450 BEX",
    questsJoined: 31,
  },
  {
    rank: 9,
    address: "0xC12D...8B34",
    totalStaked: "52,340 BEX",
    activeStake: "8,760 BEX",
    questsJoined: 28,
  },
  {
    rank: 10,
    address: "0x9F56...4E12",
    totalStaked: "45,670 BEX",
    activeStake: "7,890 BEX",
    questsJoined: 25,
  },
]

const recentWinners = [
  {
    address: "0x71C7...976F",
    questType: "VOLUME",
    prediction: "buy",
    reward: "1,250 BEX",
    timestamp: "2 hours ago",
  },
  {
    address: "0xA1F5...E723",
    questType: "FREQUENCY",
    prediction: "sell",
    reward: "980 BEX",
    timestamp: "4 hours ago",
  },
  {
    address: "0x3A9C...B421",
    questType: "VOLUME",
    prediction: "sell",
    reward: "1,450 BEX",
    timestamp: "6 hours ago",
  },
  {
    address: "0xF892...45D1",
    questType: "FREQUENCY",
    prediction: "buy",
    reward: "870 BEX",
    timestamp: "8 hours ago",
  },
  {
    address: "0x2B7E...C912",
    questType: "VOLUME",
    prediction: "buy",
    reward: "1,120 BEX",
    timestamp: "10 hours ago",
  },
  {
    address: "0x7D23...9F45",
    questType: "FREQUENCY",
    prediction: "sell",
    reward: "760 BEX",
    timestamp: "12 hours ago",
  },
  {
    address: "0xB34A...1D67",
    questType: "VOLUME",
    prediction: "sell",
    reward: "1,340 BEX",
    timestamp: "14 hours ago",
  },
  {
    address: "0x5E78...2A91",
    questType: "FREQUENCY",
    prediction: "buy",
    reward: "650 BEX",
    timestamp: "16 hours ago",
  },
  {
    address: "0xC12D...8B34",
    questType: "VOLUME",
    prediction: "buy",
    reward: "980 BEX",
    timestamp: "18 hours ago",
  },
  {
    address: "0x9F56...4E12",
    questType: "FREQUENCY",
    prediction: "sell",
    reward: "540 BEX",
    timestamp: "20 hours ago",
  },
]

export default function LeaderboardTabs() {
  return (
    <Tabs defaultValue="winners" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="winners">Top Winners</TabsTrigger>
        <TabsTrigger value="stakers">Top Stakers</TabsTrigger>
        <TabsTrigger value="recent">Recent Winners</TabsTrigger>
      </TabsList>

      <TabsContent value="winners">
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {topWinners.slice(0, 3).map((winner) => (
                <div key={winner.rank} className="flex flex-col items-center p-6 text-center border rounded-lg">
                  <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10">
                    {winner.rank === 1 ? (
                      <Trophy className="w-8 h-8 text-amber-500" />
                    ) : winner.rank === 2 ? (
                      <Medal className="w-8 h-8 text-zinc-400" />
                    ) : (
                      <Award className="w-8 h-8 text-amber-700" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold">Rank #{winner.rank}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{winner.address}</p>
                  <div className="grid w-full grid-cols-2 gap-2 mt-4">
                    <div className="p-2 text-center border rounded-md">
                      <p className="text-xs text-muted-foreground">Win Rate</p>
                      <p className="font-medium">{winner.winRate}</p>
                    </div>
                    <div className="p-2 text-center border rounded-md">
                      <p className="text-xs text-muted-foreground">Rewards</p>
                      <p className="font-medium">{winner.totalRewards.split(" ")[0]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead className="hidden md:table-cell">Win Rate</TableHead>
                    <TableHead className="hidden md:table-cell">Wins/Total</TableHead>
                    <TableHead>Rewards</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topWinners.map((winner) => (
                    <TableRow key={winner.rank}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {winner.rank === 1 ? (
                            <Trophy className="w-4 h-4 text-amber-500" />
                          ) : winner.rank === 2 ? (
                            <Medal className="w-4 h-4 text-zinc-400" />
                          ) : winner.rank === 3 ? (
                            <Award className="w-4 h-4 text-amber-700" />
                          ) : (
                            <span className="w-4 h-4 text-center">{winner.rank}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs">{winner.address.substring(2, 4)}</AvatarFallback>
                          </Avatar>
                          <span>{winner.address}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{winner.winRate}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {winner.totalWins}/{winner.totalQuests}
                      </TableCell>
                      <TableCell>{winner.totalRewards}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="stakers">
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {topStakers.slice(0, 3).map((staker) => (
                <div key={staker.rank} className="flex flex-col items-center p-6 text-center border rounded-lg">
                  <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10">
                    {staker.rank === 1 ? (
                      <Trophy className="w-8 h-8 text-amber-500" />
                    ) : staker.rank === 2 ? (
                      <Medal className="w-8 h-8 text-zinc-400" />
                    ) : (
                      <Award className="w-8 h-8 text-amber-700" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold">Rank #{staker.rank}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{staker.address}</p>
                  <div className="grid w-full grid-cols-2 gap-2 mt-4">
                    <div className="p-2 text-center border rounded-md">
                      <p className="text-xs text-muted-foreground">Total Staked</p>
                      <p className="font-medium">{staker.totalStaked.split(" ")[0]}</p>
                    </div>
                    <div className="p-2 text-center border rounded-md">
                      <p className="text-xs text-muted-foreground">Quests</p>
                      <p className="font-medium">{staker.questsJoined}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Total Staked</TableHead>
                    <TableHead className="hidden md:table-cell">Active Stake</TableHead>
                    <TableHead className="hidden md:table-cell">Quests Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topStakers.map((staker) => (
                    <TableRow key={staker.rank}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {staker.rank === 1 ? (
                            <Trophy className="w-4 h-4 text-amber-500" />
                          ) : staker.rank === 2 ? (
                            <Medal className="w-4 h-4 text-zinc-400" />
                          ) : staker.rank === 3 ? (
                            <Award className="w-4 h-4 text-amber-700" />
                          ) : (
                            <span className="w-4 h-4 text-center">{staker.rank}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs">{staker.address.substring(2, 4)}</AvatarFallback>
                          </Avatar>
                          <span>{staker.address}</span>
                        </div>
                      </TableCell>
                      <TableCell>{staker.totalStaked}</TableCell>
                      <TableCell className="hidden md:table-cell">{staker.activeStake}</TableCell>
                      <TableCell className="hidden md:table-cell">{staker.questsJoined}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="recent">
        <Card>
          <CardContent className="p-6">
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Address</TableHead>
                    <TableHead>Quest Type</TableHead>
                    <TableHead>Prediction</TableHead>
                    <TableHead>Reward</TableHead>
                    <TableHead className="hidden md:table-cell">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentWinners.map((winner, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs">{winner.address.substring(2, 4)}</AvatarFallback>
                          </Avatar>
                          <span>{winner.address}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {winner.questType === "VOLUME" ? (
                            <TrendingUp className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Zap className="w-4 h-4 text-teal-500" />
                          )}
                          <span>{winner.questType}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            winner.prediction === "buy"
                              ? "bg-emerald-500/10 text-emerald-500"
                              : "bg-rose-500/10 text-rose-500"
                          }
                        >
                          {winner.prediction === "buy" ? "Buys Win" : "Sells Win"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-amber-500">{winner.reward}</span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{winner.timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
