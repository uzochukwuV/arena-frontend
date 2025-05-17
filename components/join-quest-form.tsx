"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { TrendingDown, TrendingUp, Zap } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

import { useActiveAccount } from "thirdweb/react"
import { POOL_ID, signer, SWAPARENA_ABI } from "@/lib/constants"
import { ethers } from "ethers"
// Mock data - would be fetched from the blockchain in a real implementation
const mockQuestDetails = {
  id: "1",
  poolId: "0x1234...5678",
  type: "VOLUME",
  totalStaked: "12,450 BEX",
  endTime: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours from now
  stats: {
    buys: 245,
    sells: 198,
    buyVolume: "34,567 USDC",
    sellVolume: "29,876 USDC",
  },
}

export default function JoinQuestForm({ id }: { id: string }) {
  const [prediction, setPrediction] = useState<string>("1")
  const [amount, setAmount] = useState<string>("10")
  const [isSubmitting, setIsSubmitting] = useState(false)
  // const {joinQuest}= useHook()
  const account = useActiveAccount()


  // In a real implementation, we would fetch the quest details based on the ID

  const questDetails = mockQuestDetails

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!prediction || !amount) return

    setIsSubmitting(true)

    try {
      // In a real implementation, this would call the smart contract
      console.log("Joining quest", {
        questId: id,
        prediction,
        amount,
      })

      
    await joinQuest({amount: Number(amount), isPut:false, type:1})
      

      // Show success message or redirect
      alert("Successfully joined the quest!")
    } catch (error) {
      console.error("Error joining quest:", error)
      alert("Failed to join quest. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Join This Quest</CardTitle>
        <CardDescription>Stake BEX tokens to predict the outcome of this quest</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Quest Type</Label>
            <div className="flex items-center p-3 rounded-md bg-muted">
              {questDetails.type === "VOLUME" ? (
                <>
                  <TrendingUp className="w-5 h-5 mr-2 text-emerald-500" />
                  <span>Volume Quest</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2 text-teal-500" />
                  <span>Frequency Quest</span>
                </>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Time Remaining</Label>
            <div className="p-3 rounded-md bg-muted">
              {formatDistanceToNow(questDetails.endTime, { addSuffix: true })}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prediction">Your Prediction</Label>
            <RadioGroup value={prediction} onValueChange={setPrediction} className="grid grid-cols-2 gap-4">
              <div className="relative">
                <RadioGroupItem value="0" id="buy" className="sr-only peer" />
                <Label
                  htmlFor="buy"
                  className="flex flex-col items-center justify-between p-4 border-2 rounded-md cursor-pointer border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <TrendingUp className="w-10 h-10 mb-3 text-emerald-500" />
                  <span className="text-sm font-medium">Buys Win</span>
                </Label>
              </div>
              <div className="relative">
                <RadioGroupItem value="1" id="sell" className="sr-only peer" />
                <Label
                  htmlFor="sell"
                  className="flex flex-col items-center justify-between p-4 border-2 rounded-md cursor-pointer border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <TrendingDown className="w-10 h-10 mb-3 text-rose-500" />
                  <span className="text-sm font-medium">Sells Win</span>
                </Label>
              </div>
            </RadioGroup>
          </div>



          <div className="space-y-2">
            <Label htmlFor="amount">Stake Amount (BEX)</Label>
            <Input
              id="amount"
              type="text"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Minimum stake: 100 BEX</p>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled={!prediction || !amount || isSubmitting} onClick={handleSubmit}>
          {isSubmitting ? "Processing..." : "Join Quest"}
        </Button>
      </CardFooter>
    </Card>
  )
}



const joinQuest = async ({ amount, isPut, type }: { amount: number; isPut: boolean; type: number }) => {
  if (typeof window.ethereum === 'undefined') {
    console.error('MetaMask or a Web3 provider is not installed.');
    // Optionally, prompt the user to install MetaMask
    return;
  }

  try {
    // Request access to the user's accounts if needed
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0]; // Use the first connected account
    console.log(account)
   const baseSepoliaChainId = 84532; // Hex for 84532

  // Ask MetaMask to switch to Base Sepolia
  await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: ethers.utils.hexValue(baseSepoliaChainId) }],
  });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(account);

    console.log(signer)

    // Assuming you have your contract ABI and address defined elsewhere
    const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address

       const TOKEN_0 = "0x5c602C98Ad2434c86D83f956bF3B22323dDe7f85";
   const TOKEN_1 = "0xF51980A3455732B35852362E8a749ac67399FAdF";
   const HOOK_ADDRESS = "0xcE7e5Acc2e1c3095B52846cf07bAfA1b88540040"; // 0xcE7e5Acc2e1c3095B52846cf07bAfA1b88540040
   const POOL_ID = "0x60ab7380ad3be47445bc04450117dca7e25600ef591e57e3bb0f484c86c03e51";
   const POOL_MANAGER ="0x05E73354cFDd6745C338b50BcFDfA3Aa6fA03408"
   const POSITION_MANAGER ="0x4b2c77d209d3405f41a037ec6c77f7f5b8e2ca80"
   const STATEVIEW = "0x571291b572ed32ce6751a2Cb2486EbEe8DEfB9B4"
   
    const hookContract = new ethers.Contract(HOOK_ADDRESS, SWAPARENA_ABI, signer);

    console.log(hookContract);

    //  "name": "joinQuest",
    //     "inputs": [
    //         {
    //             "name": "poolId",
    //             "type": "bytes32",
    //             "internalType": "PoolId"
    //         },
    //         {
    //             "name": "_amount",
    //             "type": "uint128",
    //             "internalType": "uint128"
    //         },
    //         {
    //             "name": "_isPut",
    //             "type": "bool",
    //             "internalType": "bool"
    //         },
    //         {
    //             "name": "_type",
    //             "type": "uint8",
    //             "internalType": "enum SwapArena.QuestType"
    //         }
    //     ],

    const tx = await hookContract.joinQuest(
      POOL_ID,
      100, // Assuming 18 decimal places
      false,
      0,
      { value: ethers.utils.parseEther('0') } // If the function requires Ether, set the value here
    );

    console.log('Transaction sent:', tx.hash);
    await tx.wait(); // Wait for the transaction to be mined
    console.log('Transaction confirmed!');
    // Optionally, update your UI to reflect the successful join
  } catch (error) {
    console.error('Error joining quest:', error);
    // Handle the error appropriately (e.g., display an error message to the user)
  }
};

// Example of how you might call this function from your component:
// const handleJoinButtonClick = async () => {
//   await joinQuest({ amount: 1, isPut: true, type: 0 });
// };