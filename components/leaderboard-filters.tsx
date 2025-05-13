"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Filter } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function LeaderboardFilters() {
  const [questType, setQuestType] = useState("all")
  const [timeframe, setTimeframe] = useState("all-time")
  const [date, setDate] = useState<Date>()

  return (
    <div className="flex flex-wrap items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Quest Type
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Filter by Quest Type</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={questType} onValueChange={setQuestType}>
            <DropdownMenuRadioItem value="all">All Quests</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="volume">Volume Quests</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="frequency">Frequency Quests</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <CalendarIcon className="w-4 h-4" />
            Timeframe
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Filter by Timeframe</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={timeframe} onValueChange={setTimeframe}>
            <DropdownMenuRadioItem value="all-time">All Time</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="this-week">This Week</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="this-month">This Month</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="this-year">This Year</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="custom">Custom Date</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {timeframe === "custom" && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
      )}
    </div>
  )
}
