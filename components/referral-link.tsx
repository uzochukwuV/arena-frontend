"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, Share2, Twitter, Mail } from "lucide-react"
import { useWallet } from "@/components/wallet-provider"

export default function ReferralLink() {
  const { isConnected, address } = useWallet()
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("link")

  // Generate referral link based on user's address
  const referralLink = address
    ? `https://swaparena.com/ref/${address.substring(2, 8)}`
    : "https://swaparena.com/ref/demo"

  const referralCode = address ? address.substring(2, 8) : "demo123"

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareTwitter = () => {
    const text = encodeURIComponent(
      "Join me on SwapArena, the DeFi gaming platform where you can stake on trade frequency or volume and win rewards! Use my referral link:",
    )
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(referralLink)}`, "_blank")
  }

  const shareEmail = () => {
    const subject = encodeURIComponent("Join SwapArena - DeFi Gaming Platform")
    const body = encodeURIComponent(
      `Hey,\n\nI've been using SwapArena, a DeFi gaming platform where you can stake on trade frequency or volume and win rewards.\n\nUse my referral link to join: ${referralLink}\n\nSee you there!`,
    )
    window.open(`mailto:?subject=${subject}&body=${body}`, "_blank")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Referral Link</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {isConnected ? (
          <>
            <Tabs defaultValue="link" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="link">Referral Link</TabsTrigger>
                <TabsTrigger value="code">Referral Code</TabsTrigger>
              </TabsList>
              <TabsContent value="link" className="space-y-4 pt-4">
                <div className="flex space-x-2">
                  <Input value={referralLink} readOnly className="font-mono text-sm" />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleCopy(referralLink)}
                    className="flex-shrink-0"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Share this link with friends to earn 10% of their platform fees for 3 months
                </p>
              </TabsContent>
              <TabsContent value="code" className="space-y-4 pt-4">
                <div className="flex space-x-2">
                  <Input value={referralCode} readOnly className="font-mono text-sm" />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleCopy(referralCode)}
                    className="flex-shrink-0"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Share this code with friends. They can enter it during registration to connect to your referral
                </p>
              </TabsContent>
            </Tabs>

            <div className="space-y-2">
              <p className="text-sm font-medium">Share via</p>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-2" onClick={() => handleCopy(referralLink)}>
                  <Share2 className="w-4 h-4" />
                  Copy Link
                </Button>
                <Button variant="outline" className="flex-1 gap-2" onClick={shareTwitter}>
                  <Twitter className="w-4 h-4" />
                  Twitter
                </Button>
                <Button variant="outline" className="flex-1 gap-2" onClick={shareEmail}>
                  <Mail className="w-4 h-4" />
                  Email
                </Button>
              </div>
            </div>

            <div className="p-4 border rounded-md bg-muted/40">
              <h4 className="font-medium">How it works</h4>
              <ol className="mt-2 ml-5 text-sm text-muted-foreground list-decimal space-y-1">
                <li>Share your referral link or code with friends</li>
                <li>They sign up and connect their wallet</li>
                <li>You earn 10% of their platform fees for 3 months</li>
                <li>They get a 5% discount on their platform fees</li>
              </ol>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center border rounded-md">
            <p className="mb-4 text-muted-foreground">Connect your wallet to get your referral link</p>
            <Button>Connect Wallet</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
