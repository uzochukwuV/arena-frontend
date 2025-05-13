"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, FileText, HelpCircle, Lightbulb, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

export default function DocsSidebar() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    gettingStarted: true,
    quests: false,
    swap: false,
    liquidity: false,
  })

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const sections = [
    {
      id: "gettingStarted",
      title: "Getting Started",
      icon: <FileText className="w-4 h-4" />,
      links: [
        { href: "#introduction", label: "Introduction" },
        { href: "#connecting-wallet", label: "Connecting Your Wallet" },
        { href: "#bex-token", label: "BEX Token" },
        { href: "#platform-overview", label: "Platform Overview" },
      ],
    },
    {
      id: "quests",
      title: "Quests",
      icon: <Zap className="w-4 h-4" />,
      links: [
        { href: "#quest-types", label: "Quest Types" },
        { href: "#joining-quests", label: "Joining Quests" },
        { href: "#claiming-rewards", label: "Claiming Rewards" },
        { href: "#quest-strategies", label: "Quest Strategies" },
      ],
    },
    {
      id: "swap",
      title: "Swap",
      icon: <Lightbulb className="w-4 h-4" />,
      links: [
        { href: "#swap-overview", label: "Swap Overview" },
        { href: "#swap-tokens", label: "Swapping Tokens" },
        { href: "#slippage", label: "Understanding Slippage" },
        { href: "#swap-fees", label: "Swap Fees" },
      ],
    },
    {
      id: "liquidity",
      title: "Liquidity",
      icon: <HelpCircle className="w-4 h-4" />,
      links: [
        { href: "#liquidity-overview", label: "Liquidity Overview" },
        { href: "#adding-liquidity", label: "Adding Liquidity" },
        { href: "#removing-liquidity", label: "Removing Liquidity" },
        { href: "#liquidity-rewards", label: "Liquidity Rewards" },
      ],
    },
  ]

  return (
    <div className="w-full space-y-4">
      {sections.map((section) => (
        <Collapsible
          key={section.id}
          open={openSections[section.id]}
          onOpenChange={() => toggleSection(section.id)}
          className="border rounded-md"
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "flex w-full items-center justify-between p-4 text-left",
                openSections[section.id] && "border-b",
              )}
            >
              <div className="flex items-center gap-2">
                {section.icon}
                <span>{section.title}</span>
              </div>
              <ChevronDown className={cn("h-4 w-4 transition-transform", openSections[section.id] && "rotate-180")} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 space-y-2">
            {section.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-sm rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  )
}
