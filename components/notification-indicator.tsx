"use client"

import { useEffect, useState } from "react"

export default function NotificationIndicator() {
  const [hasUnread, setHasUnread] = useState(false)

  // In a real app, this would check for unread notifications from an API
  useEffect(() => {
    // Mock data - would be fetched from an API
    const mockHasUnread = true
    setHasUnread(mockHasUnread)
  }, [])

  if (!hasUnread) return null

  return (
    <span className="absolute top-1 right-1 flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
    </span>
  )
}
