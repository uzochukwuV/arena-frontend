"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, Check, Coins, TrendingUp, Zap, Users, Vote } from "lucide-react"

// Mock data - would be fetched from an API in a real implementation
const mockNotifications = [
  {
    id: "1",
    type: "quest_completed",
    title: "Quest Completed",
    message: "Your Volume Quest has ended. You predicted correctly and won 450 BEX!",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    type: "reward_available",
    title: "Reward Available",
    message: "You have 720 BEX available to claim from your completed quests.",
    timestamp: "1 day ago",
    read: false,
  },
  {
    id: "3",
    type: "quest_started",
    title: "Quest Started",
    message: "The Frequency Quest you joined has started. Good luck!",
    timestamp: "2 days ago",
    read: true,
  },
  {
    id: "4",
    type: "governance",
    title: "New Governance Proposal",
    message: "A new proposal 'Increase Quest Rewards' is available for voting.",
    timestamp: "3 days ago",
    read: true,
  },
  {
    id: "5",
    type: "referral",
    title: "Referral Bonus",
    message: "Your friend joined SwapArena using your referral link. You earned 50 BEX!",
    timestamp: "4 days ago",
    read: true,
  },
]

export default function NotificationsList() {
  const [filter, setFilter] = useState("all")
  const [notifications, setNotifications] = useState(mockNotifications)

  const filteredNotifications =
    filter === "all"
      ? notifications
      : filter === "unread"
        ? notifications.filter((n) => !n.read)
        : notifications.filter((n) => n.type === filter)

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "quest_completed":
        return <TrendingUp className="w-5 h-5 text-emerald-500" />
      case "reward_available":
        return <Coins className="w-5 h-5 text-amber-500" />
      case "quest_started":
        return <Zap className="w-5 h-5 text-teal-500" />
      case "governance":
        return <Vote className="w-5 h-5 text-purple-500" />
      case "referral":
        return <Users className="w-5 h-5 text-blue-500" />
      default:
        return <Bell className="w-5 h-5" />
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Your Notifications</CardTitle>
        <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={!notifications.some((n) => !n.read)}>
          Mark All as Read
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={filter} onValueChange={setFilter} className="space-y-4">
          <TabsList className="grid grid-cols-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">
              Unread{" "}
              {notifications.filter((n) => !n.read).length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {notifications.filter((n) => !n.read).length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="quest_completed">Quests</TabsTrigger>
            <TabsTrigger value="reward_available">Rewards</TabsTrigger>
            <TabsTrigger value="governance">Governance</TabsTrigger>
            <TabsTrigger value="referral">Referrals</TabsTrigger>
          </TabsList>

          <TabsContent value={filter}>
            <div className="space-y-4">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn("flex items-start gap-4 p-4 border rounded-lg", !notification.read && "bg-muted/40")}
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>{getIcon(notification.type)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{notification.title}</h4>
                        <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                    </div>
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Check className="w-4 h-4" />
                        <span className="sr-only">Mark as read</span>
                      </Button>
                    )}
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/40">
                  <Bell className="w-12 h-12 mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No notifications found</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}
