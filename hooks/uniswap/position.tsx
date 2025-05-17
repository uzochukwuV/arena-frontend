"use client"
import { useContracts } from "../use-contract";
import {useActiveAccount} from "thirdweb/react"
import { POOL_MANAGER } from "@/lib/constants";
import { parseEther } from "ethers/lib/utils";





export function usePositionHook(){
    
    const {token0Contract, token1Contract, approve, addLiquidity} = useContracts()
    const signer = useActiveAccount()
    
    
    
    

    const approveTokens =async ()=>{
    //    await approve({spender: POOL_MANAGER, contract:token0Contract})
    console.log(parseEther("0.0001"), parseEther("1"))
        addLiquidity(parseEther("0.0001"), parseEther("1"))
    }

    return {approveTokens}
}




// const transaction = prepareContractCall({
//   contract,
//   method: "function transfer(address to, uint256 value)",
//   params: [to, value],
// });

// const { transactionHash } = await sendTransaction({
//   account,
//   transaction,
// });
