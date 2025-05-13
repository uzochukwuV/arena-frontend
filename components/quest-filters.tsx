"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { TrendingUp, Zap, RotateCcw } from "lucide-react"

export default function QuestFilters() {
  const [questType, setQuestType] = useState<string>("all")
  const [minStake, setMinStake] = useState<number[]>([0])
  const [showEnding, setShowEnding] = useState<boolean>(false)

  const handleReset = () => {
    setQuestType("all")
    setMinStake([0])
    setShowEnding(false)
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Filters</CardTitle>
          <Button variant="ghost" size="sm" onClick={handleReset} className="h-8 gap-1">
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Quest Type</h3>
          <RadioGroup value={questType} onValueChange={setQuestType} className="space-y-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All Quests</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="volume" id="volume" />
              <Label htmlFor="volume" className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-emerald-500" />
                Volume Quests
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="frequency" id="frequency" />
              <Label htmlFor="frequency" className="flex items-center">
                <Zap className="w-4 h-4 mr-2 text-teal-500" />
                Frequency Quests
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Minimum Stake</h3>
            <span className="text-sm font-medium">{minStake[0]} BEX</span>
          </div>
          <Slider value={minStake} onValueChange={setMinStake} max={5000} step={100} className="py-4" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0 BEX</span>
            <span>5,000 BEX</span>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">Other Filters</h3>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="ending-soon"
              checked={showEnding}
              onCheckedChange={(checked) => setShowEnding(checked as boolean)}
            />
            <Label htmlFor="ending-soon">Ending Soon</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
