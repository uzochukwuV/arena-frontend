"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import { useWallet } from "@/components/wallet-provider"

export default function CreateProposalButton() {
  const { isConnected } = useWallet()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !description) return

    setIsSubmitting(true)

    try {
      // In a real implementation, this would call the smart contract
      console.log("Creating proposal", { title, description })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success message or redirect
      alert("Proposal created successfully!")

      // Reset form and close dialog
      setTitle("")
      setDescription("")
      setOpen(false)
    } catch (error) {
      console.error("Error creating proposal:", error)
      alert("Failed to create proposal. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2" disabled={!isConnected}>
          <Plus className="w-4 h-4" />
          Create Proposal
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Governance Proposal</DialogTitle>
            <DialogDescription>
              Submit a proposal for the community to vote on. You need at least 10,000 BEX to create a proposal.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Proposal Title</Label>
              <Input
                id="title"
                placeholder="Enter a clear and concise title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Proposal Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your proposal in detail, including the rationale and expected impact"
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!title || !description || isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Proposal"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
