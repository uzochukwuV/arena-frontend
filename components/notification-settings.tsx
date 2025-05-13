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
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Settings } from "lucide-react"

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    questStarted: true,
    questCompleted: true,
    rewardsAvailable: true,
    governance: true,
    referrals: true,
    email: false,
    push: true,
  })

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Settings className="w-4 h-4" />
          Notification Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Notification Settings</DialogTitle>
          <DialogDescription>Configure which notifications you want to receive and how.</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Notification Types</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="quest-started" className="flex-1">
                  Quest Started
                </Label>
                <Switch
                  id="quest-started"
                  checked={settings.questStarted}
                  onCheckedChange={() => handleToggle("questStarted")}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="quest-completed" className="flex-1">
                  Quest Completed
                </Label>
                <Switch
                  id="quest-completed"
                  checked={settings.questCompleted}
                  onCheckedChange={() => handleToggle("questCompleted")}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="rewards-available" className="flex-1">
                  Rewards Available
                </Label>
                <Switch
                  id="rewards-available"
                  checked={settings.rewardsAvailable}
                  onCheckedChange={() => handleToggle("rewardsAvailable")}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="governance" className="flex-1">
                  Governance Updates
                </Label>
                <Switch
                  id="governance"
                  checked={settings.governance}
                  onCheckedChange={() => handleToggle("governance")}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="referrals" className="flex-1">
                  Referral Activity
                </Label>
                <Switch id="referrals" checked={settings.referrals} onCheckedChange={() => handleToggle("referrals")} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Notification Channels</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications" className="flex-1">
                  Email Notifications
                </Label>
                <Switch
                  id="email-notifications"
                  checked={settings.email}
                  onCheckedChange={() => handleToggle("email")}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications" className="flex-1">
                  Push Notifications
                </Label>
                <Switch id="push-notifications" checked={settings.push} onCheckedChange={() => handleToggle("push")} />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
