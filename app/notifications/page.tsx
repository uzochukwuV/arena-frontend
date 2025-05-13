import type { Metadata } from "next"
import NotificationsList from "@/components/notifications-list"
import NotificationSettings from "@/components/notification-settings"

export const metadata: Metadata = {
  title: "Notifications | SwapArena",
  description: "Manage your SwapArena notifications",
}

export default function NotificationsPage() {
  return (
    <div className="container px-4 py-12 mx-auto space-y-12">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-4xl font-bold tracking-tight">Notifications</h1>
        <NotificationSettings />
      </div>
      <NotificationsList />
    </div>
  )
}
