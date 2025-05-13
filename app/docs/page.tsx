import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DocsSidebar from "@/components/docs-sidebar"
import GettingStartedGuide from "@/components/getting-started-guide"
import QuestGuide from "@/components/quest-guide"
import SwapGuide from "@/components/swap-guide"
import LiquidityGuide from "@/components/liquidity-guide"

export const metadata: Metadata = {
  title: "Documentation | SwapArena",
  description: "Learn how to use SwapArena with our comprehensive documentation",
}

export default function DocsPage() {
  return (
    <div className="container px-4 py-12 mx-auto">
      <h1 className="mb-8 text-4xl font-bold tracking-tight">Documentation</h1>
      <div className="grid gap-8 md:grid-cols-[240px_1fr]">
        <DocsSidebar />
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>SwapArena Documentation</CardTitle>
              <CardDescription>
                Learn how to use SwapArena to participate in quests, swap tokens, and provide liquidity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="getting-started" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
                  <TabsTrigger value="quests">Quests</TabsTrigger>
                  <TabsTrigger value="swap">Swap</TabsTrigger>
                  <TabsTrigger value="liquidity">Liquidity</TabsTrigger>
                </TabsList>
                <TabsContent value="getting-started">
                  <GettingStartedGuide />
                </TabsContent>
                <TabsContent value="quests">
                  <QuestGuide />
                </TabsContent>
                <TabsContent value="swap">
                  <SwapGuide />
                </TabsContent>
                <TabsContent value="liquidity">
                  <LiquidityGuide />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
