"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface WalletContextType {
  address: string | null
  isConnected: boolean
  connect: () => void
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  isConnected: false,
  connect: () => {},
  disconnect: () => {},
})

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  // Check if wallet was previously connected
  useEffect(() => {
    const savedAddress = localStorage.getItem("walletAddress")
    if (savedAddress) {
      setAddress(savedAddress)
      setIsConnected(true)
    }
  }, [])

  const connect = () => {
    // In a real implementation, this would use ethers.js or web3.js to connect to MetaMask or other wallets
    // For this demo, we'll just simulate a connection with a mock address
    const mockAddress = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
    setAddress(mockAddress)
    setIsConnected(true)
    localStorage.setItem("walletAddress", mockAddress)
  }

  const disconnect = () => {
    setAddress(null)
    setIsConnected(false)
    localStorage.removeItem("walletAddress")
  }

  return (
    <WalletContext.Provider value={{ address, isConnected, connect, disconnect }}>{children}</WalletContext.Provider>
  )
}

export const useWallet = () => useContext(WalletContext)
