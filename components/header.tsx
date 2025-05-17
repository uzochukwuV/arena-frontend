"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { ConnectWallet } from "@/components/connect-wallet"
import { Menu, X, Bell } from "lucide-react"
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { cn } from "@/lib/utils"
import NotificationIndicator from "@/components/notification-indicator"
import { client, wallets } from "@/app/client"
import { usePositionHook } from "@/hooks/uniswap/position"
import useHook from "@/hooks/uniswap/hook"
import { useContracts } from "@/hooks/use-contract"

export default function Header() {
   const account = useActiveAccount()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const {getSlot0, getCurrentPoolIndex,getUserQuestStake, getQuestId, getTotalStaked, getCurrentQuestStats } = useHook()
  const {approveTokens} = usePositionHook()
 

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Quests", href: "/quests" },
    { name: "Swap", href: "/swap" },
    { name: "Liquidity", href: "/liquidity" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "Governance", href: "/governance" },
    { name: "Referrals", href: "/referrals" },
    { name: "Docs", href: "/docs" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">SwapArena</span>
             <button onClick={async()=>getCurrentQuestStats()} className=" bg-white">Hello</button>
              <button onClick={async()=>getTotalStaked(await getQuestId())} className=" bg-white">9505005</button>
              <button onClick={async()=>getUserQuestStake(await getQuestId(), account?.address!)} className=" bg-white">9505005</button>
              
          </Link>
          <div className="hidden md:flex md:gap-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
         
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <ConnectButton wallets={wallets} client={client}  connectModal={{ size: "compact" }} />
          </div>
          <Link href="/notifications" className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <NotificationIndicator />
              <span className="sr-only">Notifications</span>
            </Button>
          </Link>
          <ModeToggle />
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="container px-4 py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block text-base font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-foreground" : "text-muted-foreground",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
             
            <div className="pt-4">
              
               <ConnectButton wallets={wallets} client={client}  connectModal={{ size: "compact" }} />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

